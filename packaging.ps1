# 如果你因为系统禁止运行此脚本而无法允许，请以管理员权限打开 powershell ，然后运行这个命令：
# set-ExecutionPolicy RemoteSigned

$conf = (Get-Content -Raw ./code/info.json | ConvertFrom-Json)
bandizip a ($conf.id + "@" + $conf.version + ".ccx") ./code
