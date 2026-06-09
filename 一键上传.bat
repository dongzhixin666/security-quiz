@echo off
chcp 65001 >nul
title GitHub 一键上传脚本
cls

echo ======================================
echo      GitHub 一键上传脚本
echo ======================================
echo.

REM 设置 Git 路径（根据你的环境自动定位）
set "GIT_PATH=%~dp0Git\Git123\cmd\git.exe"

REM 检查 Git 是否存在
if not exist "%GIT_PATH%" (
    echo [错误] 找不到 Git 程序！
    echo 预期路径: %GIT_PATH%
    echo.
    pause
    exit /b 1
)

echo [1/5] 正在检查 Git 仓库...
if not exist "%~dp0.git" (
    echo [信息] 首次运行，正在初始化 Git 仓库...
    "%GIT_PATH%" init
    "%GIT_PATH%" config user.email "user@example.com"
    "%GIT_PATH%" config user.name "User"
    "%GIT_PATH%" remote add origin https://github.com/dongzhixin666/security-quiz.git
    echo [完成] 仓库初始化完成！
) else (
    echo [完成] Git 仓库已存在
)

echo.
echo [2/5] 正在添加修改的文件...
REM 只添加项目文件，排除 Git 程序和其他不需要的文件
echo index.html > .gitignore_temp
echo README.md >> .gitignore_temp
echo github与git安装步骤.docx >> .gitignore_temp
echo 一键上传.bat >> .gitignore_temp
echo 一键上传.txt >> .gitignore_temp

"%GIT_PATH%" add index.html
"%GIT_PATH%" add README.md
if %errorlevel% neq 0 (
    echo [警告] 添加文件时出现问题，继续执行...
)

echo.
echo [3/5] 正在提交修改...
set "COMMIT_MSG=自动更新：%date% %time%"
"%GIT_PATH%" commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo [信息] 没有新的修改需要提交，或提交失败
    echo.
    choice /C YN /M "是否继续尝试推送"
    if errorlevel 2 goto end
)

echo.
echo [4/5] 正在推送到 GitHub...
"%GIT_PATH%" push origin master:main
if %errorlevel% neq 0 (
    echo.
    echo [错误] 推送到 GitHub 失败！可能原因：
    echo   1. 网络连接问题
    echo   2. 需要登录 GitHub 账号
    echo   3. 仓库地址错误
    echo.
    echo [尝试备用推送方式...]
    "%GIT_PATH%" push -f origin master:main
    if %errorlevel% neq 0 (
        echo [失败] 备用方式也失败了
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ======================================
echo 上传完成！
echo ======================================
echo.
echo 网站地址：
echo    https://dongzhixin666.github.io/security-quiz/
echo.
echo 等待 1-3 分钟后刷新页面即可看到更新
echo.

:end
pause
