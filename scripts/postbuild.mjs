/**
 * Runs after `next build`.
 *
 * Next copies public/ into out/, but dotfiles are the one thing that silently
 * goes missing across versions. GitHub Pages needs both of these at the
 * published root, so their absence is a hard failure rather than a warning.
 */
import { copyFileSync, existsSync } from "node:fs";

const required = [{ from: "public/.nojekyll", to: "out/.nojekyll" }];

for (const file of required) {
  if (!existsSync(file.to)) {
    if (!existsSync(file.from)) {
      console.error(`[postbuild] missing source: ${file.from}`);
      process.exit(1);
    }
    copyFileSync(file.from, file.to);
    console.log(`[postbuild] copied ${file.from} -> ${file.to}`);
  }
}

console.log("[postbuild] out/ ready for GitHub Pages");
