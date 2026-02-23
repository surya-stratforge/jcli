import chalk from "chalk";
import { assertGitRepo, stageAll, gitCommit } from "./git.js";
import { openEditor } from "./editor.js";

export async function cmdCommit(options) {
  try {
    await assertGitRepo();

    console.log(chalk.cyan("\n  jcli commit\n"));

    // Stage everything first
    await stageAll();
    console.log(chalk.gray("  Staged all changes."));

    let message;

    if (options.message) {
      // Inline message provided
      message = options.message.trim();
    } else {
      // Open editor for multi-line commit message
      console.log(chalk.gray("  Opening editor for commit message…\n"));

      const hint = "";
      const raw = openEditor(`\n\n${hint}`, ".txt");

      if (!raw) {
        console.log(chalk.yellow("\n  Commit aborted (empty message).\n"));
        process.exit(0);
      }

      // Strip comment lines
      message = raw
        .split("\n")
        .filter((line) => !line.startsWith("#"))
        .join("\n")
        .trim();
    }

    if (!message) {
      console.log(chalk.yellow("\n  Commit aborted (empty message).\n"));
      process.exit(0);
    }

    await gitCommit(message);

    // Show first line of commit message as summary
    const summary = message.split("\n")[0];
    console.log(chalk.green(`\n  ✔ Committed: ${chalk.bold(summary)}\n`));
  } catch (err) {
    // Handle "nothing to commit"
    if (err.stderr?.includes("nothing to commit")) {
      console.log(
        chalk.yellow("\n  Nothing to commit — working tree is clean.\n"),
      );
      process.exit(0);
    }
    console.error(chalk.red(`\n  ✖  ${err.message}\n`));
    process.exit(1);
  }
}
