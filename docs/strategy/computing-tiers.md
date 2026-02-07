<div align="center">

<h1>Sovereign Computing Tiers Strategy</h1>
<p>Commercial hosting and deployment strategy for AeonSage</p>

<p>
  <img src="https://img.shields.io/badge/tiers-Light_Pro_Ultra-FF751F?style=flat-square" alt="Tiers">
  <img src="https://img.shields.io/badge/deployment-Cloud_Hybrid_Local-00C853?style=flat-square" alt="Deployment">
</p>

</div>

---

## Commercial Cloud Hosting (Sovereign Cloud)

To eliminate local hardware maintenance costs, we provide high-fidelity cloud hosting solutions.

| Tier | Price | Use Case | Specs |
|:-----|:------|:---------|:------|
| **Light** | **$19/month** | Personal AI assistant, lightweight gateway | 1 Core / 2GB RAM / Shared bandwidth |
| **Pro** | **$99/month** | Knowledge base cultivation, multi-channel processing | 4 Core / 8GB RAM / Dedicated IP |
| **Ultra** | **Custom** | Private model deployment, massive data analysis | GPU (optional) / 32GB+ RAM |

---

## Personal Deployment: For Large-Scale Content Cultivation

For users processing massive documents and high-frequency knowledge base construction, we recommend a **"Local Compute Base + Cloud Cognitive Relay"** hybrid model.

### 1. Hardware Specifications

**Best Practice (Mac)**: Mac Studio (M2/M3 Ultra) 64GB+ unified memory. AeonSage achieves optimal memory pool scheduling efficiency on macOS.

**Best Practice (PC/Linux)**: 2x RTX 3090/4090 (24GB VRAM) + 128GB RAM. Ideal for running local DeepSeek or Llama 3 flagship models.

**Storage**: NVMe SSD required. Vector DB retrieval speed directly determines AI "cultivation" efficiency.

### 2. Deployment Architecture (Hybrid)

**Cognition Layer**:
- **Logical Reasoning**: Use Claude 3.5 Sonnet (API) for complex decisions
- **Data Preprocessing**: Use local Qwen 2.5 (via Ollama) for free content cleaning and summarization

**Compute Layer**:
- All **Vector Embedding** should be done locally to ensure data never leaves your infrastructure
- Use AeonSage's built-in **LanceDB** for millisecond response with million-level document fragments

### 3. Why Local Deployment?

For content-heavy users, local deployment provides:

1. **Zero API Costs**: Text segmentation and vectorization for knowledge base construction can become exponentially expensive if using cloud APIs
2. **Absolute Sovereignty**: Your sensitive personal content (core cultivation data) never uploads to third-party servers
3. **IO Throughput**: Massive content processing is limited by network bandwidth; local NVMe delivers 10x+ cultivation speed

---

<div align="center">

**AeonSage Strategic Operation** · 2026

</div>
