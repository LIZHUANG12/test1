# 中文小说错别字修改游戏 - 安卓应用

## 项目概述
这是一个完整的安卓应用项目，使用WebView技术包装HTML游戏，提供原生安卓体验。

## 项目结构
```
android-webview-app/
├── app/
│   ├── src/main/
│   │   ├── java/com/novelgame/
│   │   │   └── MainActivity.java          # 主活动类
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   │   └── activity_main.xml      # 主界面布局
│   │   │   ├── values/
│   │   │   │   ├── strings.xml            # 字符串资源
│   │   │   │   └── styles.xml             # 样式定义
│   │   │   └── menu/
│   │   │       └── main_menu.xml          # 菜单定义
│   │   ├── assets/game/                   # 游戏HTML文件
│   │   └── AndroidManifest.xml            # 应用清单
│   └── build.gradle                       # 应用构建配置
├── build.gradle                           # 项目构建配置
└── gradle.properties                      # Gradle属性
```

## 功能特点
- 原生安卓应用界面
- WebView加载本地HTML游戏
- 支持游戏重新加载和重置
- 本地数据存储
- 支持返回键导航
- 工具栏菜单操作

## 构建要求
- Android Studio 4.0+
- Android SDK API 21+
- Gradle 8.0+
- Java 8+

## 构建步骤

### 1. 导入项目
1. 打开Android Studio
2. 选择"Import Project"
3. 选择android-webview-app文件夹
4. 等待Gradle同步完成

### 2. 配置签名
在app/build.gradle中添加签名配置：
```gradle
android {
    signingConfigs {
        release {
            storeFile file('your-keystore.jks')
            storePassword 'your-store-password'
            keyAlias 'your-key-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ...
        }
    }
}
```

### 3. 构建APK
```bash
# Debug版本
./gradlew assembleDebug

# Release版本
./gradlew assembleRelease
```

### 4. 安装到设备
```bash
# 安装Debug版本
./gradlew installDebug

# 或直接安装APK文件
adb install app/build/outputs/apk/debug/app-debug.apk
```

## APK输出位置
- Debug: `app/build/outputs/apk/debug/app-debug.apk`
- Release: `app/build/outputs/apk/release/app-release.apk`

## 应用特性

### WebView配置
- 启用JavaScript执行
- 支持本地存储
- 允许文件访问
- 支持缩放功能

### 用户界面
- 工具栏带重新加载和重置按钮
- 全屏WebView游戏区域
- 支持返回键导航

### 权限说明
- INTERNET: 网络访问（预留）
- READ/WRITE_EXTERNAL_STORAGE: 文件访问
- ACCESS_NETWORK_STATE: 网络状态检测

## 自定义配置

### 修改应用名称
编辑 `app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">您的应用名称</string>
```

### 修改应用图标
替换以下文件夹中的ic_launcher图标：
- `app/src/main/res/mipmap-hdpi/`
- `app/src/main/res/mipmap-mdpi/`
- `app/src/main/res/mipmap-xhdpi/`
- `app/src/main/res/mipmap-xxhdpi/`
- `app/src/main/res/mipmap-xxxhdpi/`

### 修改包名
在以下文件中更改包名：
1. `app/src/main/AndroidManifest.xml`
2. `app/build.gradle` 中的applicationId
3. Java文件的package声明

### 添加新游戏文件
将HTML游戏文件放入 `app/src/main/assets/game/` 目录

## 发布准备

### 1. 生成签名密钥
```bash
keytool -genkey -v -keystore novel-game.jks -keyalg RSA -keysize 2048 -validity 10000 -alias novel-game-key
```

### 2. 配置ProGuard
在 `app/proguard-rules.pro` 中添加混淆规则

### 3. 测试APK
在不同设备和Android版本上测试应用

## 故障排除

### 常见问题
1. **WebView空白页面**: 检查assets/game文件是否存在
2. **JavaScript不工作**: 确认WebSettings已启用JavaScript
3. **本地存储失效**: 检查domStorageEnabled设置
4. **构建失败**: 检查Gradle版本和SDK版本兼容性

### 调试方法
1. 启用WebView调试: 在MainActivity中添加
   ```java
   WebView.setWebContentsDebuggingEnabled(true);
   ```
2. 使用Chrome DevTools连接调试WebView
3. 查看Android Studio的Logcat输出

## 性能优化
- 启用硬件加速
- 优化WebView缓存设置
- 压缩assets中的资源文件
- 使用ProGuard代码混淆

这个项目提供了完整的安卓应用解决方案，可以将HTML游戏打包成原生安卓应用。