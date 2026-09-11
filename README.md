<p align="center"><img src="wloc.jpg" width="144" alt="WLOC 图标" /></p>

# WLOC 社区维护版

基于 Yu9191/wloc 恢复的 Apple 网络定位修改工具。通过 Surge、Quantumult X、Loon、Stash 或 Shadowrocket 拦截 Wi-Fi/基站定位响应，配合网页选点和本地持久化存储使用。

本分支保留上游作者及贡献者记录，以 `529fcd8`（2026-09-04）为恢复基线。它不是原作者官方仓库，也不能修改 GPS 硬件定位。

> **兼容性状态：** 上游 README 报告 iOS 27 beta 6 起存在 WLOC TLS/MITM 限制。本维护版尚未进行真机复核，不承诺新版系统可用。网页保存成功仅表示配置写入成功，不代表系统定位已改变。

## 订阅地址

<!-- subscriptions:start -->
| 客户端 | 订阅地址 |
| --- | --- |
| Surge / Egern | [https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.sgmodule](https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.sgmodule) |
| Quantumult X | [https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.conf](https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.conf) |
| Loon | [https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.lpx](https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.lpx) |
| Stash | [https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.stoverride](https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.stoverride) |
| Shadowrocket | [https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.module](https://raw.githubusercontent.com/xepes0/wloc/refs/heads/main/modules/wloc.module) |

选点页面：[https://wloc.333012.xyz/](https://wloc.333012.xyz/)。

[浏览源码](https://github.com/xepes0/wloc) · [部署到 Cloudflare Workers](https://deploy.workers.cloudflare.com/?url=https://github.com/xepes0/wloc/tree/main/worker)
<!-- subscriptions:end -->

Egern 沿用上游 Surge 模块兼容说明，尚未单独复核。Stash 使用原生 `.stoverride`。

## 快捷指令

保留原作者提供的两个 iCloud 分享入口，可在 iPhone 上打开并添加：

| 快捷指令 | 安装入口 | 用途 |
| --- | --- | --- |
| wloc 设置地理位置 | [https://www.icloud.com/shortcuts/a82717d8fdad4e6280866fcf911173f7](https://www.icloud.com/shortcuts/a82717d8fdad4e6280866fcf911173f7) | 从地图分享位置，解析坐标并保存到代理客户端 |
| wloc 清理恢复位置 | [https://www.icloud.com/shortcuts/f42632d406504f24a2cd163af4fe012f](https://www.icloud.com/shortcuts/f42632d406504f24a2cd163af4fe012f) | 清除已保存的虚拟坐标 |

**使用步骤：**

1. 先启用本仓库对应的代理模块，完成 MITM 证书安装与信任。
2. 在苹果地图长按选点 → 共享 → 选择「wloc 设置地理位置」；高德地图可通过「分享 → 更多」进入分享菜单。
3. 运行后打开地图验证结果。需要恢复时，运行「wloc 清理恢复位置」。若模块参数另设了坐标，还需关闭模块或恢复默认参数。

> 以上是**原作者的快捷指令**，不是本社区重新发布或真机验证过的版本。原上游说明中的解析服务为 `wloc-spoofer.wloc.workers.dev`；若失效，请先部署自己的 Worker，再在快捷指令中替换解析服务地址。仓库链接更新不会自动更新已安装的快捷指令。具体操作见[快捷指令迁移说明](docs/shortcut-guide.md#快捷指令)。

## 使用方法

1. 订阅对应客户端模块，启用模块及其所需的 MITM，并在系统中信任该客户端生成的证书。
2. 打开你部署的选点页面，选点、搜索地点或粘贴地图分享链接。
3. 点击「储存到设备」。Safari 的保存请求需要经过启用模块的代理客户端。
4. 打开地图检查真实结果。网络定位可能被 GPS 或系统缓存覆盖。
5. 恢复时先清除页面中的生效坐标；如模块参数另设了坐标，关闭模块。系统缓存可能延迟恢复，必要时重启后验证。

只在自己拥有或获授权的设备上进行定位测试。详细操作、快捷指令迁移及故障分层见[使用说明](docs/shortcut-guide.md)。

## 部署

推荐自行部署 Worker。进入本仓库的 `worker` 目录运行：

```sh
npm ci
npm run build:check
npx wrangler login
npm run deploy
```

本项目使用 Node.js 22 或更新版本；Wrangler 已固定到锁文件。部署不需要 KV 或数据库。Cloudflare Pages 配置也保留，见[部署说明](docs/DEPLOYMENT.md)。

原作者的公共 Worker 和 Pages 不再作为默认选点服务；原快捷指令分享链接保留在上方，解析服务需按实际部署情况迁移。新维护者在 `project.config.json` 中填写仓库、发布分支及可选的选点站点，再运行：

```sh
npm run configure
npm run check:release
```

该命令会统一更新五种模块的脚本、图标和主页地址，以及本页订阅地址和网页源码入口。

## 工作原理与数据

```text
选点网页 → gs-loc.apple.com/wloc-settings/save
         → 客户端模块拦截并写入 wloc_settings
WLOC 响应 → dist/wloc.js 读取配置并修改返回坐标
```

- `worker/src/`：网页、地图链接解析、GCJ-02/BD-09/WGS84 转换与 HTTP 路由。
- `dist/`：上游已打包的两个代理脚本；**当前恢复版本缺少完整的原始脚本构建工程**，不能声称已实现可复现重建。
- `modules/`：五种客户端订阅文件，由 `templates/modules/` 和项目配置生成。
- `worker/test/`：解析、Stash 输出及 HTTP 行为的自动测试。

生效坐标保存在代理客户端的 `wloc_settings`；收藏保存在浏览器 `localStorage`，两者独立。Worker 的解析接口不主动写数据库或应用日志，并返回 `Cache-Control: no-store`。但地图、搜索、CDN 和托管平台会接收相应网络请求，不能将其理解为整个链路不产生记录。详见[安全与隐私说明](SECURITY.md)。

页面内部使用 WGS84。中国大陆的苹果地图/高德、百度链接按上游逻辑进行坐标转换；港澳台及境外存在不同规则，已用回归用例覆盖部分边界。外部地图链接格式变化仍可能影响解析。

## 参数

| 参数 | 含义 | 上游默认行为 |
| --- | --- | --- |
| longitude / latitude | 目标经纬度 | 未自定义时透传；默认占位坐标为 113.94114 / 22.544577 |
| accuracy | 精度，米 | 25 |
| randomRadius | 随机扰动半径，米 | 0，关闭 |
| logLevel | 日志级别 | info |

优先级：页面保存的坐标 > 模块参数 > 默认值。QX 可在网页设置扰动半径，其余客户端也可修改模块参数。保留上游协议路径、域名匹配和持久化键，便于旧用户迁移。

## 开发与维护

```sh
npm --prefix worker ci
npm run check
npm test
npm run build:check
npm run pages:build
```

`npm test` 同时执行 `.test.mjs` 和 `.test.js`，包括上游曾被默认命令漏掉的 Stash 测试。构建检查仅产出本地文件，不会部署。

提交方式见 [CONTRIBUTING.md](CONTRIBUTING.md)；恢复来源和缺失内容见[来源记录](docs/PROVENANCE.md)；待处理问题、发布步骤及真机验证清单见[维护说明](docs/MAINTENANCE.md)。

## 致谢

- [proxypin-wloc-spoofer](https://github.com/FFF686868/proxypin-wloc-spoofer) - 原始 WLOC 定位修改思路 by FFF686868
- [NSNanoCat/Util](https://github.com/NSNanoCat/util) - 跨平台脚本工具框架

### 贡献者

- [@YmlyZA](https://github.com/YmlyZA) - 百度地图支持、港澳台边界处理、GCJ 换算优化、回归测试覆盖 ([#83](https://github.com/Yu9191/wloc/pull/83))
- [@YeTianXingShi](https://github.com/YeTianXingShi) - randomRadius 随机坐标扰动功能原始实现 ([#70](https://github.com/Yu9191/wloc/pull/70))
- [@SajoLuo](https://github.com/SajoLuo) - Stash 响应格式修复 ([#66](https://github.com/Yu9191/wloc/pull/66))
- [@SkywardLab](https://github.com/SkywardLab) - 扩展 WLOC 备用域名拦截 ([#90](https://github.com/Yu9191/wloc/pull/90))
- [@beiming0000](https://github.com/beiming0000) - 逗号小数格式坐标丢失问题报告 ([#96](https://github.com/Yu9191/wloc/issues/96))

## 许可证

保留上游 [AGPL-3.0 许可证](LICENSE)、作者署名及贡献记录。原 README 还包含关于商业产品和应用商店的额外声明，原文及其与标准许可证的区别见 [NOTICE.md](NOTICE.md)。本次整理未改写 LICENSE，也未完成第三方打包组件的完整许可证审计。
