export const TEMPLATES = {
  bug: `# 📌 Pull Request Summary
<!-- Briefly describe what this PR does -->

## 📦 Type of Change
- [x] 🐛 Bug fix (non-breaking fix)
- [ ] ✨ Feature (new functionality)
- [ ] 🔧 Refactor (code change with no user impact)
- [ ] 🧪 Test (adding or updating tests)
- [ ] 💄 UI Update (styling, responsive tweaks)
- [ ] 🧹 Chore (build config, CI/CD, etc.)
- [ ] 📚 Documentation update
- [ ] ⚠️ Breaking change

---

## 🧪 How Has This Been Tested?
- [ ] Manually tested in browser
- [ ] Unit tests added / updated
- [ ] Edge cases considered

---

## 🧾 Checklist
- [ ] 🔄 I've pulled the latest code from the base branch
- [ ] ✅ My code follows the project's style guidelines
- [ ] 🧠 I've self-reviewed my code and cleaned up debug logs
- [ ] 📝 Comments added for complex/critical logic
- [ ] 🚫 No new ESLint/console warnings
- [ ] 🔐 Proper access control/permission handling
- [ ] 📦 All dependent changes are merged or published
- [ ] 🛂 Input validation added where needed
- [ ] 📈 Logging and error handling reviewed

---

<!-- Link auto-inserted by jcli -->
`,

  feature: `# 📌 Pull Request Summary
<!-- Briefly describe what this PR does -->

## 📦 Type of Change
- [ ] 🐛 Bug fix (non-breaking fix)
- [x] ✨ Feature (new functionality)
- [ ] 🔧 Refactor (code change with no user impact)
- [ ] 🧪 Test (adding or updating tests)
- [ ] 💄 UI Update (styling, responsive tweaks)
- [ ] 🧹 Chore (build config, CI/CD, etc.)
- [ ] 📚 Documentation update
- [ ] ⚠️ Breaking change

---

## 🧪 How Has This Been Tested?
- [ ] Manually tested in browser
- [ ] Unit tests added / updated
- [ ] Edge cases considered

---

## 🧾 Checklist
- [ ] 🔄 I've pulled the latest code from the base branch
- [ ] ✅ My code follows the project's style guidelines
- [ ] 🧠 I've self-reviewed my code and cleaned up debug logs
- [ ] 📝 Comments added for complex/critical logic
- [ ] 🚫 No new ESLint/console warnings
- [ ] 🔐 Proper access control/permission handling
- [ ] 📦 All dependent changes are merged or published
- [ ] 🛂 Input validation added where needed
- [ ] 📈 Logging and error handling reviewed

---

<!-- Link auto-inserted by jcli -->
`,

  chore: `# 📌 Pull Request Summary
<!-- Briefly describe what this PR does -->

## 📦 Type of Change
- [ ] 🐛 Bug fix (non-breaking fix)
- [ ] ✨ Feature (new functionality)
- [ ] 🔧 Refactor (code change with no user impact)
- [ ] 🧪 Test (adding or updating tests)
- [ ] 💄 UI Update (styling, responsive tweaks)
- [x] 🧹 Chore (build config, CI/CD, etc.)
- [ ] 📚 Documentation update
- [ ] ⚠️ Breaking change

---

## 🧪 How Has This Been Tested?
- [ ] Manually tested in browser
- [ ] Existing tests still pass
- [ ] No unintended side-effects verified

---

## 🧾 Checklist
- [ ] 🔄 I've pulled the latest code from the base branch
- [ ] ✅ My code follows the project's style guidelines
- [ ] 🧠 I've self-reviewed my code and cleaned up debug logs
- [ ] 📝 Comments added for complex/critical logic
- [ ] 🚫 No new ESLint/console warnings
- [ ] 🔐 Proper access control/permission handling
- [ ] 📦 All dependent changes are merged or published
- [ ] 🛂 Input validation added where needed
- [ ] 📈 Logging and error handling reviewed

---

<!-- Link auto-inserted by jcli -->
`,

  refactor: `# 📌 Pull Request Summary
<!-- Briefly describe what this PR does -->

## 📦 Type of Change
- [ ] 🐛 Bug fix (non-breaking fix)
- [ ] ✨ Feature (new functionality)
- [x] 🔧 Refactor (code change with no user impact)
- [ ] 🧪 Test (adding or updating tests)
- [ ] 💄 UI Update (styling, responsive tweaks)
- [ ] 🧹 Chore (build config, CI/CD, etc.)
- [ ] 📚 Documentation update
- [ ] ⚠️ Breaking change

---

## 🧪 How Has This Been Tested?
- [ ] Manually tested in browser
- [ ] All existing tests pass
- [ ] Behaviour confirmed unchanged

---

## 🧾 Checklist
- [ ] 🔄 I've pulled the latest code from the base branch
- [ ] ✅ My code follows the project's style guidelines
- [ ] 🧠 I've self-reviewed my code and cleaned up debug logs
- [ ] 📝 Comments added for complex/critical logic
- [ ] 🚫 No new ESLint/console warnings
- [ ] 🔐 Proper access control/permission handling
- [ ] 📦 All dependent changes are merged or published
- [ ] 🛂 Input validation added where needed
- [ ] 📈 Logging and error handling reviewed

---

<!-- Link auto-inserted by jcli -->
`,

  hotfix: `# 📌 Pull Request Summary
<!-- Briefly describe what this PR does -->

## 📦 Type of Change
- [x] 🐛 Bug fix (non-breaking fix)
- [ ] ✨ Feature (new functionality)
- [ ] 🔧 Refactor (code change with no user impact)
- [ ] 🧪 Test (adding or updating tests)
- [ ] 💄 UI Update (styling, responsive tweaks)
- [ ] 🧹 Chore (build config, CI/CD, etc.)
- [ ] 📚 Documentation update
- [x] ⚠️ Breaking change

---

## 🧪 How Has This Been Tested?
- [ ] Manually tested in browser
- [ ] Tested in staging / production-like environment
- [ ] Monitoring / alerts checked after deploy

---

## 🧾 Checklist
- [ ] 🔄 I've pulled the latest code from the base branch
- [ ] ✅ My code follows the project's style guidelines
- [ ] 🧠 I've self-reviewed my code and cleaned up debug logs
- [ ] 📝 Comments added for complex/critical logic
- [ ] 🚫 No new ESLint/console warnings
- [ ] 🔐 Proper access control/permission handling
- [ ] 📦 All dependent changes are merged or published
- [ ] 🛂 Input validation added where needed
- [ ] 📈 Logging and error handling reviewed

---

<!-- Link auto-inserted by jcli -->
`,
};

export const TICKET_TYPES = [
  { value: "bug", label: "🐛  Bug" },
  { value: "feature", label: "✨  Feature" },
  { value: "chore", label: "🔧  Chore" },
  { value: "refactor", label: "♻️   Refactor" },
  { value: "hotfix", label: "🚨  Hotfix" },
];

export function getTemplate(type, jiraKey, prTitle = "", prUrl = "") {
  const base = TEMPLATES[type] ?? TEMPLATES.feature;
  const jiraLink = `[${jiraKey}](https://stratforge.atlassian.net/browse/${jiraKey})`;
  const footer = prUrl
    ? `[${prTitle || prUrl}](${prUrl}) · ${jiraLink}`
    : jiraLink;
  return base.replace("<!-- Link auto-inserted by jcli -->", footer);
}
