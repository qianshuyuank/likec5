# Issue 04: DSL 描述/技术栈/关系连线多语言全量扩展

Status: ready-for-agent
Type: AFK
Blocked-by: 03-dsl-element-title-localization
Covers-user-stories: Story 7, 8, 9, 10

## Description

将模型多语言支持从元素标题全量拓展至长描述、技术栈、摘要以及关系（Relation）连线说明。

## Acceptance Criteria

1. **语法层全量支持**：
   - 支持 `description:zh`、`technology:zh`、`summary:zh` 以及在 Relation 上声明 `title:zh`；
   - 保持语法平铺简洁与向后兼容。
2. **核心模型与计算扩展**：
   - 核心模型扩展 `description`、`technology` 及关系连线的多语言字段结构；
   - 模型计算层完整保留并传递给前端。
3. **前端渲染与详情弹窗联动**：
   - 节点详情卡片根据当前语言呈现多语言描述与技术栈；
   - 图表关系连线根据当前语言展示对应的连线 Label；
   - 各字段均具备优雅回退到默认语言的能力。
4. **自动化测试**：
   - 编写包含元素描述与关系连线的多语言语法与模型计算测试。

## Comments
