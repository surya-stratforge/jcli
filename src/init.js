import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { assertGitRepo, getRemoteBranches, checkoutBranch } from "./git.js";
import { saveBranchMeta } from "./config.js";
import { TICKET_TYPES } from "./templates.js";

export async function cmdInit(jiraKey) {
  try {
    await assertGitRepo();

    // Validate Jira key format
    if (!/^[A-Z][A-Z0-9]*-\d+$/.test(jiraKey)) {
      throw new Error(
        `Invalid Jira key: "${jiraKey}". Expected format like ABC-123.`,
      );
    }

    console.log(chalk.cyan(`\n  jcli init › ${chalk.bold(jiraKey)}\n`));

    // 1. Select ticket type
    const type = await select({
      message: "What type of ticket is this?",
      choices: TICKET_TYPES.map((t) => ({ name: t.label, value: t.value })),
    });

    // 2. Select base branch
    let branches;
    try {
      branches = await getRemoteBranches();
    } catch {
      branches = ["main", "develop"];
    }

    if (branches.length === 0) branches = ["main", "develop"];

    // Promote common base branches to the top
    const priority = ["main", "master", "develop", "staging"];
    branches.sort((a, b) => {
      const ai = priority.indexOf(a);
      const bi = priority.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });

    const baseBranch = await select({
      message: "Base branch to branch from?",
      choices: branches.map((b) => ({ name: b, value: b })),
    });

    // 3. Branch name = exact Jira key
    const branchName = jiraKey;

    console.log(
      chalk.gray(
        `\n  Creating branch ${chalk.white.bold(branchName)} from ${chalk.white(baseBranch)}…`,
      ),
    );

    await checkoutBranch(branchName, baseBranch);

    // 4. Save metadata for later use by `jcli pr`
    saveBranchMeta(branchName, { jiraKey, type, baseBranch });

    console.log(chalk.green(`\n  ✔ Branch ready: ${chalk.bold(branchName)}`));
    console.log(chalk.gray(`    Type: ${type}  ·  Base: ${baseBranch}\n`));
  } catch (err) {
    if (err.name === "ExitPromptError") {
      console.log(chalk.yellow("\n  Cancelled.\n"));
      process.exit(0);
    }
    console.error(chalk.red(`\n  ✖  ${err.message}\n`));
    process.exit(1);
  }
}
