// Copies static text files into the build output that Vite/Rollup silently
// drops because they aren't referenced by any CSS/JS/HTML during the build.
// Run automatically as part of `npm run build` via the build script.

import { copyFileSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ─── 1. Inter font license ────────────────────────────────────────────────────
const fontLicenseSrc  = resolve(root, "src/assets/fonts/inter/LICENSE.txt");
const fontLicenseDir  = resolve(root, "dist/assets/fonts/inter");
const fontLicenseDest = resolve(fontLicenseDir, "LICENSE.txt");

if (!existsSync(fontLicenseSrc)) {
  console.error(`[copy-license] Source not found: ${fontLicenseSrc}`);
  process.exit(1);
}

if (!existsSync(fontLicenseDir)) {
  console.error(
    `[copy-license] Destination folder not found: ${fontLicenseDir} (did the build run?)`
  );
  process.exit(1);
}

copyFileSync(fontLicenseSrc, fontLicenseDest);
console.log(`[copy-license] Copied Inter LICENSE.txt  -> dist/assets/fonts/inter/LICENSE.txt`);

// ─── 2. Item buyer license (ThemeForest requirement) ─────────────────────────
const itemLicenseSrc  = resolve(root, "LICENSE.txt");
const itemLicenseDest = resolve(root, "dist/LICENSE.txt");

if (!existsSync(itemLicenseSrc)) {
  console.error(`[copy-license] Item LICENSE.txt not found at repo root: ${itemLicenseSrc}`);
  process.exit(1);
}

copyFileSync(itemLicenseSrc, itemLicenseDest);
console.log(`[copy-license] Copied item LICENSE.txt   -> dist/LICENSE.txt`);

// ─── 3. Changelog (ThemeForest requirement) ───────────────────────────────────
const changelogSrc  = resolve(root, "changelog.txt");
const changelogDest = resolve(root, "dist/changelog.txt");

if (!existsSync(changelogSrc)) {
  console.error(`[copy-license] changelog.txt not found at repo root: ${changelogSrc}`);
  process.exit(1);
}

copyFileSync(changelogSrc, changelogDest);
console.log(`[copy-license] Copied changelog.txt      -> dist/changelog.txt`);