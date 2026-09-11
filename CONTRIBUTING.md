# 参与维护

提交前阅读 docs/PROVENANCE.md 和 NOTICE.md，保留原作者和已有贡献者署名。

使用 Node.js 22+，运行 `npm --prefix worker ci` 安装锁定依赖。修改模块请编辑 `templates/modules/`，再运行 `npm run configure`；运行地址统一由 `project.config.json` 控制。

提交时说明具体触发条件、修改后的行为和验证结果。坐标转换或客户端兼容修复应添加能够重现真实问题的测试。不要直接将格式化后的 dist 当成已恢复的原始源码。

必要检查：`npm run check`、`npm test`、`npm run build:check`、`npm run pages:build`。真机结果请写明客户端版本、iOS 版本、网络环境及是否存在 GPS 信号，不要提交真实位置、token 或完整隐私日志。

未验证的兼容性结论应标为待验证。保持每次修改范围可审阅，独立列明部署与运行边界。
