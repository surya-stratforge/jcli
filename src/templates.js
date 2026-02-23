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
- [x] Manually tested in browser

---

## 🧾 Checklist
- [x] 🔄 I've pulled the latest code from the base branch
- [x] ✅ My code follows the project's style guidelines
- [x] 🧠 I've self-reviewed my code and cleaned up debug logs
- [x] 📝 Comments added for complex/critical logic
- [x] 🚫 No new ESLint/console warnings
- [x] 🔐 Proper access control/permission handling
- [x] 📦 All dependent changes are merged or published
- [x] 🛂 Input validation added where needed
- [x] 📈 Logging and error handling reviewed

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
- [x] Manually tested in browser


---

## 🧾 Checklist
- [x] 🔄 I've pulled the latest code from the base branch
- [x] ✅ My code follows the project's style guidelines
- [x] 🧠 I've self-reviewed my code and cleaned up debug logs
- [x] 📝 Comments added for complex/critical logic
- [x] 🚫 No new ESLint/console warnings
- [x] 🔐 Proper access control/permission handling
- [x] 📦 All dependent changes are merged or published
- [x] 🛂 Input validation added where needed
- [x] 📈 Logging and error handling reviewed

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
- [x] Manually tested in browser

---

## 🧾 Checklist
- [x] 🔄 I've pulled the latest code from the base branch
- [x] ✅ My code follows the project's style guidelines
- [x] 🧠 I've self-reviewed my code and cleaned up debug logs
- [x] 📝 Comments added for complex/critical logic
- [x] 🚫 No new ESLint/console warnings
- [x] 🔐 Proper access control/permission handling
- [x] 📦 All dependent changes are merged or published
- [x] 🛂 Input validation added where needed
- [x] 📈 Logging and error handling reviewed

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
- [x] Manually tested in browser

---

## 🧾 Checklist
- [x] 🔄 I've pulled the latest code from the base branch
- [x] ✅ My code follows the project's style guidelines
- [x] 🧠 I've self-reviewed my code and cleaned up debug logs
- [x] 📝 Comments added for complex/critical logic
- [x] 🚫 No new ESLint/console warnings
- [x] 🔐 Proper access control/permission handling
- [x] 📦 All dependent changes are merged or published
- [x] 🛂 Input validation added where needed
- [x] 📈 Logging and error handling reviewed

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
- [x] Manually tested in browser

---

## 🧾 Checklist
- [x] 🔄 I've pulled the latest code from the base branch
- [x] ✅ My code follows the project's style guidelines
- [x] 🧠 I've self-reviewed my code and cleaned up debug logs
- [x] 📝 Comments added for complex/critical logic
- [x] 🚫 No new ESLint/console warnings
- [x] 🔐 Proper access control/permission handling
- [x] 📦 All dependent changes are merged or published
- [x] 🛂 Input validation added where needed
- [x] 📈 Logging and error handling reviewed

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
