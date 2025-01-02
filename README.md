# Amazon Info Plus

这是一个Chrome插件，用于显示Amazon日本站（amazon.co.jp）商品的产地、厂商和发货地信息。

## 功能特点

- 在Amazon商品页面右侧显示固定的Info+按钮
- 点击按钮显示商品的详细信息：
  - 产地信息
  - 厂商信息
  - 发货地信息

## 开发设置

1. 安装依赖：
```bash
npm install
```

2. 构建项目：
```bash
npm run build
```

3. 在Chrome中加载插件：
   - 打开Chrome浏览器
   - 访问 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目目录

## 开发命令

- `npm run build`: 构建项目
- `npm run watch`: 监听文件变化并自动构建

## 技术栈

- TypeScript
- Chrome Extension API
- Webpack

## 注意事项

- 目前仅支持Amazon日本站点（amazon.co.jp）
- 需要Chrome浏览器最新版本 