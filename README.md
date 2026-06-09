# 数据库安全技术 - 期末模拟题库

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://dongzhixin666.github.io/security-quiz/)

> 一个专为数据库安全技术课程设计的交互式在线答题系统，支持多种题型、实时判分、错题本、做题留痕等功能。

## 在线演示

**电脑端访问：** https://dongzhixin666.github.io/security-quiz/

**手机端访问：** 同上地址，已做移动端适配

## 功能特性

### 核心功能
- **多种题型支持**：单选题、多选题、判断题、填空题、简答题
- **实时判分系统**：客观题即时反馈，主观题智能关键词评分
- **做题留痕**：自动记录答题历史，刷新页面后不丢失
- **错题本**：自动收集错题，支持针对性复习
- **题目收藏**：标记重点题目，方便回顾

### 交互体验
- **即时反馈**：答对自动跳转，答错显示解析
- **知识拓展**：每题附带详细知识点讲解
- **进度追踪**：实时显示答题进度和正确率
- **响应式设计**：完美适配手机、平板、电脑

### 数据管理
- **本地存储**：答题记录保存在浏览器本地
- **数据统计**：查看答题统计、薄弱知识点分析
- **数据导出**：支持导出答题数据

## 项目截图

### 电脑端
| 首页 | 答题页面 | 结果页面 |
|------|----------|----------|
| ![首页截图](docs/screenshots/pc-home.png) | ![答题截图](docs/screenshots/pc-quiz.png) | ![结果截图](docs/screenshots/pc-result.png) |

### 手机端
| 首页 | 答题页面 | 错题本 |
|------|----------|--------|
| ![手机首页](docs/screenshots/mobile-home.png) | ![手机答题](docs/screenshots/mobile-quiz.png) | ![手机错题本](docs/screenshots/mobile-wrongbook.png) |

## 技术栈

- **前端**：HTML5 + CSS3 + JavaScript（原生，无框架依赖）
- **样式**：响应式设计，支持移动端适配
- **存储**：LocalStorage 本地存储
- **部署**：GitHub Pages 静态托管

## 项目结构

```
security-quiz/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── script.js       # 交互逻辑
├── LICENSE             # MIT 开源协议
├── README.md           # 项目说明
└── 一键上传.bat        # 快速部署脚本
```

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/dongzhixin666/security-quiz.git
```

2. 进入目录
```bash
cd security-quiz
```

3. 本地预览
```bash
# Python 3
python -m http.server 8000

# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages

### 方法一：一键上传脚本（推荐）

双击运行 `一键上传.bat`，自动完成：
- Git 初始化
- 添加文件
- 提交修改
- 推送到 GitHub

### 方法二：手动提交

```bash
git add .
git commit -m "feat: 描述你的修改"
git push origin main
```

**提交规范：**
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `perf:` 性能优化

## 开源协议

本项目采用 [MIT 协议](LICENSE) 开源，欢迎自由使用和修改。

## 参与贡献

欢迎提交 Issue 和 Pull Request！

- 发现 bug？请提交 [Issue](../../issues)
- 有新功能建议？欢迎讨论
- 想贡献代码？请 Fork 后提交 PR

## 联系方式

- GitHub: [@dongzhixin666](https://github.com/dongzhixin666)
- 项目主页: https://dongzhixin666.github.io/security-quiz/

---

> 本项目为课程作业项目，会匿名记录答题数据（仅统计答题数量、正确率等，不含任何个人信息），帮助我们分析薄弱知识点，持续优化题库质量！
