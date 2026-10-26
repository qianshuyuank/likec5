# Issue 01: SPA 宿主应用语言切换器与外壳控件国际化

Status: ready-for-agent
Type: AFK
Blocked-by: none
Covers-user-stories: Story 1, 2, 3, 4, 5, 13, 14, 15, 16

## Description

在 `@likec4/spa` 中搭建全局语言状态管理与顶部语言切换器，完成 SPA 外壳层所有按钮、菜单及弹窗的中英文国际化。

## Acceptance Criteria

1. **响应式状态管理**：
   - 使用 `nanostores` 创建 `$activeLocale` 原子；
   - 启动时优先读取 `localStorage('likec4-locale')`；无记录时检测 `navigator.language`（中文环境默认 `zh`，否则 `en`）；
   - 切换语言时自动更新持久化存储。
2. **语言切换 UI 控件**：
   - 在 `packages/likec4-spa/src/components/view-page/Header.tsx` 右上角 `<ColorSchemeToggle />` 旁新增 `<LanguageToggle />` 组件；
   - 支持一键切换中英文（显示如 `中 / EN` 或切换图标）。
3. **外壳文案类型安全字典**：
   - 建立强类型字典接口与 `en` / `zh` 映射文件；
   - 本地化 Header 按钮（分享、导出、返回图表等）及 `ShareModal` 分享弹窗文案。
4. **自动化测试**：
   - 编写组件与状态集成测试，验证点击切换后界面文案即时响应且 `localStorage` 正确持久化。

## Comments
