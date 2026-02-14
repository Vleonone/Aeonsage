-- =============================================================================
-- AeonSage PostgreSQL Schema — Initial Migration
-- Version: 2026.2.13
-- =============================================================================
-- This file runs automatically on first Docker Compose startup
-- For bare-metal: psql -U aeonsage -d aeonsage -f init.sql
-- =============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ───
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider        VARCHAR(32) NOT NULL,               -- google | telegram | github | vdid
    provider_id     VARCHAR(255) NOT NULL,               -- external provider user ID
    display_name    VARCHAR(255),
    email           VARCHAR(255),
    avatar_url      TEXT,
    tier            INTEGER NOT NULL DEFAULT 1,           -- bitflag: 1=free, 2=pro, 4=enterprise
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (provider, provider_id)
);

CREATE INDEX IF NOT EXISTS idx_users_provider ON users (provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_users_tier ON users (tier);

-- ─── Sessions (JWT refresh tokens) ───
CREATE TABLE IF NOT EXISTS sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(128) NOT NULL UNIQUE,        -- SHA-256 of refresh token
    device_fp       VARCHAR(128),                         -- Ed25519 device fingerprint
    user_agent      TEXT,
    ip_address      INET,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions (expires_at);

-- ─── Agent Configurations ───
CREATE TABLE IF NOT EXISTS agent_configs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL DEFAULT 'default',
    config          JSONB NOT NULL DEFAULT '{}',
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_agent_configs_user ON agent_configs (user_id);

-- ─── Conversations ───
CREATE TABLE IF NOT EXISTS conversations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel         VARCHAR(64),                          -- telegram | discord | web | desktop
    title           VARCHAR(512),
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations (user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated ON conversations (updated_at DESC);

-- ─── Messages ───
CREATE TABLE IF NOT EXISTS messages (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role            VARCHAR(32) NOT NULL,                  -- user | assistant | system | tool
    content         TEXT,
    attachments     JSONB DEFAULT '[]',
    token_count     INTEGER DEFAULT 0,
    model           VARCHAR(128),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages (conversation_id, created_at);

-- ─── Skills (installed per user) ───
CREATE TABLE IF NOT EXISTS user_skills (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id        VARCHAR(128) NOT NULL,
    enabled         BOOLEAN NOT NULL DEFAULT true,
    config          JSONB DEFAULT '{}',
    installed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_user_skills_user ON user_skills (user_id);

-- ─── Channels (connected per user) ───
CREATE TABLE IF NOT EXISTS user_channels (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    channel_type    VARCHAR(64) NOT NULL,                  -- telegram | discord | slack | ...
    account_id      VARCHAR(255) NOT NULL,
    credentials_enc TEXT,                                   -- encrypted credentials (AES-256-GCM)
    config          JSONB DEFAULT '{}',
    active          BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, channel_type, account_id)
);

CREATE INDEX IF NOT EXISTS idx_user_channels_user ON user_channels (user_id);

-- ─── Usage Logs (for billing & analytics) ───
CREATE TABLE IF NOT EXISTS usage_logs (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    model           VARCHAR(128) NOT NULL,
    provider        VARCHAR(64) NOT NULL,
    tokens_in       INTEGER NOT NULL DEFAULT 0,
    tokens_out      INTEGER NOT NULL DEFAULT 0,
    cost_usd        NUMERIC(10, 6) DEFAULT 0,
    request_type    VARCHAR(32),                           -- chat | tool | cron | ...
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_user_date ON usage_logs (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_created ON usage_logs (created_at DESC);

-- Partition by month for large-scale (optional, enable later)
-- CREATE TABLE usage_logs_2026_02 PARTITION OF usage_logs
--     FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- ─── Feature Flags (server-side) ───
CREATE TABLE IF NOT EXISTS feature_flags (
    id              VARCHAR(128) PRIMARY KEY,              -- flag name
    enabled         BOOLEAN NOT NULL DEFAULT false,
    rollout_pct     INTEGER DEFAULT 100,                   -- 0-100 rollout percentage
    allow_list      JSONB DEFAULT '[]',                    -- user IDs for early access
    min_tier        INTEGER DEFAULT 1,                     -- minimum tier required
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Subscriptions (Pro/Enterprise billing) ───
CREATE TABLE IF NOT EXISTS subscriptions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    tier            INTEGER NOT NULL DEFAULT 1,
    provider        VARCHAR(32),                           -- stripe | paddle
    external_id     VARCHAR(255),                          -- Stripe subscription ID
    status          VARCHAR(32) NOT NULL DEFAULT 'active', -- active | canceled | past_due
    current_period_start TIMESTAMPTZ,
    current_period_end   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions (status);

-- ─── Helper function: auto-update updated_at ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN SELECT unnest(ARRAY['users', 'agent_configs', 'conversations', 'feature_flags', 'subscriptions'])
    LOOP
        EXECUTE format(
            'DROP TRIGGER IF EXISTS trg_%s_updated ON %I; CREATE TRIGGER trg_%s_updated BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
            tbl, tbl, tbl, tbl
        );
    END LOOP;
END $$;

-- ─── Seed default feature flags ───
INSERT INTO feature_flags (id, enabled, min_tier, metadata) VALUES
    ('finance_page',      true, 2, '{"description": "Finance dashboard (Pro)"}'),
    ('workers_page',      true, 2, '{"description": "Workers management (Pro)"}'),
    ('cloudrelay',        true, 2, '{"description": "CloudRelay proxy (Pro)"}'),
    ('vdid_auth',         true, 2, '{"description": "VDID wallet authentication (Pro)"}'),
    ('custom_theme',      true, 2, '{"description": "Custom theme selection (Pro)"}'),
    ('priority_models',   true, 2, '{"description": "Priority model routing (Pro)"}'),
    ('voice_call',        true, 2, '{"description": "Voice call integration (Pro)"}'),
    ('advanced_cron',     true, 2, '{"description": "Advanced cron scheduling (Pro)"}')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- Schema ready. Tables: 9 | Indexes: 12 | Triggers: 5 | Feature flags: 8
-- =============================================================================
