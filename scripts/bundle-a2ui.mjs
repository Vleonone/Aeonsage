import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const HASH_FILE = join(ROOT_DIR, 'src/canvas-host/a2ui/.bundle.hash');
const OUTPUT_FILE = join(ROOT_DIR, 'src/canvas-host/a2ui/a2ui.bundle.js');

const INPUT_PATHS = [
    'package.json',
    'pnpm-lock.yaml',
    'vendor/a2ui/renderers/lit',
    'apps/shared/AeonSageKit/Tools/CanvasA2UI'
];

function getFiles(dir, allFiles = []) {
    const files = readdirSync(dir);
    for (const file of files) {
        const name = join(dir, file);
        if (statSync(name).isDirectory()) {
            getFiles(name, allFiles);
        } else {
            allFiles.push(name);
        }
    }
    return allFiles;
}

async function computeHash() {
    const allFiles = [];
    for (const inputPath of INPUT_PATHS) {
        const fullPath = join(ROOT_DIR, inputPath);
        if (!existsSync(fullPath)) continue;
        if (statSync(fullPath).isDirectory()) {
            getFiles(fullPath, allFiles);
        } else {
            allFiles.push(fullPath);
        }
    }
    allFiles.sort();

    const hash = crypto.createHash('sha256');
    for (const file of allFiles) {
        // Only hash source files to avoid hashing binaries/hashes
        if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.yaml') || file.endsWith('.mjs')) {
            const content = readFileSync(file);
            hash.update(content);
        }
    }
    return hash.digest('hex');
}

async function main() {
    // In OSS mode, vendor/a2ui is excluded. Skip bundling gracefully.
    const vendorLitPath = join(ROOT_DIR, 'vendor/a2ui/renderers/lit');
    if (!existsSync(vendorLitPath)) {
        if (existsSync(OUTPUT_FILE)) {
            console.log('A2UI vendor sources not found; using existing bundle.');
        } else {
            console.log('A2UI vendor sources not found; skipping bundle step (OSS mode).');
        }
        process.exit(0);
    }

    console.log('Computing A2UI bundle hash...');
    const currentHash = await computeHash();

    if (existsSync(HASH_FILE) && existsSync(OUTPUT_FILE)) {
        const previousHash = readFileSync(HASH_FILE, 'utf-8').trim();
        if (previousHash === currentHash) {
            console.log('A2UI bundle up to date; skipping.');
            process.exit(0);
        }
    }

    console.log('Bundling A2UI...');
    try {
        const npx = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
        execSync(`${npx} -s exec tsc -p vendor/a2ui/renderers/lit/tsconfig.json`, { stdio: 'inherit', cwd: ROOT_DIR });
        execSync(`${npx} exec rolldown -c apps/shared/AeonSageKit/Tools/CanvasA2UI/rolldown.config.mjs`, { stdio: 'inherit', cwd: ROOT_DIR });

        writeFileSync(HASH_FILE, currentHash);
        console.log('A2UI bundle updated successfully.');
    } catch (err) {
        console.error('A2UI bundling failed:', err.message);
        process.exit(1);
    }
}

main();
