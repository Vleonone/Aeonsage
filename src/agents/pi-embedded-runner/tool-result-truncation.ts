/**
 * Tool Result Truncation — Recovery from context overflow caused by oversized tool results.
 *
 * When compaction fails to resolve a context overflow, this module provides a fallback:
 * 1. Scan session messages for tool results exceeding a threshold (30% of context window)
 * 2. Truncate them via session branching (new branch with truncated content)
 * 3. Allow the prompt to be retried
 *
 * Ported from upstream openclaw#11579.
 */

import type { SessionManager } from "@mariozechner/pi-coding-agent";

const DEFAULT_CHARS_PER_TOKEN = 4;

/**
 * Estimate the maximum allowed characters for a single tool result
 * based on 30% of the model's context window.
 */
export function getMaxToolResultChars(contextWindowTokens: number): number {
  return Math.floor(contextWindowTokens * 0.3 * DEFAULT_CHARS_PER_TOKEN);
}

/**
 * Extract text length from a message's content blocks.
 */
function getTextContentLength(message: Record<string, unknown>): number {
  const content = message.content;
  if (!Array.isArray(content)) return 0;
  let total = 0;
  for (const block of content) {
    if (block && typeof block === "object" && (block as Record<string, unknown>).type === "text") {
      const text = (block as Record<string, unknown>).text;
      if (typeof text === "string") total += text.length;
    }
  }
  return total;
}

/**
 * Truncate a message's text content to a given character limit,
 * preserving the beginning and appending a truncation notice.
 */
export function truncateTextContent(
  message: Record<string, unknown>,
  maxChars: number,
): Record<string, unknown> {
  const content = message.content;
  if (!Array.isArray(content)) return message;

  const truncated = content.map((block: Record<string, unknown>) => {
    if (block?.type === "text" && typeof block.text === "string" && block.text.length > maxChars) {
      return {
        ...block,
        text:
          block.text.slice(0, maxChars) +
          "\n\n[Content truncated to fit context window. " +
          "Use offset/limit parameters to read specific sections of large files.]",
      };
    }
    return block;
  });

  return { ...message, content: truncated };
}

/**
 * Check whether the session contains any tool result messages exceeding the threshold.
 */
export function hasOversizedToolResults(
  sessionManager: SessionManager,
  contextWindowTokens: number,
): boolean {
  const maxChars = getMaxToolResultChars(contextWindowTokens);
  const messages = sessionManager.getMessages();
  for (const msg of messages) {
    const rec = msg as Record<string, unknown>;
    if (rec.role === "toolResult" && getTextContentLength(rec) > maxChars) {
      return true;
    }
  }
  return false;
}

/**
 * Truncate all oversized tool results in the session by branching.
 * Returns true if any truncation was performed.
 */
export function truncateOversizedToolResults(
  sessionManager: SessionManager,
  contextWindowTokens: number,
): boolean {
  const maxChars = getMaxToolResultChars(contextWindowTokens);
  const messages = sessionManager.getMessages();
  let truncatedCount = 0;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i] as Record<string, unknown>;
    if (msg.role === "toolResult" && getTextContentLength(msg) > maxChars) {
      const truncated = truncateTextContent(msg, maxChars);
      messages[i] = truncated as typeof messages[number];
      truncatedCount++;
    }
  }

  return truncatedCount > 0;
}
