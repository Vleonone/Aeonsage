# Nexus Trading Engine

> ⚠️ **Internal Documentation - Core Team Only**

## Overview

Nexus is AeonSage Pro's high-frequency trading engine, designed for institutional-grade quantitative strategies.

## Architecture

```
┌─────────────────────────────────────────────┐
│              NEXUS ENGINE                   │
├─────────────────────────────────────────────┤
│                                             │
│   ┌─────────┐    ┌─────────┐   ┌─────────┐ │
│   │ Market  │───▶│ Strategy │──▶│  Order  │ │
│   │  Data   │    │  Engine  │   │ Router  │ │
│   └─────────┘    └─────────┘   └─────────┘ │
│        │              │              │      │
│        ▼              ▼              ▼      │
│   ┌─────────────────────────────────────┐  │
│   │         Risk Management             │  │
│   └─────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

## Supported Exchanges

| Exchange | Type | Status |
| :--- | :--- | :--- |
| Binance | CEX | ✅ Production |
| OKX | CEX | ✅ Production |
| Hyperliquid | DEX | ✅ Production |
| dYdX | DEX | 🔄 In Development |

## Strategy Modules

### 1. Grid Trading
- Automatically place buy/sell orders within price range
- Support for arithmetic/geometric grids

### 2. Arbitrage
- Cross-exchange spread arbitrage
- Triangular arbitrage

### 3. Trend Following
- EMA/MACD-based signal system
- Dynamic stop-loss and take-profit

### 4. Market Making
- Bid-ask spread optimization
- Inventory management

## Configuration

```json
{
  "nexus": {
    "enabled": true,
    "exchanges": ["binance", "okx"],
    "risk_limits": {
      "max_position": 10000,
      "max_drawdown": 0.05
    }
  }
}
```

---

*Last updated: 2026-02-03*
