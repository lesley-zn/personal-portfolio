# 迁移检查与操作步骤

检查日期：2026-11-04。本轮只新增文档，未修改网页、删除文件、提交或推送。

## 检查结论

- 源码根目录：C:/Users/nning/Documents/Codex/2026-10-31/wo-x/outputs/portfolio 。不要把整个聊天工作目录上传。
- dist 共 154 个文件，21,096,456 字节，最大单文件约 3.04 MB。页面、样式、脚本、SVG/PNG 等均在其中；纯静态网站，不依赖本机 npm 包或构建器。
- 根目录包含独立 .git 与 .openai/hosting.json；无 package.json、锁文件及 .gitignore。当前不需要新增 npm 构建系统。
- HEAD=a206d9b；检查前 git status --short 无输出；git remote -v 无输出。未配置 GitHub remote，也未验证 GitHub 账户权限。
- 具备作为静态源码迁入私有仓库及云环境继续开发的基础条件；账户接入、仓库授权和云端实际运行仍需后续完成。未将“静态引用检查”当作浏览器功能测试。

## 排除建议（此次未修改 .gitignore）

- .git/ 是 Git 自身元数据，不作为上传文件复制；迁移时使用正常 Git 推送。
- 不上传 .env、.env.*（保留不含密钥的 .env.example）、凭据、令牌、私钥、Cookie、浏览器用户数据和认证状态。
- 不上传 node_modules/、.venv/、缓存、临时日志、coverage/、操作系统杂项、编辑器个人配置。
- 根目录以外的 work/、临时 PNG/base64、ZIP/tar.gz 发布包、微信文件、简历 PDF、完整聊天导出无需纳入仓库。后续如需要验证脚本，应人工选择去除本机路径后再迁入。
- 必须提交 dist/，不能套用默认忽略 dist 的前端模板规则；必须提交静态图片、动画代码和 PROJECT_CONTEXT.md。
- .openai/hosting.json 不含凭据，建议保留以维持既有站点身份；不能上传任何未来出现的本地认证文件。
- 旧版本资产先保留，引用审计与设计确认后另行清理，本次不删除。

## 后续具体步骤（本轮不执行）

1. 备份当前目录。阅读 PROJECT_CONTEXT.md 与静态资源检查记录；检查源码及 Git 历史是否误含密钥或私人材料。私有仓库也不应保存凭据。
2. 按上面的建议新增 .gitignore，确认 dist 不被忽略。执行 git status、git diff 审阅改动，仅暂存确认的文件，然后提交迁移上下文。不要盲目执行 git add 全工作区。
3. 在自己的 GitHub 创建空的 Private 仓库，避免自动生成 README 引起不必要的历史合并。确认账户与仓库权限。
4. 在本源码根目录添加独立远程名 github：`git remote add github <实际私有仓库URL>`。先执行 `git branch --show-current` 确认分支。经用户批准后才执行 `git push -u github <实际分支名>`。本轮没有执行这些命令；不覆盖 Sites 配置。
5. 打开 Codex 网页或账号提供的 Cloud 设置，连接 GitHub，并授权这个私有仓库。创建/选择对应 Cloud environment，把该仓库纳入环境。菜单与可用性以当前账户界面为准。
6. 此项目不需 npm 安装或 build。环境中确认 Python 3，启动 `python3 -m http.server 4173 --bind 0.0.0.0 --directory dist`。按云环境实际支持的预览方式打开，不把 0.0.0.0 或 localhost 当作公开网站地址。
7. 首次任务提示：先读取 PROJECT_CONTEXT.md，不改设计，验证所有页面与图片、机器人顺时针环绕和悬停、五秒巡检、APP 原型跳转以及移动端。检查 Linux 下路径大小写、同源 iframe 通信。发现问题先报告。
8. 家中和公司本地开发均 clone 同一私有仓库；开始前 pull，完成后提交分支并推送/PR。云端任务也使用同仓库与分支；不要让多个设备同时改同一分支。不要假定当前本地聊天可自动完整迁入，使用文档传递上下文。
9. 网站托管与开发环境单独处理。确认云端开发正常后再修复 Sites 发布或选择其他托管；发布权限与可访问范围沿用用户确认，不自动公开。

官方参考（已查阅）：https://learn.chatgpt.com/docs/cloud 与 https://learn.chatgpt.com/docs/environments/cloud-environments 。账户权限及云端可用性尚未实测。
