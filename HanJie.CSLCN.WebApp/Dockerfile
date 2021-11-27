FROM mcr.microsoft.com/dotnet/aspnet:3.1
USER root
RUN apt-get update && apt-get install -y libgdiplus
ENV TZ=Asia/Shanghai
COPY . /csl-cn
WORKDIR /csl-cn
VOLUME ["/csl-cn/appsettings.Release.json"]
EXPOSE 5500/tcp
CMD ["dotnet","HanJie.CSLCN.WebApp.dll","--urls=http://0.0.0.0:5500"]