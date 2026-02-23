import { writeFileSync, readFileSync, unlinkSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { spawnSync } from "child_process";

/**
 * Opens an editor with optional initial content.
 * Blocks until the editor closes, then returns the file contents.
 * Returns null if the user saved an empty file (abort signal).
 *
 */
export function openEditor(initialContent = "", extension = ".md") {
  const tmpFile = join(tmpdir(), `jcli-${Date.now()}${extension}`);

  writeFileSync(tmpFile, initialContent, "utf-8");

  const { cmd, args } = resolveEditor();

  const result = spawnSync(cmd, [...args, tmpFile], {
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    throw new Error(`Failed to open editor "${cmd}": ${result.error.message}`);
  }

  const content = existsSync(tmpFile) ? readFileSync(tmpFile, "utf-8") : "";

  try {
    unlinkSync(tmpFile);
  } catch {
    // non-fatal
  }

  return content.trim() || null;
}

function resolveEditor() {
  if (isAvailable("nano")) return { cmd: "nano", args: [] };

  return { cmd: "vi", args: [] };
}

function isAvailable(bin) {
  const result = spawnSync("which", [bin], { stdio: "pipe" });
  return result.status === 0;
}
