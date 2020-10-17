Write-Host "--编译后端文件-- at " [DateTime]::Now

Remove-Item bin\Release\netcoreapp2.2\publish\* -Confirm:$false -Recurse
dotnet publish -c Release

Remove-Item bin\Release\netcoreapp2.2\publish\wwwroot\*.js -Confirm:$false -Recurse
Remove-Item bin\Release\netcoreapp2.2\publish\wwwroot\*.css -Confirm:$false -Recurse
Remove-Item bin\Release\netcoreapp2.2\publish\wwwroot\3rdpartylicenses.txt -Confirm:$false -Recurse
Remove-Item bin\Release\netcoreapp2.2\publish\wwwroot\index.html -Confirm:$false -Recurse
Remove-Item bin\Release\netcoreapp2.2\publish\wwwroot\assets -Confirm:$false -Recurse
Remove-Item bin\Release\netcoreapp2.2\publish\appsettings.*.json -Confirm:$false -Recurse
Remove-Item bin\Release\netcoreapp2.2\publish\*.pdb -Confirm:$false -Recurse

Write-Host "--编译前端文件-- at " [DateTime]::Now

cd ClientApp
ng build --prod
cd dist\ClientApp

Write-Host "--替换WEBCDN路径-- at " [DateTime]::Now

[System.IO.File]::WriteAllText("ClientApp/dist/ClientApp/index.html",[System.IO.File]::ReadAllText("ClientApp/dist/ClientApp/index.html").Replace("<link href=""/assets/bootstrap/","<link href=""http://webcdn.cities-skylines.cn/bootstrap/").Replace("<script src=""/assets/bootstrap/","<script src=""http://webcdn.cities-skylines.cn/bootstrap/").Replace("href=""styles.","href=""http://webcdn.cities-skylines.cn/angular-clientapp/styles.").Replace("<script src=""runtime.","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/runtime.").Replace("<script src=""polyfills","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/polyfills").Replace("<script src=""scripts.","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/scripts.").Replace("<script src=""main.","<script src=""http://webcdn.cities-skylines.cn/angular-clientapp/main."))
Copy-Item -Path * -Destination ../../../bin/Release/netcoreapp2.2/publish/wwwroot -Confirm:$false -Recurse

Invoke-Item ../../../bin/Release/netcoreapp2.2/publish/

<#
<meta name="keywords" content="城市天际线,新手,攻略,MOD,教程,视频,百科,维基,虎牙汉界">
<meta name="description" content="汉界的一颗小虎牙,你可以免费查阅的 城市天际线 在线百科全书。百科全书 初学者指南 功能列表 MOD 推荐 经营 里程碑列表 信息视图列表 道路 交通 公共交通运输">
#>

Write-Host "--END-- at " [DateTime]::Now
Read-Host