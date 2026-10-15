import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync, unlinkSync } from 'node:fs';

function git(args, options = {}) {
  const result = spawnSync('git', args, { encoding: 'utf8', ...options });
  if (result.status !== 0) throw new Error('Git test setup failed: ' + args[0]);
  return result.stdout.trim();
}
function expectBlocked(label) {
  const result = spawnSync(process.execPath, ['scripts/check-repository.mjs', '--staged'], { encoding: 'utf8' });
  if (result.status !== 1) throw new Error(label + ' was not blocked.');
  console.log('PASS: ' + label);
}

const originalTree = git(['write-tree']);
const cases = [
  { path: 'security-upload-probe.jpeg', content: Buffer.from('image upload test'), label: 'unapproved image filename' },
  { path: 'security-renamed-upload-probe.txt', content: Buffer.from([137,80,78,71,13,10,26,10,0]), label: 'image renamed to a text file' },
  { path: '.env.security-probe', content: Buffer.from('EXAMPLE=placeholder\n'), label: 'private environment file' },
  { path: 'security-secret-probe.txt', content: Buffer.from(['gh', 'p_'].join('') + 'A'.repeat(36)), label: 'synthetic token pattern (not a real credential)' },
];
for (const probe of cases) {
  if (existsSync(probe.path)) throw new Error('Test path already exists; preserved: ' + probe.path);
  try {
    writeFileSync(probe.path, probe.content);
    git(['add', '--force', '--', probe.path]);
    expectBlocked(probe.label);
  } finally {
    git(['restore', '--staged', '--', probe.path]);
    if (existsSync(probe.path)) unlinkSync(probe.path);
  }
}

const approvedPath = 'public/images/boiler-check.webp';
const originalEntry = git(['ls-files', '--stage', '--', approvedPath]).split(/\s+/);
const syntheticBlob = git(['hash-object', '-w', '--stdin'], { input: Buffer.from('replacement image probe') });
try {
  git(['update-index', '--cacheinfo', `${originalEntry[0]},${syntheticBlob},${approvedPath}`]);
  expectBlocked('replacement bytes under an approved image filename');
} finally {
  git(['update-index', '--cacheinfo', `${originalEntry[0]},${originalEntry[1]},${approvedPath}`]);
}
if (git(['write-tree']) !== originalTree) throw new Error('Test changed the original staged tree.');
const final = spawnSync(process.execPath, ['scripts/check-repository.mjs', '--staged'], { stdio: 'inherit' });
if (final.status !== 0) process.exit(final.status || 1);
console.log('All repository safety checks passed; staged content was preserved.');
