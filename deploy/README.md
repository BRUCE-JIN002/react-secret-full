# 阿里云 Docker 发布

## 操作方式

代码推送到 GitHub 后，进入 Actions → Deploy to Aliyun → Run workflow，选择要发布的分支。只有手动触发会部署。网站运行在阿里云，GitHub Pages 不参与。

GitHub runner 构建前端与 AI 服务镜像，将镜像压缩包传给服务器，然后执行 Docker Compose。服务器不执行 npm 构建，也不必从境外镜像仓库拉取每个发布版本。首次安装 Docker 和 CI 下载基础镜像仍需网络可用。

每次使用独立版本标签。检查失败会恢复上一组容器；首次失败则清理本次容器。更新过程可能有短暂中断。自动回退仅覆盖容器，不覆盖未来项目的数据库迁移。

## 首次接入

1. 将当前完整项目代码（包括新的构建脚本、文档站与 AI Playground）提交到 GitHub 默认分支。仅推送工作流文件不足以构建当前网站。不要提交任何 `.env`、私钥或部署包。
2. 在服务器安装 Docker Engine 和 Compose 插件。参考 [Docker Ubuntu 安装说明](https://docs.docker.com/engine/install/ubuntu/)。
3. 保留服务器 `/etc/react-secret/ai.env`，权限为 root:root 600。Compose 从此读取 DeepSeek 配置。它不进入镜像或 GitHub Secrets。
4. 使用专用 SSH 密钥配置 GitHub 仓库 Settings → Environments → production → Environment secrets：

| 名称 | 内容 |
|---|---|
| DEPLOY_HOST | 服务器公网地址 |
| DEPLOY_USER | 部署用户，本服务器为 admin |
| DEPLOY_SSH_KEY | 发布专用 SSH 私钥，不要填 AI 密钥 |
| DEPLOY_KNOWN_HOSTS | 已核验的服务器 SSH 公钥记录，不能以关闭校验代替 |

部署用户须能执行无密码 sudo 和 Docker 发布。此密钥具有部署服务器的管理权限，只允许可信的仓库维护者修改或运行发布工作流。私钥只粘贴到 GitHub 的 Secret 表单，不放在命令、文档或聊天中。

5. 手动运行首次工作流。容器仅监听本机：前端 18080，AI 15180。现有站点仍由旧服务提供，直到下一步切换。
6. 确认容器健康后，备份现有 Nginx 站点配置，可使用 `deploy/host.nginx` 作为本服务器首次迁移配置。前端代理 `http://127.0.0.1:18080`，两个 AI location 的上游为 `http://127.0.0.1:15180`，保留原 Host、流式响应配置和限速。执行 `nginx -t`，通过后 reload，再通过外网验证首页、AI 页面和生成请求。将来已经配置域名或 HTTPS 时，应合并修改上游，不能直接用此初始配置覆盖。
7. 验证成功后才停用旧 react-secret systemd 服务。保留旧发布目录及 Nginx 备份，作为首次迁移回退手段。

## 日常发布和回退

后续点击 Run workflow 即可，正常情况下不再修改 Nginx。Docker 发布目录为 `/opt/react-secret/docker/releases/`；`current` 和 `previous` 记录成功版本。

手动回退：在服务器运行本仓库的 `sudo bash deploy/rollback.sh`。请将此脚本先传到服务器，按实际路径执行。

首次 Docker 迁移前没有 Docker 上一版本，此时使用旧 Nginx 配置和原 systemd 服务回退。镜像暂不自动清理，以保留回退能力；定期检查 `docker system df`，不要删除 current/previous 对应镜像。

## 本地验证

```bash
docker build --target web -t react-secret-web:local-check .
docker build --target ai -t react-secret-ai:local-check .
RELEASE_ID=local-check AI_ENV_PATH=/dev/null WEB_PORT=18081 AI_HOST_PORT=15181 \
  docker compose -p react-secret-check -f deploy/compose.yaml up -d --wait
curl -f http://127.0.0.1:18081/
curl -f http://127.0.0.1:15181/api/ai/status
RELEASE_ID=local-check AI_ENV_PATH=/dev/null \
  docker compose -p react-secret-check -f deploy/compose.yaml down
```

本地空配置的 AI 状态应为 configured=false；完整生成验证只在服务端配置好密钥后进行。

新增全栈项目可复用结构，但要使用独立 Compose project name、目录、端口和环境文件。数据库使用独立持久卷并另设备份方案。

参考：[GitHub Actions 部署文档](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments)。
