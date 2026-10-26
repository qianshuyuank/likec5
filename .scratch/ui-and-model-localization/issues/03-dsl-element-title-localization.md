# Issue 03: DSL 元素多语言标题语法支持与渲染穿透（title:zh）

Status: ready-for-agent
Type: AFK
Blocked-by: 02-diagram-canvas-controls-and-overlays-i18n
Covers-user-stories: Story 6, 9

## Description

打通从 LikeC4 DSL 语法声明到 AST 解析、核心模型计算以及前端图表节点标题动态多语言呈现的完整端到端链路。

## Acceptance Criteria

1. **语法解析（Language Server）**：
   - 在 `like-c4.langium` 中扩展 `ElementStringProperty`，支持 `title:zh '中文标题'` 格式；
   - 保证无后缀属性（`title 'User'`）完全向后兼容；
   - 解析产物生成包含语种标记的 AST 结构。
2. **核心模型扩展（Core）**：
   - 在 `packages/core` 中扩展元素类型，引入 `locales?: Record<string, { title?: string }>` 结构；
   - 在 `computeLikeC4Model` 计算模型视图时保留多语言元数据。
3. **节点动态渲染（Diagram）**：
   - 图表节点渲染时，基于当前激活语种优先读取对应的 `:zh` 标题；
   - 若当前语种缺失对应标题，优雅回退显示默认标题。
4. **自动化测试**：
   - 编写 DSL 语法解析测试验证 `title:zh` 的 AST 生成；
   - 编写渲染集成测试，验证 `zh` 模式下展示中文标题，`en` 模式下展示默认英文标题。

## Comments
