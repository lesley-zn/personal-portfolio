# 朱宁 UX/UI 个人作品集

更新：2026-11-04。依据当前会话和磁盘文件整理；未确认的经历、研究、成果与上线数据不得编造。

## 背景与设计决策

- 目标岗位 UX/UI；计划展示四个项目。汽车协同及更早的智慧矿山运输项目不纳入当前作品集。
- 参考 https://fanfan-portfolio-site.vercel.app/ 及 /projects ，尤其省域数仓平台与数字农业管理平台的案例章节、排版和展示方式。参考结构不代表拥有对方文字、图片或成果的使用权。
- 首页展示项目入口，完整案例在点击项目后展示；重视视觉品质、信息层级与交互。
- 承运商 APP 允许基于原功能做作品集优化；作品集改进方案不能冒充实际交付成果。
- 机器人项目必须保留原设计稿，不使用此前重新设计的大屏。设计规范可按原大屏与后台整理。

## 源码和运行

本文件所在目录即独立源码根目录。dist/ 是直接维护的 HTML/CSS/JS 源码与静态资源，同时是发布目录，并非可丢弃的编译产物。
无 package.json、锁文件或必需安装步骤；不需要 npm install 或构建。可在仓库根目录执行 `python3 -m http.server 4173 --bind 0.0.0.0 --directory dist`，再访问 /index.html。该命令需环境提供 Python 3。
不要用 file:// 作为动画、iframe 通信与数据加载的验收环境。
.openai/hosting.json 保留已有 Sites 项目标识与 static.directory=dist；不能将迁移开发环境视为重新创建网站的授权。

## 页面与当前进度

- dist/index.html：首页；dist/projects.html：项目列表；dist/about-me.html：个人介绍。个人邮箱、电话、头像等仍有空位，见 projects.json。
- dist/carrier.html：承运商 APP 案例；carrier-prototype.html：交互原型；carrier-app.js、carrier-app.css 及相关版本 CSS 支撑展示。当前品牌为“运见”，绿色与 2.5D 视觉方向。用户暂时保留当前版，后续仍需优化；不称为最终验收。
- dist/train.html：火车智能装车及数字孪生系统。当前实际是视频和四个章节的占位骨架；projects.json 中描述、角色和图片为空。不能记录为已完成案例。用户已提供原项目 Figma，但完整案例填充未完成。
- dist/robot.html：机器人案例，17 个章节：系统概览、用户、难点、角色、场景、信息结构、信息分组、布局、易用性、权限、设计语言、面板、工具、动效、细节、后台、界面汇总。原设计七页包含登录、大屏、巡检及后台页面；权限等补充方案需明确属于整理方案，不能宣称已交付。
- dist/energy.html：重卡充换电管理平台，目前仍为待填充项目。

## 关键交互与资源

- 案例入口、返回项目、回顶部、图片放大、案例缩放、视频控制等位于各页面和 interactions.js。
- 机器人演示入口 robot-demo.html；当前活动实现为 robot-orbit-player.js、robot-orbit-case.js、robot-orbit.css，以及 robot-original-demo.css / robot-original-case.css。
- 五个原机器人连同底座围绕固定中心顺时针移动；悬停放大并暂停，移开继续；中心不旋转。
- 橙色机器人沿原轨道向前移动约五秒，停止后可重播。使用 Canvas 合成原始画面。
- 必须保留 assets/robot-original/ 全部原稿与透明素材，及 assets/robot/scene-source.png；后者仍被当前动画引用，不能因位于旧目录而删除。
- 多份 robot、carrier 旧脚本和样式仍留存。未经引用分析与用户确认不要清理；不要重新运行工作目录中的旧生成脚本覆盖当前页面。

## 原始设计与参考

- 装车站 Figma：https://www.figma.com/design/Q1AnACWqpmvyu3sho3ZRKB/ （用户要求只关注截图红框页面）。
- 机器人 Figma：https://www.figma.com/design/wNwMIZuMDJtnTqaD1uDWmv/ ，入口 node-id=993-422；仅红框七页。
- 承运商蓝湖分享：https://lanhuapp.com/link/#/invite?sid=qX0B1WN5 。云端访问依赖权限，不保证链接长期可用。
- 原简历 PDF 位于源码目录外；不上传简历 PDF。不要复制机器本地微信目录、临时截图或聊天缓存。

## 已知状态及后续任务

- 之前会话已验证机器人环绕、悬停、五秒巡检、父子页面通信及桌面/移动端布局；本次迁移检查没有重新执行浏览器验收。
- Sites 发布曾因 Git HTTPS TLS 中断失败，尚无已验证线上地址。迁移到 Codex Cloud 是开发环境迁移，不等于网站已公开上线。
- 本次检查 Git HEAD 为 a206d9b；检查前工作区干净。当前没有 Git remote，因此未连接 GitHub。历史使用 Sites 仓库不代表现在仍有远程配置。
- 下一步：复核资源与 Linux 路径大小写、建立私有 GitHub 仓库并经用户授权推送、配置云环境、做云端浏览器验收；再填装车站与充换电案例、个人信息，迭代 APP，最后解决发布。
- 各设备通过同一仓库的提交与分支协作；本地服务、绝对路径、聊天记录及插件登录状态不会随源码自动迁移。云任务开始应先读取本文件。
