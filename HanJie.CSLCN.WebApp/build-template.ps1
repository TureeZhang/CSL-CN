Write-Host "--编译后端文件-- at " [DateTime]::Now

Remove-Item bin/Release/netcoreapp2.2/publish/* -Confirm:$false -Recurse
dotnet publish -c Release

Remove-Item bin/Release/netcoreapp2.2/publish/wwwroot/*.js -Confirm:$false -Recurse
Remove-Item bin/Release/netcoreapp2.2/publish/wwwroot/*.css -Confirm:$false -Recurse
Remove-Item bin/Release/netcoreapp2.2/publish/wwwroot/3rdpartylicenses.txt -Confirm:$false -Recurse
Remove-Item bin/Release/netcoreapp2.2/publish/wwwroot/index.html -Confirm:$false -Recurse
Remove-Item bin/Release/netcoreapp2.2/publish/wwwroot/assets -Confirm:$false -Recurse
Remove-Item bin/Release/netcoreapp2.2/publish/appsettings.*.json -Confirm:$false -Recurse
Remove-Item bin/Release/netcoreapp2.2/publish/*.pdb -Confirm:$false -Recurse

Write-Host "--编译前端文件-- at " ([DateTime]::Now)

cd ClientApp
ng build --prod
cd dist/ClientApp

Write-Host "--替换WEBCDN路径-- at " ([DateTime]::Now)

[System.IO.File]::WriteAllText("ClientApp/dist/ClientApp/index.html",[System.IO.File]::ReadAllText("ClientApp/dist/ClientApp/index.html").Replace("<link href=""/assets/bootstrap/","<link href=""http://webcdn.cities-skylines.cn/bootstrap/").Replace("<script src=""/assets/bootstrap/","<script src=""http://webcdn.cities-skylines.cn/bootstrap/").Replace("href=""styles","href=""http://webcdn.cities-skylines.cn/angular-clientapp/styles").Replace("<script src=""polyfills","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/polyfills").Replace("<script src=""scripts","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/scripts").Replace("<script src=""main","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/main").Replace("<script src=""runtime","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/runtime"))
[System.IO.File]::WriteAllText("ClientApp/dist/ClientApp/index.html",[System.IO.File]::ReadAllText("ClientApp/dist/ClientApp/index.html").Replace("<base href=""/"">","<base href=""/"">`n    <meta name=""keywords"" content=""城市天际线,新手,攻略,MOD,教程,视频,百科,维基,虎牙汉界"">`n    <meta name=""description"" content=""汉界的一颗小虎牙,你可以免费查阅的 城市天际线 在线百科全书。百科全书 初学者指南 功能列表 MOD 推荐 经营 里程碑列表 信息视图列表 道路 交通 公共交通运输"">"))
Copy-Item -Path * -Destination ../../../bin/Release/netcoreapp2.2/publish/wwwroot -Confirm:$false -Recurse

<#
<meta name="keywords" content="城市天际线,新手,攻略,MOD,教程,视频,百科,维基,虎牙汉界">
<meta name="description" content="汉界的一颗小虎牙,你可以免费查阅的 城市天际线 在线百科全书。百科全书 初学者指南 功能列表 MOD 推荐 经营 里程碑列表 信息视图列表 道路 交通 公共交通运输">
#>

cd ../../../

./qshell.exe account 七牛AK 七牛SK 七牛BucketName
Write-Host "删除 CDN 前端文件"
./qshell.exe listbucket 七牛BucketName -p "angular-clientapp/" -o ./tpl.startwith.angularclientapp.txt
./qshell.exe batchdelete --force 七牛BucketName -i ./tpl.startwith.angularclientapp.txt
Write-Host "上传 CDN 前端文件"
foreach($item in [System.IO.Directory]::GetFiles("./ClientApp/dist/ClientApp","*.js"))
{
    $storageName = "angular-clientapp/" + [System.IO.Path]::GetFileName($item)
    Write-Host $storageName
    ./qshell.exe fput 七牛BucketName $storageName $item --overwrite
}
foreach($item in [System.IO.Directory]::GetFiles("./ClientApp/dist/ClientApp","*.css"))
{
    $storageName = "angular-clientapp/" + [System.IO.Path]::GetFileName($item)
    Write-Host $storageName
    ./qshell.exe fput 七牛BucketName $storageName $item --overwrite
}

Write-Host "上传后端文件"
foreach($item in [System.IO.Directory]::GetFiles("./bin/Release/netcoreapp2.2/publish","*.dll"))
{
    Write-Host $item
    pscp -pw 服务器密码 $item root@服务器IP:/root/cslcn
}
pscp -pw 服务器密码 "./bin/Release/netcoreapp2.2/publish/wwwroot/index.html" root@服务器IP:/root/cslcn/wwwroot
pscp -pw 服务器密码 "./bin/Release/netcoreapp2.2/publish/wwwroot/3rdpartylicenses.txt" root@服务器IP:/root/cslcn/wwwroot

Write-Host "重启 cslcn 服务"
ssh root@服务器IP "systemctl restart cslcn.service"

Write-Host "结束 at " ([System.DateTime]::Now) 
Read-Host