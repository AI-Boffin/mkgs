import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

function git(args, binary = false) {
  const result = spawnSync('git', args, { encoding: binary ? undefined : 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) throw new Error('Cannot inspect Git data. Run this check in the repository.');
  return result.stdout;
}

const mode = process.argv[2] || '--staged';
const manifestPath = '.security/approved-public-assets.json';
const manifest = JSON.parse(readFileSync(new URL('../.security/approved-public-assets.json', import.meta.url), 'utf8'));
const imageExtension = /\.(?:png|jpe?g|webp|gif|svg|ico|bmp|tiff?|avif|heic|heif)$/i;
const secretRules = [
  ['private key', /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{30,255}|github_pat_[A-Za-z0-9_]{40,255})\b/],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['OpenAI-style API key', /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,}\b/],
  ['Google API key', /\bAIza[A-Za-z0-9_-]{35}\b/],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ['hardcoded credential', /\b(?:api[_-]?key|password|client[_-]?secret|access[_-]?token)\s*[:=]\s*['"][A-Za-z0-9_+/.=-]{16,}['"]/i],
];

function looksLikeImage(buffer) {
  const prefix = buffer.subarray(0, 512);
  return prefix.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ||
    (prefix[0] === 255 && prefix[1] === 216 && prefix[2] === 255) ||
    /^GIF8[79]a/.test(prefix.toString('latin1')) ||
    (prefix.toString('ascii', 0, 4) === 'RIFF' && prefix.toString('ascii', 8, 12) === 'WEBP') ||
    /^\s*(?:<\?xml[^>]*>\s*)?<svg[\s>]/i.test(prefix.toString('utf8')) ||
    /ftyp(?:avif|avis|heic|heix|mif1)/.test(prefix.toString('ascii'));
}

function entriesAt(ref) {
  return git(['ls-tree', '-rz', '--full-tree', ref]).split('\0').filter(Boolean).map(line => {
    const match = line.match(/^\d+ (\w+) ([0-9a-f]+)\t(.+)$/s);
    return { type: match[1], sha: match[2], path: match[3] };
  });
}

function stagedEntries() {
  return git(['ls-files', '--stage', '-z']).split('\0').filter(Boolean).map(line => {
    const match = line.match(/^\d+ ([0-9a-f]+) (\d+)\t(.+)$/s);
    if (match[2] !== '0') throw new Error('Resolve merge conflicts before committing.');
    return { type: 'blob', sha: match[1], path: match[3] };
  });
}

const failures = new Set();
const checked = new Set();
function inspect(entries) {
  for (const entry of entries) {
    if (entry.type !== 'blob' || checked.has(entry.path + ':' + entry.sha)) continue;
    checked.add(entry.path + ':' + entry.sha);
    const name = entry.path;
    if (/^(?:private-reference|artifacts|\.npm-cache)\//i.test(name) ||
        (/(^|\/)\.env(?:$|[.])/i.test(name) && name !== '.env.example') ||
        /\.(?:pem|p12|pfx|key|keystore|jks)$/i.test(name) ||
        /(^|\/)(?:id_rsa|id_ed25519|credentials\.json|service-account[^/]*\.json)$/i.test(name)) {
      failures.add(`${name}: private or credential file is not permitted`);
      continue;
    }
    const content = git(['cat-file', 'blob', entry.sha], true);
    if (imageExtension.test(name) || looksLikeImage(content)) {
      const approved = manifest[name] || [];
      const digest = createHash('sha256').update(content).digest('hex');
      if (!approved.includes(digest)) failures.add(`${name}: image is not an approved generated website asset`);
    }
    if (content.subarray(0, 8000).includes(0)) continue;
    const text = content.toString('utf8');
    for (const [label, pattern] of secretRules) {
      if (pattern.test(text)) failures.add(`${name}: potential ${label} detected (value withheld)`);
    }
  }
}

try {
  if (mode === '--staged') inspect(stagedEntries());
  else if (mode === '--history' || mode === '--push') {
    const refs = mode === '--push' ? readFileSync(0, 'utf8').trim().split('\n').filter(Boolean).map(line => line.split(/\s+/)[1]).filter(sha => !/^0+$/.test(sha)) : [process.argv[3] || 'HEAD'];
    const commits = new Set(refs.flatMap(ref => git(['rev-list', ref]).trim().split('\n').filter(Boolean)));
    for (const commit of commits) inspect(entriesAt(commit));
  } else throw new Error('Use --staged, --history [ref], or --push.');
  if (failures.size) {
    console.error('Repository safety check blocked this operation:\n' + [...failures].map(line => '- ' + line).join('\n'));
    process.exitCode = 1;
  } else console.log(`Repository safety check passed (${checked.size} file versions checked).`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
