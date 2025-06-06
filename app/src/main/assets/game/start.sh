#!/bin/bash

echo "启动中文小说错别字修改游戏 - 单机版"
echo ""
echo "正在打开游戏..."

# 检测操作系统并使用相应的命令打开HTML文件
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open index.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open index.html
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows
    start index.html
else
    echo "无法检测到操作系统，请手动双击 index.html 文件启动游戏"
fi

echo ""
echo "游戏已在默认浏览器中启动"
echo "如果浏览器没有自动打开，请手动双击 index.html 文件"