FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim
USER root
COPY . /csl-cn
WORKDIR /csl-cn
EXPOSE 80/tcp
CMD ["dotnet","HanJie.CSLCN.WebApp","--urls=http://0.0.0.0:80"]