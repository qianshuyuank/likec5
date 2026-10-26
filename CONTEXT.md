# LikeC4 Architecture Toolchain

LikeC4 架构即代码（Architecture-as-Code）工具链，用于软件架构的描述、计算、可视化与交互式探索。

## Language

**System UI Localization（系统界面本地化）**:
针对 Web 宿主应用（SPA）与图表画布（Diagram）所有操作按钮、导航面板、详情卡片及弹窗等系统控件文本的翻译与多语言呈现。
_Avoid_: 模型翻译, 业务内容本地化

**Model Localization（模型多语言定义）**:
在 LikeC4 DSL 语法、AST 抽象语法树及核心数据模型中，为架构元素、关系与视图提供多语言文本（如标题、描述等）的声明与存储机制。
_Avoid_: UI本地化, 静态双语拼接

**Localized Property（多语言后缀属性）**:
以语种代码为后缀的 DSL 属性声明（如 `title:zh` 或 `description:zh`），用于在 DSL 内部直接提供特定语种的文本覆盖。
_Avoid_: 动态翻译属性, 扩展标签

**Active Locale（当前生效语种）**:
当前用户选择或环境推导出的语言标签（例如 `zh` 或 `en`），用于统一驱动系统 UI 控件及图表模型内容的语种切换与实时重绘。
_Avoid_: 语言模式, 临时语种

**Language Switcher（语言切换器）**:
常驻于顶部导航栏（Header 右侧紧邻主题切换按钮）的交互控件，支持一键切换生效语种并持久化存储至客户端本地。
_Avoid_: 语言菜单, 翻译开关
