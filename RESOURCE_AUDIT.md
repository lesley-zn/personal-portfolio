# 静态资源检查

2026-11-04：对 dist 内 HTML/CSS/JS 的 src、href、CSS url 引用做静态存在性检查，共匹配 244 项。没有发现明确的字面量本地路径缺失。

有 8 项属于 JS 模板表达式，不能以文件名直接检查：carrier-app.js 中 icon-${i}.svg 与 ${r.result}；robot-motion-player.js 中 ${assets+v[2]}；robot-orbit-player.js 中 ${A}background.png、${A}core-alpha.png、${A}satellites-alpha.png、${A+v[2]}；robot-original-demo.js 中 ${assets+current[2]}。

这些不是已确认的断链。上传图片产生的 r.result 是运行时数据；机器人动态资源需结合页面状态检查。原稿资源目录和当前动画使用的 scene-source.png 在磁盘存在。此检查不覆盖任意 JS 字符串路径、外部链接可访问性、Linux 大小写差异、图片解码或动画实际播放；云端仍须浏览器验收。

本轮未安装依赖或重新生成页面，未对 Git 历史做完整秘密扫描，因此不能宣称已完成上传前安全审计。未发现运行网站必需的外部构建依赖；本地验证脚本与插件缓存不属于运行网站的依赖。
