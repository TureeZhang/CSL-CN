FROM mcr.microsoft.com/dotnet/aspnet:3.1
USER root
COPY . /csl-cn
WORKDIR /csl-cn
VOLUME ["/csl-cn/appsettings.Release.json"]
EXPOSE 5500/tcp
CMD ["dotnet","HanJie.CSLCN.WebApp.dll","--urls=http://0.0.0.0:5500"]