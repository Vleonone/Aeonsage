# Operational Diagnostics & Troubleshooting

## 1. System Integrity Verification

To validate the runtime environment, execute the strict diagnostic suite:

```bash
# Full System Audit
aeonsage status --deep --json
```

### Exit Code Definitions
- **0x0**: System Nominal.
- **0x1**: RPC Handshake Failed (Check Gateway Port `18789`).
- **0x2**: VDID Signature Invalid (Rotate Identity Keys).
- **0x4**: Oracle Unreachable (Verify Local Inference Engine).

## 2. Common Anomalies

| Error Code | Anomaly Description | Resolution Protocol |
| :--- | :--- | :--- |
| `ERR_VDID_SIG` | Invalid cryptographic signature from Agent. | Regenerate `did:vdid` keypair via `aeonsage keygen --rotate`. |
| `ERR_ROUTE_FAIL` | Cognitive Router unable to construct path. | Verify `models.json` has at least one active fallback provider. |
| `WARN_ENTROPY` | High stochastic drift in model output. | Reduce `temperature` setting in `system.config`. |

## 3. Forensic Logging

Logs are structured in JSON Lines (JSONL) format for ingestion by SIEM tools.

```bash
# Real-time Telemetry
aeonsage logs --follow --level=debug
```

**Log Location**: `~/.aeonsage/logs/system.log`
