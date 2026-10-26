---
type: Architecture Decision Record
title: 'ADR-0002: DSL 模型多语言语法规范 (DSL Model Localization Syntax)'
description: 定义 LikeC4 DSL 中元素、视图与关系多语言字段的语法规范与模型回退策略。
status: accepted
date: 2026-10-25
tags: [adr, dsl, langium, i18n, localization]
---

# 2. DSL 模型多语言语法规范 (DSL Model Localization Syntax)

## Context (背景)

LikeC4 原有 DSL 仅支持单值英文字符串属性（如 `title`、`description`、`technology`、`summary`）。为了支持完整的架构模型多语言国际化，使得同一个架构图模型能够在不同语言视图下实时呈现对应语言的文本，需要确定 DSL 层面的多语言声明语法。

## Decision (决策)

1. **采用语种后缀属性键（Language-Suffixed Property Keys）**：
   - 在现有属性名后增加可选的语种标识作为属性后缀，形如 `<property>:<lang>`（例如 `title:zh '用户'`、`description:zh '...'`、`technology:zh '...'`）。
   - 现有的无后缀属性（`title 'User'`）作为默认语言（Default / Fallback Locale）。
   - 示例：
     ```likec4
     customer = actor 'Customer' {
       title 'Customer'
       title:zh '平台客户'
       description 'A registered customer of our cloud system'
       description:zh '使用我们云服务平台的注册客户'
     }
     ```
2. **渐进式回退策略（Graceful Fallback）**：
   - 当视图或当前生效语种（`Active Locale`）为 `zh` 时，优先使用 `:zh` 声明的值；若未声明 `:zh`，自动回退（Fallback）至无后缀的默认属性值，避免因缺少个别翻译字段导致空白或报错。
3. **AST 与核心模型承载（Model Data Representation）**：
   - 核心 AST 与 `ParsedElement` 数据结构中，将属性存储扩展为包含默认值与 `locales?: Record<string, string>` 字典，使前端在客户端切换语言时能够直接通过查表完成重绘，无需重新触发语言服务器全量计算。

## Consequences (影响)

- **完全向后兼容**：现有 `.c4` 文件不需要任何语法变更即可正常工作。
- **DSL 内聚性高**：架构定义与多语言文档保留在同一文件内，避免了外部独立翻译字典在重构时发生重名/脱节漂移。
