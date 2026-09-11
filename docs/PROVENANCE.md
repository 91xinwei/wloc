# 恢复来源

核查日期：2026-09-11。

GitHub 公共 API 对 `Yu9191/wloc` 和 `Yu9191` 用户均返回 404。它只证明当时公开不可访问，不能确定作者是否主动删除仓库。

| 来源 | 核实结果 |
| --- | --- |
| [lixing0016/Yu9191_wloc](https://github.com/lixing0016/Yu9191_wloc) | 首次恢复到 ea204aedfd36b3d407c3506ac25db506a6c1b419 |
| [zuiliuyun/wloc](https://github.com/zuiliuyun/wloc) | 快进恢复到 529fcd841952571e79f40faf2d3e0ef90a7bdfa6 |
| [sakuno214/wloc](https://github.com/sakuno214/wloc) | main 与 529fcd8 一致 |
| [55063/wloc](https://github.com/55063/wloc) | main 与 529fcd8 一致 |

基线包含 46 条可达提交。最后找到的原作者提交日期为 2026-09-04，不保证这是原库失联前的最终版本。镜像的推送日期不等于原代码修改日期。

恢复内容：README、LICENSE、两份 dist 代理脚本、五种模块、Worker 源码与测试。未恢复 Issues/PR 讨论、Release 附件；所选镜像没有 tags。

上游历史中曾有 `src/wloc-settings.js`，后在 `28e21ba` 删除；它是旧版片段，不能用于重建当前全部 dist。未找到完整 `wloc.js` 源码、根 package.json 或 Rollup 工程。查看旧代码可用 `git show 4821f11:src/wloc-settings.js`。

[upstream-integrity.json](upstream-integrity.json) 记录恢复基线、两份 dist 和 LICENSE 的 SHA-256（规范化 LF 换行）。维护整理不改动这些文件。将来改动时应说明来源、建立测试并有意识地更新完整性记录。

本次本地另留 Git bundle 及恢复目录，它们被 .gitignore 排除，不混入发布仓库。原始版本始终可以通过 `git show 529fcd8:README.md` 等 Git 命令查看。
