# 中文小说错别字修改游戏 - 单机版

## 简介
这是一个完全本地运行的中文小说错别字修改游戏，无需联网即可体验完整的游戏功能。游戏包含多个章节的小说内容，玩家需要找出文中的错别字来获得奖励。

## 功能特点
- 📚 包含多章完整小说内容
- 🎯 错别字识别和修正游戏
- 💰 奖励积分系统
- 💾 本地数据存储（使用localStorage）
- 🎮 完全单机运行，无需网络
- 📱 支持桌面和移动设备

## 文件结构
```
standalone-app/
├── index.html          # 主游戏页面
├── game-data.js        # 游戏数据文件
├── game-logic.js       # 游戏逻辑文件
├── start.bat          # Windows启动脚本
├── start.sh           # Linux/Mac启动脚本
└── README.md          # 说明文档
```

## 使用方法

### 方法一：直接启动
双击 `index.html` 文件，游戏将在默认浏览器中打开。

### 方法二：使用启动脚本
- **Windows系统**：双击 `start.bat`
- **Linux/Mac系统**：在终端执行 `./start.sh`

## 游戏说明

### 游戏规则
1. 游戏显示多个章节任务
2. 点击任意任务开始游戏
3. 仔细阅读文本内容，点击发现的错别字
4. 点击字符后该字符会被标记为选中状态
5. 选择完毕后点击"提交答案"按钮
6. 成功完成任务可获得奖励金币

### 界面说明
- **任务列表**：显示所有可用的章节任务
- **余额显示**：右下角显示当前金币余额和完成数量
- **重置按钮**：右上角可重置所有进度

### 数据存储
游戏进度自动保存在浏览器本地存储中，下次打开游戏时会自动恢复进度。

## 技术要求
- 现代浏览器（Chrome、Firefox、Safari、Edge等）
- 支持JavaScript和localStorage
- 无需安装额外软件

## 软件调用方式

### 编程语言调用示例

#### Python调用
```python
import webbrowser
import os

# 获取游戏文件路径
game_path = os.path.abspath("standalone-app/index.html")
# 在浏览器中打开游戏
webbrowser.open(f"file://{game_path}")
```

#### C#调用
```csharp
using System.Diagnostics;

string gamePath = Path.GetFullPath("standalone-app/index.html");
Process.Start(new ProcessStartInfo
{
    FileName = gamePath,
    UseShellExecute = true
});
```

#### Java调用
```java
import java.awt.Desktop;
import java.io.File;

File gameFile = new File("standalone-app/index.html");
Desktop.getDesktop().browse(gameFile.toURI());
```

#### Node.js调用
```javascript
const { exec } = require('child_process');
const path = require('path');

const gamePath = path.resolve('standalone-app/index.html');
exec(`start ${gamePath}`, (error) => {
    if (error) console.error('启动失败:', error);
});
```

## 自定义和扩展

### 添加新章节
1. 编辑 `game-data.js` 文件
2. 在 `texts` 数组中添加新的章节对象
3. 包含以下字段：
   - `id`: 唯一标识符
   - `content`: 章节文本内容
   - `typos`: 错别字数组
   - `difficulty`: 难度等级

### 修改游戏逻辑
编辑 `game-logic.js` 文件可以修改：
- 奖励计算方式
- 游戏交互逻辑
- 数据存储机制

### 界面定制
编辑 `index.html` 中的CSS样式可以：
- 修改颜色主题
- 调整布局样式
- 添加动画效果

## 故障排除

### 游戏无法启动
- 确保浏览器支持JavaScript
- 检查文件完整性
- 尝试不同的浏览器

### 进度丢失
- 检查浏览器localStorage是否被清理
- 确保使用相同的浏览器和用户配置文件

### 显示问题
- 确保浏览器字体支持中文显示
- 检查浏览器缩放设置

## 许可证
本游戏仅供学习和娱乐使用。

## 联系方式
如有问题或建议，请联系开发者。