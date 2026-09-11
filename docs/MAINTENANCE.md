# 维护与发布

## 当前基线

原作者提交 `529fcd8`，保留 46 条历史。社区整理阶段尚未发布版本，使用 CHANGELOG 的 Unreleased 段落。

## 已知维护边界

- dist 缺少完整源工程，当前保持字节语义与上游一致；优先补齐可审阅源码和可复现构建。
- 上游报告 iOS 27 beta 6 起的 TLS 限制，未获得本分支真机验证。不要仅凭网页或单元测试宣称兼容。
- dist 设置脚本对经纬度 0 的查询使用真值判断；缺失保存参数也有变成 0 的风险，需建立独立回归测试后修复。
- 设置接口仍沿用上游宽松 CORS 和 GET 写入方式；变更需要考虑网页与快捷指令兼容。
- 地图短链和 DNS 行为依赖外部服务；解析器的字面 IP 限制不等于完整 SSRF 防护，不应未经审查移植成可访问内网的普通 Node 服务。
- 原始第三方打包清单、许可证声明冲突及已失效的 PR 讨论仍需追溯。

## 每次发布

1. 核对 project.config.json 中的公开仓库、目标分支或 tag 和站点。
2. 运行 `npm run configure`、`npm run check:release`、`npm test`。
3. 运行 Workers dry-run 和 Pages Functions 构建。
4. 审阅 `git diff --check` 和变更；确保不包含 token、证书私钥、.dev.vars、本地 bundle、node_modules。
5. 对改动涉及的客户端真机测试保存、查询、清除、模块参数、WLOC 响应和恢复真实定位，并记录设备及系统版本。
6. 更新 CHANGELOG，明确代码检查和真机验证的区别。
7. 推送代码后核对匿名 raw URL，再决定是否部署或打 tag。

首次推送到空仓库时，维护分支可以推到 main：`git push -u origin HEAD:main`。先用 `git ls-remote origin` 检查远端；如果已有提交，先 fetch 和比较，不能默认强推。

## 自动检查

GitHub Actions 在 push / pull_request 时使用只读仓库权限，安装 worker 锁定依赖，执行检查、测试及两种构建。不包含部署凭据或自动发布操作。配置尚未填写真实仓库时，普通检查仍可运行，发布检查会明确阻止遗漏。
