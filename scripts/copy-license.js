// Copies the Inter font's SIL Open Font License into the build output.
// Vite/Rollup only bundles files that are actually referenced (imported or
// linked) during the build — LICENSE.txt isn't referenced by any CSS/JS/HTML,
// so it gets silently dropped from dist/ unless we copy it explicitly here.

import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const src = resolve(root, "src/assets/fonts/inter/LICENSE.txt");
const destDir = resolve(root, "dist/assets/fonts/inter");
const dest = resolve(destDir, "LICENSE.txt");

if (!existsSync(src)) {
  console.error(`[copy-license] Source not found: ${src}`);
  process.exit(1);
}

if (!existsSync(destDir)) {
  console.error(
    `[copy-license] Destination folder not found: ${destDir} (did the build run?)`,
  );
  process.exit(1);
}

copyFileSync(src, dest);
console.log(
  `[copy-license] Copied Inter LICENSE.txt -> dist/assets/fonts/inter/LICENSE.txt`,
);
