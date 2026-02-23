# jcli

> Jira-aware git workflow CLI. Three commands, zero friction.

---

## Install

```sh
npm install
npm link
```

Requires Node ≥ 18, `git`, and [`gh`](https://cli.github.com) (authenticated).

---

## Commands

### `jcli init <JIRA_KEY>`

```
jcli init RFV2-123
```

1. Validates the Jira key format (`ABC-123`)
2. Prompts: **ticket type** (Bug / Feature / Chore / Refactor / Hotfix)
3. Prompts: **base branch** (lists remote branches, common ones first)
4. Creates and checks out a branch named **exactly** `RFV2-123`
5. Saves metadata (type, base) for use in `jcli pr`

---

### `jcli commit [-m "message"]`

```sh
jcli commit                                    # opens $EDITOR
jcli commit -m "fix(auth): handle null token"  # inline
```

- Stages all changes (`git add .`)
- With `-m`: commits immediately
- Without `-m`: opens your `$EDITOR` with a commit message template
  - Comment lines (`#`) are stripped
  - Empty save = abort

---

### `jcli pr`

```sh
jcli pr
```

1. Prompts: **target branch** (remote branches, common ones first)
2. Pushes current branch to `origin`
3. Opens `$EDITOR` with the correct **PR template** for the ticket type
4. Parses the first non-comment line as the **PR title**
5. Creates the PR via `gh` with:
   - Auto-assign to **you** (`gh api user`)
   - Auto-add **reviewers** from `jcli.config.json`
   - Prints the PR URL

---

## Config (`jcli.config.json`)

Place in your repo root:

```json
{
  "reviewers": ["alice", "bob", "carol"]
}
```

That's it. Reviewers are always assigned on every PR.

---

## Ticket Types & Templates

| Type | Template covers |
|------|----------------|
| 🐛 Bug | Problem, Root cause, Solution, Testing checklist |
| ✨ Feature | Summary, Implementation, How to test, Screenshots |
| 🔧 Chore | What changed, Risk assessment |
| ♻️ Refactor | What/why, Changes, Verification |
| 🚨 Hotfix | Incident, Fix, Root cause, Validation |

---

## Full Example

```sh
# 1. Start work on a Jira ticket
jcli init RFV2-456
# → picks type: Bug
# → picks base: main
# → creates branch: RFV2-456

# 2. Do your work, then commit
jcli commit -m "fix(login): handle expired session tokens"
# or open editor:
jcli commit

# 3. Open a PR
jcli pr
# → picks target: main
# → opens editor with Bug template pre-filled
# → creates PR, assigns you + reviewers
# → prints PR URL
```

---

## State

Branch metadata (type, base branch, jira key) is stored in `~/.jcli/state.json`.
This is how `jcli pr` knows which template to use even after you've restarted your terminal.
