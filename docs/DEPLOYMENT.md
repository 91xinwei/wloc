# 部署说明

## 准备仓库

使用 Node.js 22 或更新版本。在仓库根目录编辑 `project.config.json`：

```json
{
  "repository": "你的GitHub用户名/仓库名",
  "branch": "main",
  "siteUrl": ""
}
```

`repository` 和 `branch` 使用实际发布位置；仓库须公开，客户端才能匿名下载 raw 脚本。`siteUrl` 可留空，已有自己的站点时填写 HTTPS 根地址。运行 `npm run configure` 生成模块和源码链接，再运行 `npm run check:release`。不要直接编辑生成的模块；改 `templates/modules/`。

## Cloudflare Workers

```sh
cd worker
npm ci
npm test
npm run build:check
npx wrangler login
npm run deploy
```

`build:check` 是 dry-run，不上传或发布。`deploy` 会真正写入 Cloudflare。需要独立项目名时，修改 `wrangler.jsonc` 的 `name`，避免覆盖自己已有的同名 Worker。配置没有绑定 KV、数据库或账户 ID。

从部署输出取得站点 URL，填写根目录 `project.config.json` 的 `siteUrl`，重新生成并提交模块。发布源码应与线上运行版本一致；网页底部提供源码入口。若从发布 tag 部署，可将配置中的 `branch` 设为相应 tag 后生成。

## Cloudflare Pages

```sh
cd worker
npm ci
npm run pages:build
npx wrangler login
npm run pages:deploy
```

`pages:build` 仅检查 Functions 打包，产物在仓库 `build/pages`。`pages:deploy` 使用 `wrangler.pages.jsonc` 以及 `worker/dist` 静态目录，并由 Wrangler 处理 `functions` 目录。首次使用时按提示选择或创建 Pages 项目。

同时修改项目名时也检查 `wrangler.pages.jsonc`；两个配置的 compatibility_date 保持一致。不要把两个配置的 name 当成域名。

## 部署后检查

- 首页正常加载，底部源码入口指向实际发布仓库。
- `/api/parse?u=31.230400,121.473700&format=json` 返回对应 lat/lon，并带 `Cache-Control: no-store`。
- `/api/parse?format=json` 返回 422，说明输入缺失。
- GitHub raw 模块中的两个脚本 URL 和图标可匿名访问。
- 真机检查保存、查询、清除，以及定位响应是否被拦截；网页成功不能替代这一步。

外部短链接、地图瓦片和搜索服务还需联网测试。Cloudflare 额度以自己的控制台为准，本项目不保证公共实例长期可用。
