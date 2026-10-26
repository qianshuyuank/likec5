---
type: Architecture Decision Record
title: 'ADR-0003: 系统界面国际化分层与实现架构 (UI Localization Architecture)'
description: 采用零外部依赖类型安全字典与 Nanostores 驱动 @likec4/diagram 和 @likec4/spa 的界面多语言呈现。
status: accepted
date: 2026-10-25
tags: [adr, ui, i18n, nanostores, react, diagram, spa]
---

# 3. 系统界面国际化分层与实现架构 (UI Localization Architecture)

## Context (背景)

LikeC4 的前端展示层由底层的 `@likec4/diagram`（ReactFlow 画布与控制器）与上层的宿主 `@likec4/spa`（Web 应用容器）构成。为了提供中文等系统界面支持，需要确定国际化（i18n）的代码组织模式与状态流转路径，同时遵守单向依赖与轻量化原则。

## Decision (决策)

1. **零外部运行时依赖的类型安全字典驱动**：
   - 不引入重量级的 `i18next` 或其他大型三方库，采用由 TypeScript 接口（如 `LikeC4Translations`）强类型约束的静态字典。
   - 保证编译期完备性：若有任何新增控件文案未在中文或英文字典中补齐，TypeScript 编译直接失败，避免运行时漏翻。
2. **严格遵守单向导入与分层架构**：
   - **`@likec4/diagram` (纯 UI 合同层)**：内置 Canvas、导航面板、缩放按钮、详情弹窗等组件所需的文案字典，通过 `locale` 属性及内部 React Context 响应语种变化；绝不依赖外界数据获取逻辑。
   - **`@likec4/spa` (应用宿主层)**：维护全局 `$activeLocale` Nanostore 原子（从 `navigator.language` 初始化并持久化至 `localStorage`），负责 SPA 外壳控件（顶部导航、分享/导出菜单、侧边栏）的文案翻译，并将当前生效语种传递至 `@likec4/diagram`。
3. **模型层动态标签映射**：
   - 当元素渲染时，基于当前生效语种自动读取元素中的多语言属性（例如若 `$activeLocale === 'zh'` 且存在 `title:zh`，优先显示；否则无缝回退至默认的 `title`）。

## Consequences (影响)

- 零额外体积包袱，渲染性能损耗微乎其微。
- 架构分层清晰，未来增加如日语、德语等语种仅需增加对应语言字典文件即可。
