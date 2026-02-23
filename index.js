#!/usr/bin/env node
import { program } from 'commander';
import { cmdInit } from './commands/init.js';
import { cmdCommit } from './commands/commit.js';
import { cmdPr } from './commands/pr.js';

program
  .name('jcli')
  .description('Jira-aware git workflow CLI')
  .version('1.0.0');

program
  .command('init <jira_key>')
  .description('Initialize a branch for a Jira ticket')
  .action(cmdInit);

program
  .command('commit')
  .description('Stage all changes and commit (opens editor if no -m)')
  .option('-m, --message <msg>', 'Commit message inline')
  .action(cmdCommit);

program
  .command('pr')
  .description('Create a GitHub PR for the current branch')
  .action(cmdPr);

program.parse();
