# LikeC4 界面与模型全栈多语言国际化支持 (Product Requirements Document)

Status: ready-for-agent

## Problem Statement (问题陈述)

LikeC4 作为一套现代化的“架构即代码”（Architecture-as-Code）建模与可视化工具链，目前的前端展示层（包括图表画布 `@likec4/diagram` 与单页应用 `@likec4/spa`）内部的所有操作按钮、下拉菜单、工具提示、详情卡片与弹窗文案均为硬编码的英文，页面上没有任何可切换语言的操作入口，对母语为中文的架构师和技术评审人员不够友好。

同时，现有的 LikeC4 DSL（`.c4` 文件）仅允许单值的英文字符串属性，无法为同一个软件架构元素、连线和视图定义多语言元数据。这导致跨国或以中文为主的研发团队难以在维护单一架构模型真实数据源的前提下，直接生成面向中文受众的业务视图。

## Solution (解决方案)

提供一套贯穿“DSL 声明 -> 核心数据模型 -> 图表画布组件 -> Web 应用宿主”的全链路国际化（i18n）解决方案：

1. **系统界面本地化（System UI Localization）**：
   - 在 SPA 顶部导航栏（Header 右上角）常驻提供一键中英文切换控件（`Language Switcher`）；
   - 基于轻量、零外部依赖的 TypeScript 类型安全字典（`Type-safe Dictionary`），实现 SPA 外壳及 Canvas 画布所有控件文案的高性能无刷新即时切换；
   - 客户端优先根据浏览器环境语言（`navigator.language`）智能首选语言，并持久化到客户端本地存储（`localStorage`）。
2. **架构模型多语言支持（Model Localization）**：
   - 扩展 LikeC4 DSL 语法，支持语种后缀属性键（如 `title:zh '用户'`、`description:zh '...'`）；
   - 核心数据模型保留各语种字段映射，渲染引擎根据当前生效语种（`Active Locale`）动态提取对应语言呈现，未提供特定语言时平滑回退至默认属性，保证 100% 向后兼容。

---

## User Stories (用户故事)

1. 作为中文软件架构师，我希望在浏览器中打开 LikeC4 架构视图时，界面所有系统菜单、操作按钮及提示默认呈现为中文，以便能够直观无障碍地进行架构浏览。
2. 作为需要向国内业务方及海外团队汇报的技术负责人，我希望能在界面右上角一键在中文和英文之间自由切换，以便快速切换汇报语言。
3. 作为架构图阅读者，我希望切换语言的操作能够立即在当前视图中无刷新重绘生效，以便获得顺畅连贯的交互体验。
4. 作为经常查看架构图的开发人员，我希望系统能够记住我上次选择的语种偏好，以便下次打开任何视图时自动保持中文模式。
5. 作为首次访问系统的用户，当我使用中文操作系统或中文浏览器访问时，我希望系统自动以中文作为默认生效语言，无需我手动寻找切换按钮。
6. 作为架构即代码的编写者，我希望能够在 `.c4` 文件中为组件添加 `title:zh` 属性，以便中文模式下呈现符合国内术语习惯的组件中文名称。
7. 作为架构即代码的编写者，我希望能够在 `.c4` 文件中为组件添加 `description:zh` 属性，以便在中文模式下呈现详细且通俗的中文业务描述。
8. 作为架构即代码的编写者，我希望能够在关系（Relation）定义中增加 `title:zh`，以便在图表连线上清晰标注文档化的中文调用语义。
9. 作为架构图阅读者，当我处于中文模式但某个组件尚未配置 `title:zh` 时，我希望该组件优雅回退显示默认标题，确保图表不会因缺少部分翻译而出现空白或报错。
10. 作为架构评审人员，当我点击图表节点弹出元素详情卡片（Element Details）时，我希望卡片内部的标题、属性名及技术栈说明均以中文呈现。
11. 作为关系浏览器（Relationships Browser）的使用者，我希望弹出的依赖拓扑弹窗中的入向/出向关系统计和连线说明支持中文，以便快速理清微服务依赖。
12. 作为架构检索者，我希望全局搜索框（Overview Search）中的搜索占位符、过滤分类标签和无结果提示均显示为中文。
13. 作为架构图分享者，我希望点击“分享”（Share）弹窗时，复制链接、嵌入代码和网页组件生成的说明指引显示为清晰的中文说明。
14. 作为导出图表的用户，我希望“导出”（Export）下拉菜单中的选项（如导出 PNG、导出 SVG、在 Draw.io 中打开等）为规范的中文翻译。
15. 作为平板或触屏设备使用者，我希望在窄屏布局下依然能够在界面顶层控制区域轻松找到语言切换入口。
16. 作为拥有多个子系统的大型项目架构师，我希望在多项目（Multi-project）之间切换时，全局语言选择保持同步且不发生重置。

---

## Implementation Decisions (实施决策)

### 1. 架构分层与单向依赖

- **`@likec4/diagram`（纯 UI 合同层）**：
  - 内置图表内部控件（导航面板、缩放按钮、元素详情卡片、关系浏览器、查看代码与返回原图）的类型安全中英文案字典；
  - 对外暴露 `locale` 输入参数，内部通过 React Context 向所有子控件下发当前语言；
  - 节点与边线渲染时，基于当前 `locale` 优先解析模型数据中的多语言覆盖字段，缺失时回退默认字段；
  - 严格保持纯 UI 合同性质，不引入任何本地存储与数据持久化逻辑。
- **`@likec4/spa`（Web 应用宿主层）**：
  - 建立全局 `$activeLocale` Nanostore 响应式原子，统一负责状态的读取、更新与广播；
  - 在初始化时按照优先级获取语言：`localStorage('likec4-locale') -> navigator.language (是否以 zh 开头) -> 'en'`；
  - 在顶部导航栏（Header 右侧，紧邻 `ColorSchemeToggle`）新增 `LanguageToggle` 组件；
  - 负责 SPA 外壳层所有组件（Header、ShareModal、ExportButton、SelectProject、Sidebar、OverviewSearch 等）的中英文案呈现；
  - 将 `$activeLocale` 的当前值注入给底层 `<LikeC4Diagram>`。

### 2. 国际化实现机制

- **零外部依赖类型安全字典（Zero-dependency Type-Safe Dictionary）**：
  - 采用标准 TypeScript `interface` 定义文案数据结构，各语言分别以强类型常量对象提供映射；
  - 编译期静态保障：新增任何文案必须同时在英文与中文字典中定义，否则 TypeScript 编译直接报错中断；
  - 绝不引入大型第三方国际化运行时（如 `i18next`），保持极致轻量。

### 3. DSL 语法与核心模型扩展

- **语法形态**：
  - 在 Langium 语法文件 `like-c4.langium` 中，将属性定义扩展为支持可选的语种后缀，形如 `<property>:<lang>`（如 `title:zh`、`description:zh`、`technology:zh`、`summary:zh`）；
  - 保留原有无后缀属性作为默认回退属性。
- **AST 与核心模型承载**：
  - `packages/core` 中扩展元素与关系的数据结构，附加可选的多语言字典集合（如 `locales?: Record<string, ElementLocalizedData>`）；
  - 在图表计算阶段（`computeLikeC4Model`），多语言数据被完整保留在交付给前端渲染的产物中，使前端切换语言无需重新向后端请求。

---

## Testing Decisions (测试决策)

- **外部行为测试原则**：严格基于外部接口行为与用户可见效果编写测试，避免依赖内部私有变量。
- **语法层测试（Language Server）**：
  - 编写 DSL 解析单元测试，断言带有 `:zh` 后缀的元素属性被准确解析为 AST 节点；
  - 验证遗漏 `:zh` 或仅书写常规属性时的全量向后兼容性。
- **核心计算层测试（Core Model）**：
  - 验证在不同 `locale` 选项下，模型计算方法能正确输出对应语言文本，以及缺失时的 Fallback 回退逻辑。
- **前端组件与状态测试（Diagram & SPA）**：
  - 针对 `@likec4/diagram` 编写组件测试，验证注入 `locale='zh'` 时界面按钮文本准确切换为中文；
  - 针对 `@likec4/spa` 编写集成测试，验证点击 `LanguageToggle` 后全局状态变更、DOM 节点文本更新及 `localStorage` 缓存写入。

---

## Out of Scope (范围之外)

- **在线实时机器翻译**：系统不集成在线 AI 或翻译 API 动态机翻未提供多语言定义的 DSL 文本；模型层中文内容均依赖作者在 DSL 中显式书写声明。
- **除中英之外的第三种语言**：虽然整体架构支持未来横向扩展多语种，但本期 PRD 仅涵盖简体中文（`zh`）与英文（`en`）的完整实现。
- **底层报错堆栈与 CLI 日志翻译**：控制台底层报错信息、编译器崩溃堆栈等专业调试日志保持原有英文输出。

---

## Further Notes (补充说明)

- 后续若需支持繁体中文（`zh-TW`）或日文（`ja`），可在类型字典及语法语种白名单中平滑增加语种定义。
- 本 PRD 的设计决策已通过架构决策记录沉淀至 [docs/adrs/0002-dsl-model-localization-syntax.md](file:///d:/Git/likec5/docs/adrs/0002-dsl-model-localization-syntax.md) 与 [docs/adrs/0003-ui-localization-architecture.md](file:///d:/Git/likec5/docs/adrs/0003-ui-localization-architecture.md)，并在 [CONTEXT.md](file:///d:/Git/likec5/CONTEXT.md) 中维护统一领域词汇。
