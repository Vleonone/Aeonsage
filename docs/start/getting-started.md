# Sovereign Genesis (Getting Started)

## 1.0 The First Principle

Welcome to **AeonSage**. You are not installing software; you are initializing a **Sovereign Cognitive Node**.

This guide presumes you have successfully completed the **Deployment Protocol** (installation).

## 2.0 Node Initialization

To bring your node online, execute the onboard sequence:

```bash
pnpm aeonsage onboard
```

### 2.1 Identity Assert
The system will generate your **Root Identity**. This keypair is used to sign the implementation of your first agents.
*   **Private Key**: Stored in strict isolation (`~/.aeonsage/identity`). **Never share this.**
*   **Public DID**: Your addressable capability ID on the network.

### 2.2 Cognitive Kernel Configuration
You will be asked to define your **Intelligence Sources**.
*   **Primary Cortex**: OpenAI (GPT-4o), Anthropic (Claude 3.5), or Local (Ollama).
*   **Embeddings**: Used for semantic memory.

## 3.0 Launching the First Process

Once initialized, start the gateway:

```bash
pnpm aeonsage gateway
```

**Dashboard Access**:
Navigate to `http://localhost:18789`. You will see the **Sovereign Dashboard**, a real-time visualization of your cognitive runtime.

## 4.0 Connecting the Nervous System (Channels)

To make your agent useful, it must perceive the world.
1.  Navigate to **Channels** in the dashboard.
2.  Enable **Telegram Bridge**.
3.  Inject your Bot Token (The system will encrypt this at rest).
4.  Your agent is now live on the Telegram network, protected by the AeonSage kernel.

> **Next Step**: Proceed to the **Developer Manual** to begin crafting custom Skills.
