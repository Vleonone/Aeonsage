/**
 * AeonSafe Security Tool Routes - Open Source Stub
 *
 * Security tool routes are not available in the Open Source edition.
 * Upgrade to AeonSage Pro for security assessment capabilities.
 */

import type { IncomingMessage, ServerResponse } from "node:http";

export async function handleKaliHttpRequest(
  _req: IncomingMessage,
  res: ServerResponse,
  _context: unknown,
): Promise<boolean> {
  res.writeHead(403, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    error: "Security tools are not available in the Open Source edition.",
    upgrade: "https://github.com/velonone/AeonsagePro",
  }));
  return false;
}