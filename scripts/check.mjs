import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { generatedFiles } from './configure.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const { config, files } = await generatedFiles();
const errors = [];
for (const [name, expected] of files) {
  const actual = await readFile(path.join(root, name), 'utf8').catch(() => '');
  if (actual.replaceAll('\r\n', '\n') !== expected) errors.push(`${name} 与配置不一致，请运行 npm run configure`);
}
if (/YOUR_GITHUB_OWNER/.test(config.repository)) {
  if (process.argv.includes('--release')) errors.push('尚未填写你的 GitHub 仓库地址');
  else console.warn('待发布配置：GitHub 仓库地址尚未填写。');
}
const manifest = JSON.parse(await readFile(path.join(root, 'docs/upstream-integrity.json'), 'utf8'));
for (const [name, expected] of Object.entries(manifest.files)) {
  // Git normalizes text line endings; hash the canonical LF representation.
  const content = (await readFile(path.join(root, name), 'utf8')).replaceAll('\r\n', '\n');
  if (createHash('sha256').update(content).digest('hex') !== expected) errors.push(`${name} 与上游完整性记录不同，请审核修改并更新记录`);
}
for (const name of await readdir(path.join(root, 'modules'))) {
  const content = await readFile(path.join(root, 'modules', name), 'utf8');
  if (/Yu9191\/wloc|wloc-pages\.pages\.dev|wloc-spoofer\.wloc\.workers\.dev|icloud\.com\/shortcuts/.test(content)) errors.push(`${name} 仍含旧运行链接`);
  for (const target of ['dist/wloc.js', 'dist/wloc-settings.js']) if (!content.includes(target)) errors.push(`${name} 缺少 ${target}`);
}
for (const name of ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CHANGELOG.md', 'NOTICE.md', ...['DEPLOYMENT.md', 'PROVENANCE.md', 'MAINTENANCE.md', 'shortcut-guide.md'].map(x => `docs/${x}`)]) {
  const content = await readFile(path.join(root, name), 'utf8');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    try { await readFile(path.resolve(root, path.dirname(name), target)); }
    catch { errors.push(`${name} 的本地链接不存在: ${target}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('仓库配置、模块链接、文档链接和上游文件完整性检查通过。');
