# Shadowrocket 实操说明

本文补 README 和 [shortcut-guide.md](shortcut-guide.md) 里没展开的小火箭步骤，来自 iOS 26 真机配置。

模块订阅（若已 configure 到本仓库，把用户名换成 `91xinwei`）：
https://raw.githubusercontent.com/91xinwei/wloc/refs/heads/main/modules/wloc.module


选点页默认仍可用 https://wloc.xepesw.workers.dev/ ，自部署后改成自己的 Worker。

## 注意

- 原 `Yu9191/wloc` 的 raw 脚本已失效。模块正文里 `script-path` 必须指向本仓库或仍在线的镜像，否则页面会「模块未生效」。
- 改的是 Apple 网络定位，不是 GPS。iOS 26 有缓存，写入成功不等于天气立刻变。上游记录 iOS 27 beta 6 起 MITM 可能被拦。

## 步骤

1. 配置 → 模块 → URL 导入上方面模块并启用，点「更新模块」。
2. 当前配置 ⓘ → HTTPS 解密打开，HTTP/2 MitM 打开。域名含 `gs-loc.apple.com`、`gs-loc-cn.apple.com`。
3. 已有证书不要重复生成。设置 → 通用 → VPN 与设备管理安装描述文件；**关于本机 → 证书信任设置**打开完全信任。
4. 写入/清除时首页全局路由改成「代理」。超大广告配置干扰脚本时可先换 default 配置。
5. Safari 打开选点页。  
   - 「查询失败 / 模块未生效」：证书或模块未通  
   - 「无已保存的坐标」：模块已通  
   - 出现经纬度：已写入  
6. 日志在 **数据 → 代理**，搜 `gs-loc`，不要搜 `wloc`（后者只命中选点网站）。应出现 `/wloc-settings/save`。
7. 关定位 10 秒再开；iOS 26 建议重启，开机先开小火箭再开定位。用天气验证。
8. 恢复：选点页「清除数据」，或请求  
   `https://gs-loc.apple.com/wloc-settings/save?action=clear`  
   （不是 `clear=1`。）查询用 `action=query`。

## 自建两条指令（iCloud 加不上时）
https://gs-loc.apple.com/wloc-settings/save?lon=-118.2437&lat=34.0522
https://gs-loc.apple.com/wloc-settings/save?action=clear


快捷指令用「获取 URL 内容」GET。运行时小火箭需开启。

地图分享类指令必须从苹果地图「分享」触发，不能在快捷指令 App 里空跑。安装与迁移见 [shortcut-guide.md](shortcut-guide.md)。

## 和运营商 Wi-Fi Calling

定位只是条件之一，还需 E911 街道地址、系统「无线局域网通话」、出口 IP 与坐标城市一致。网页保存成功不代表通话开关能打开。
