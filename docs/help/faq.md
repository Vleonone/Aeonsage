# Protocol Frequency Asked Questions (FAQ)

## System Architecture

### What defines "Sovereign Intelligence"?
Sovereign Intelligence refers to a cognitive runtime that executes entirely on infrastructure controlled by the operator. Unlike cloud-tethered assistants, AeonSage ensures that **Logic**, **Memory**, and **Identity** are mathematically proven to be local or cryptographically signed via VDID.

### How does the Cognitive Router minimize costs?
AeonSage employs **Optimistic Cascading Logic**. The local oracle (SLM) analyzes intent complexity. 
- **Reflex Tasks** (formatting, extraction) are routed to zero-cost local models or LPU endpoints.
- **Synthesis Tasks** (reasoning, coding) are escalated to SOTA models only when necessary.
This architecture historically reduces token costs by ~93%.

## Operational Security

### What is the "God Key" Protocol?
The God Key is a cryptographic kill-switch mechanism operating over a dedicated WebSocket channel. It allows administrators to instantaneously terminate agent processes across distributed nodes with <50ms latency, ensuring absolute control over autonomous loops.

### Is the air-gapped mode truly disconnected?
Yes. When configured in `AIRGAP_MODE=true`, the system disables all outbound HTTP/WebSocket connections to external model providers. It relies exclusively on local inference (Ollama/Llama.cpp) and local vector stores (ChromaDB) for retrieval.

## Licensing & Enterprise

### Is OpenSage truly Open Source?
Yes. The core kernel (`OpenSage`) is licensed under **MIT**. 
Enterprise modules (VDID-Server, Multi-Node Orchestrator) are available under the **AeonSage Commercial License** for institutional deployments requiring indemnity and SLAs.
