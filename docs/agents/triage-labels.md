# 分流标签（Triage Labels）

相关工程技能以 5 种标准分流角色（Triage Roles）为基准状态机运行。本文档定义这些标准角色与本仓库 Issue Tracker 中实际使用的标签字符串之间的映射关系。

| 标准角色 (mattpocock/skills) | 本仓库对应标签    | 含义说明                                       |
| ---------------------------- | ----------------- | ---------------------------------------------- |
| `needs-triage`               | `needs-triage`    | 待维护者评估该 Issue                           |
| `needs-info`                 | `needs-info`      | 等待提问/提交者补充更多信息                    |
| `ready-for-agent`            | `ready-for-agent` | 需求与技术规格完整明确，可由独立智能体接手实现 |
| `ready-for-human`            | `ready-for-human` | 需要人工开发者介入实现                         |
| `wontfix`                    | `wontfix`         | 不予处理或关闭                                 |

当技能提及某分流角色（例如“打上 AFK 智能体可接手标签”）时，使用上表右侧列所对应的标签字符串。

如需调整实际标签名称，直接编辑上表中右侧列即可。
