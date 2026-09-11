import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import app from '../src/index.js';
import { SOURCE_URL, MODULE_LINKS } from '../src/project.js';

test('首页包含源码入口且内联脚本可解析', async () => {
  const response = await app.request('/');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(`href="${SOURCE_URL}"`));
  assert.equal(MODULE_LINKS.length, 5);
  for (const { url } of MODULE_LINKS) {
    assert.ok(html.includes(`href="${url}"`));
    assert.ok(html.includes(`>${url}</a>`), '模块地址应以完整 URL 显示');
  }
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x => x[1]).filter(x => x.trim());
  assert.ok(scripts.length > 0);
  for (const script of scripts) new vm.Script(script);
});

test('API JSON 坐标结果带 CORS 和 no-store', async () => {
  const response = await app.request('/api/parse?u=31.230400,121.473700&format=json');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { lat: 31.2304, lon: 121.4737, name: '' });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('access-control-allow-origin'), '*');
});

test('API 保留快捷指令使用的纯文本模式', async () => {
  const response = await app.request('/api/parse?u=31.230400,121.473700');
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'lat=31.2304&lon=121.4737');
});

test('API 空输入错误不能被缓存', async () => {
  const response = await app.request('/api/parse?format=json');
  assert.equal(response.status, 422);
  assert.ok((await response.json()).error);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('未知路由返回 404', async () => {
  assert.equal((await app.request('/does-not-exist')).status, 404);
});
