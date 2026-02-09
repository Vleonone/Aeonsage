import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function getA2uiPaths(env = process.env) {
  const srcDir =
    env.AEONSAGE_A2UI_SRC_DIR ?? path.join(repoRoot, "src", "canvas-host", "a2ui");
  const outDir =
    env.AEONSAGE_A2UI_OUT_DIR ?? path.join(repoRoot, "dist", "canvas-host", "a2ui");
  return { srcDir, outDir };
}

export async function copyA2uiAssets({
  srcDir,
  outDir,
}: {
  srcDir: string;
  outDir: string;
}) {
  try {
    await fs.stat(path.join(srcDir, "index.html"));
    await fs.stat(path.join(srcDir, "a2ui.bundle.js"));
  } catch {
    // In OSS mode, vendor/a2ui is excluded so the bundle cannot be generated.
    // Skip gracefully instead of failing the build.
    console.log("A2UI bundle assets not found; skipping copy (OSS mode).");
    return;
  }
  await fs.mkdir(path.dirname(outDir), { recursive: true });
  await fs.cp(srcDir, outDir, { recursive: true });
}

async function main() {
  const { srcDir, outDir } = getA2uiPaths();
  await copyA2uiAssets({ srcDir, outDir });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((err) => {
    console.error(String(err));
    process.exit(1);
  });
}
