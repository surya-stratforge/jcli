import { execa } from 'execa';

export async function assertGitRepo() {
  try {
    await execa('git', ['rev-parse', '--git-dir'], { stdio: 'pipe' });
  } catch {
    throw new Error('Not inside a git repository.');
  }
}

export async function assertGhCli() {
  try {
    await execa('gh', ['auth', 'status'], { stdio: 'pipe' });
  } catch {
    throw new Error(
      'gh CLI not installed or not authenticated.\n  Install: https://cli.github.com\n  Auth: gh auth login'
    );
  }
}

export async function getLocalBranches() {
  const { stdout } = await execa('git', ['branch', '--format=%(refname:short)'], { stdio: 'pipe' });
  return stdout.split('\n').map(b => b.trim()).filter(Boolean);
}

export async function getRemoteBranches() {
  try {
    await execa('git', ['fetch', '--quiet'], { stdio: 'pipe' });
  } catch {
    // fetch failure is non-fatal, continue with cached refs
  }
  const { stdout } = await execa(
    'git', ['branch', '-r', '--format=%(refname:short)'],
    { stdio: 'pipe' }
  );
  return stdout
    .split('\n')
    .map(b => b.trim().replace(/^origin\//, ''))
    .filter(b => b && !b.startsWith('HEAD'));
}

export async function getCurrentBranch() {
  const { stdout } = await execa('git', ['branch', '--show-current'], { stdio: 'pipe' });
  return stdout.trim();
}

export async function checkoutBranch(name, base) {
  // Fetch base first so it's up to date
  try {
    await execa('git', ['fetch', 'origin', base, '--quiet'], { stdio: 'pipe' });
  } catch {
    // non-fatal
  }
  await execa('git', ['checkout', '-b', name, `origin/${base}`], { stdio: 'pipe' });
}

export async function stageAll() {
  await execa('git', ['add', '.'], { stdio: 'pipe' });
}

export async function gitCommit(message) {
  await execa('git', ['commit', '-m', message], { stdio: 'pipe' });
}

export async function pushBranch(branch) {
  await execa('git', ['push', '-u', 'origin', branch], { stdio: 'pipe' });
}

export async function getGhUsername() {
  const { stdout } = await execa('gh', ['api', 'user', '--jq', '.login'], { stdio: 'pipe' });
  return stdout.trim();
}
