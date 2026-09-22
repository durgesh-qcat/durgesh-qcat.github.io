import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

// Keep the Sites build and the static GitHub Pages export on the same source.
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build", "--webpack"],
  {
    stdio: "inherit",
    env: { ...process.env, GITHUB_PAGES: "true", NEXT_TELEMETRY_DISABLED: "1" },
  },
);
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
writeFileSync("out/.nojekyll", "");
console.log("GitHub Pages files are ready in out/.");
