# My-CMDs 这里记录一些个人常用的操作命令

**根据发布文件构建支持多 CPU 架构的 Docker 镜像（使用 Apple Silicon）：**

```
docker buildx build -t aa940724/cslcn:版本号 --push --platform linux/arm64,linux/amd64 .
```

**运行 cslcn 的 Docker 镜像：**

```
docker run -d --name cslcn -v /root/cslcn/appsettings.Release.json:/csl-cn/appsettings.Release.json -v /root/cslcn/wwwroot/assets:/csl-cn/wwwroot/assets --network host aa940724/cslcn:版本号
```

**Nginx 配置：**

```
server {
        listen 80;
        server_name cities-skylines.cn *.cities-skylines.cn;

        location /
        {
                proxy_pass http://localhost:5000;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection keep-alive;
                proxy_set_header   Host $host;
                proxy_cache_bypass $http_upgrade;
                proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
        }
}
```
