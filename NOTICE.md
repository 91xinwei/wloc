# 来源、署名与许可证说明

本分支基于 Yu9191/wloc 的公开恢复版本。原作者 Yu9191 及原有贡献者的署名、提交历史和 LICENSE 保留。社区维护者的修改记录在 CHANGELOG 和 Git 历史中，不代表原作者认可或背书。

原仓库 README 在恢复基线 `529fcd841952571e79f40faf2d3e0ef90a7bdfa6` 的许可证段落写道：

> 本项目采用 AGPL-3.0 许可证。未经授权，禁止将本项目代码用于商业产品或上架应用商店。

以上原文为来源记录，不能把其中的禁止商业用途声明解释成标准 AGPL-3.0 自带的条款。标准许可与额外限制的关系见 [AGPL-3.0 第 7、10、13 节](https://www.gnu.org/licenses/agpl-3.0.html)及 [GNU 许可证 FAQ](https://www.gnu.org/licenses/gpl-faq.html)。本维护整理保留该声明及原 LICENSE，不另行声称取得商业或商店分发授权。

已识别的依赖和来源：

| 内容 | 来源或说明 |
| --- | --- |
| WLOC 脚本及 Worker | Yu9191/wloc；仓库 LICENSE 为 AGPL-3.0 |
| Hono | npm 锁文件记录 MIT；安装包自带许可证 |
| Leaflet 1.9.4 | 网页通过 CDN 加载，带 SRI 校验；[官方许可证](https://github.com/Leaflet/Leaflet/blob/v1.9.4/LICENSE) |
| 跨平台代理工具框架 | 上游致谢 NSNanoCat/Util；打包文件未恢复完整依赖构建清单 |
| 原始 WLOC 思路 | 上游致谢 FFF686868/proxypin-wloc-spoofer |
| 地图及搜索 | ArcGIS、OpenStreetMap、Carto、高德和 Nominatim 等外部服务，保留网页原有归属标记 |

这不是完整的软件物料或法律审计。尤其是 `dist/` 的第三方组件和可复现构建来源，仍需继续核查。
