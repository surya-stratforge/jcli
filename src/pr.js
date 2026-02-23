import chalk from "chalk";
import { select, confirm } from "@inquirer/prompts";
import { execa } from "execa";
import {
  assertGitRepo,
  assertGhCli,
  getRemoteBranches,
  getCurrentBranch,
  pushBranch,
  getGhUsername,
} from "./git.js";
import { loadProjectConfig, getBranchMeta } from "./config.js";
import { getTemplate, TICKET_TYPES } from "./templates.js";
import { openEditor } from "./editor.js";

const TYPE_LABELS = {
  bug: "bug",
  feature: "enhancement",
  chore: "chore",
  refactor: "refactor",
  hotfix: "hotfix",
};

export async function cmdPr() {
  try {
    await assertGitRepo();
    await assertGhCli();

    const currentBranch = await getCurrentBranch();
    const meta = getBranchMeta(currentBranch);
    const config = loadProjectConfig();

    console.log(chalk.cyan(`\n  jcli pr › ${chalk.bold(currentBranch)}\n`));

    // ── Resolve Jira key and type from branch meta ──────────────────────────
    const jiraKey = meta.jiraKey ?? currentBranch;
    let type = meta.type;

    if (!type) {
      // Branch wasn't created via jcli init — ask for type
      type = await select({
        message: "What type is this ticket? (needed for PR template)",
        choices: TICKET_TYPES.map((t) => ({ name: t.label, value: t.value })),
      });
    }

    console.log(chalk.gray(`  Ticket: ${jiraKey}  ·  Type: ${type}`));

    // ── Select target branch ────────────────────────────────────────────────
    let branches;
    try {
      branches = await getRemoteBranches();
    } catch {
      branches = ["main", "develop"];
    }

    // Remove current branch from targets
    branches = branches.filter((b) => b !== currentBranch);

    // Prioritise common base branches
    const priority = ["main", "master", "develop", "staging"];
    branches.sort((a, b) => {
      const ai = priority.indexOf(a);
      const bi = priority.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });

    // Pre-select the base branch that was used during init (if available)
    const defaultBase = meta.baseBranch ?? "main";
    const defaultIndex = branches.indexOf(defaultBase);

    const targetBranch = await select({
      message: "Target branch for this PR?",
      choices: branches.map((b) => ({ name: b, value: b })),
      default: defaultIndex >= 0 ? defaultBase : branches[0],
    });

    // ── Push branch ─────────────────────────────────────────────────────────
    console.log(chalk.gray(`\n  Pushing branch to origin…`));
    await pushBranch(currentBranch);
    console.log(chalk.gray("  Pushed."));

    // ── Get current GitHub user for self-assign ─────────────────────────────
    let ghUser;
    try {
      ghUser = await getGhUsername();
    } catch {
      ghUser = null;
    }

    // ── Build PR title ──────────────────────────────────────────────────────
    const defaultTitle = `${type.toUpperCase()}: ${jiraKey} `;
    const prTitle = defaultTitle; // user will refine in editor if desired

    // ── Resolve reviewers from config ───────────────────────────────────────
    const reviewers = config.reviewers ?? [];

    // ── Open editor with PR template ────────────────────────────────────────
    console.log(chalk.gray("\n  Opening editor with PR template…"));

    const templateBody = getTemplate(type, jiraKey, prTitle);

    const editorContent = [
      `<!-- PR TITLE (first non-comment line will be used) -->`,
      `${jiraKey} `,
      ``,
      `<!-- PR BODY below — edit freely, save and close to submit -->`,
      templateBody,
    ].join("\n");

    const edited = openEditor(editorContent, ".md");

    if (!edited) {
      console.log(chalk.yellow("\n  PR creation aborted (empty content).\n"));
      process.exit(0);
    }

    // Parse title and body from editor content
    // First non-comment, non-empty line = title; rest = body
    const lines = edited
      .split("\n")
      .filter((l) => !l.startsWith("<!--") && !l.includes("-->"));

    const titleLine =
      lines.find((l) => l.trim().length > 0)?.trim() ?? `${jiraKey}`;
    const bodyLines = lines.slice(
      lines.indexOf(lines.find((l) => l.trim() === titleLine)) + 1,
    );
    const body = bodyLines.join("\n").trim();

    // ── Create the PR ───────────────────────────────────────────────────────
    console.log(chalk.gray("\n  Creating PR…"));

    const args = [
      "pr",
      "create",
      "--title",
      titleLine,
      "--body",
      body || templateBody,
      "--base",
      targetBranch,
    ];

    if (ghUser) {
      args.push("--assignee", ghUser);
    }

    if (reviewers.length > 0) {
      for (const reviewer of reviewers) {
        args.push("--reviewer", reviewer);
      }
    }

    const label = TYPE_LABELS[type];
    if (label) {
      args.push("--label", label);
    }

    const { stdout } = await execa("gh", args, { stdio: "pipe" });
    const prUrl = stdout.trim().split("\n").at(-1);

    console.log(chalk.green(`\n  ✔ PR created!`));
    console.log(chalk.gray(`    ${chalk.underline.blue(prUrl)}`));

    if (reviewers.length > 0) {
      console.log(chalk.gray(`    Reviewers: ${reviewers.join(", ")}`));
    }
    if (ghUser) {
      console.log(chalk.gray(`    Assigned to: ${ghUser}`));
    }
    console.log();
  } catch (err) {
    if (err.name === "ExitPromptError") {
      console.log(chalk.yellow("\n  Cancelled.\n"));
      process.exit(0);
    }

    const stderr = err.stderr ?? "";
    if (stderr.includes("already exists")) {
      console.log(chalk.yellow("\n  A PR for this branch already exists."));
      console.log(chalk.gray("  Open it with: gh pr view --web\n"));
      process.exit(0);
    }

    console.error(chalk.red(`\n  ✖  ${err.message}\n`));
    process.exit(1);
  }
}
