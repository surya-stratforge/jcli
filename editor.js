import { writeFileSync, readFileSync, unlinkSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { spawnSync } from 'child_process';

/**
 * Opens $EDITOR with optional initial content.
 * Blocks until the editor closes, then returns the file contents.
 * Returns null if the user saved an empty file (abort signal).
 */
export function openEditor(initialContent = '', extension = '.md') {
  const tmpFile = join(tmpdir(), `jcli-${Date.now()}${extension}`);

  writeFileSync(tmpFile, initialContent, 'utf-8');

  const editor = process.env.VISUAL || process.env.EDITOR || 'vi';

  const result = spawnSync(editor, [tmpFile], {
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw new Error(`Failed to open editor "${editor}": ${result.error.message}`);
  }

  const content = existsSync(tmpFile) ? readFileSync(tmpFile, 'utf-8') : '';

  try {
    unlinkSync(tmpFile);
  } catch {
    // non-fatal
  }

  return content.trim() || null;
}
