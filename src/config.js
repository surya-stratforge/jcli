import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import { homedir } from "os";

// ── Project config ──────────────────────────────────────────────────────────

export function loadProjectConfig(cwd = process.cwd()) {
  const path = resolve(cwd, "jcli.config.json");
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch (err) {
    throw new Error(`Failed to parse jcli.config.json: ${err.message}`);
  }
}

// ── Branch state (~/.jcli/state.json) ──────────────────────────────────────
// Stores per-branch metadata (jiraKey, type) so `jcli pr` knows context.

const STATE_DIR = join(homedir(), ".jcli");
const STATE_FILE = join(STATE_DIR, "state.json");

function readState() {
  if (!existsSync(STATE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function saveBranchMeta(branch, data) {
  mkdirSync(STATE_DIR, { recursive: true });
  const state = readState();
  state[branch] = { ...state[branch], ...data };
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

export function getBranchMeta(branch) {
  return readState()[branch] ?? {};
}

console.log(loadProjectConfig());
