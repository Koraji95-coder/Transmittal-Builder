#!/usr/bin/env node
/**
 * Removes frontend/src-tauri/target/release/bundle/nsis before `tauri build`.
 *
 * Mirrors the v2.2.6 release-workflow fix from chamber-19/desktop-toolkit#25.
 * Without this, a stale .exe from a previous build can shadow the newly-built
 * one if any downstream tooling falls back to alphabetical ordering.
 *
 * Runs automatically as the `predesktop:build` npm hook — no need to invoke
 * directly.
 */
import { rmSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const bundleDir = resolve(
  new URL(".", import.meta.url).pathname,
  "..",
  "src-tauri",
  "target",
  "release",
  "bundle",
  "nsis",
);

if (existsSync(bundleDir)) {
  rmSync(bundleDir, { recursive: true, force: true });
  console.log(`[clean-bundle] Removed ${bundleDir}`);
} else {
  console.log(`[clean-bundle] Nothing to clean at ${bundleDir}`);
}
