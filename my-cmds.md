# My-CMDs 这里记录一些个人常用的操作命令

**根据发布文件构建支持多 CPU 架构的 Docker 镜像（使用 Apple Silicon）：**

docker run -d --name cslcn -v /root/cslcn/appsettings.Release.json:/csl-cn/appsettings.Release.json --network host aa940724/cslcn:1.2

**运行 cslcn 的 Docker 镜像：**

docker buildx build -t aa940724/cslcn:1.3 --push --platform linux/arm64,linux/amd64 .
