# Issue 02: Diagram 图表画布控件与详情弹窗国际化穿透

Status: ready-for-agent
Type: AFK
Blocked-by: 01-spa-language-toggle-and-shell-i18n
Covers-user-stories: Story 1, 10, 11, 12

## Description

在纯 UI 合同层 `@likec4/diagram` 中建立画布专用类型安全文案字典，接收外部注入的生效语言，并将中文文案全面穿透至所有画布控制器、详情卡片与关系浏览器。

## Acceptance Criteria

1. **画布国际化抽象**：
   - `@likec4/diagram` 内部建立 Canvas 专用中英字典（强类型约束）；
   - 对外暴露 `locale` 属性，通过内部 React Context 向所有子组件分发当前语种；
   - 提供内部 `useDiagramTranslation()` Hook。
2. **SPA 与 Diagram 状态串联**：
   - 在 `@likec4/spa` 中将 `$activeLocale` 传递给 `<LikeC4Diagram locale={...} />`。
3. **控件与弹窗文案本地化**：
   - 导航面板（NavigationPanel）、缩放适配按钮、全屏按钮；
   - 元素详情卡片（Element Details：属性名、标题、技术栈标签等）；
   - 关系浏览器（Relationships Browser：出向/入向关系统计与连线标签）；
   - 视图详情窗口（View Details Window）。
4. **自动化测试**：
   - 编写组件单测验证向 Diagram 传入 `locale='zh'` 时，元素详情弹窗及控制栏正确渲染中文。

## Comments
