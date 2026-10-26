# 任务与缺陷追踪平台：GitHub Issues

本代码库的所有任务（Issues）与产品需求文档（PRD）均保存在 GitHub Issues 中。所有操作均使用 `gh` CLI 命令行工具。

## 操作规范（Conventions）

- **创建 Issue**：`gh issue create --title "..." --body "..."`。多行内容可使用 heredoc 格式。
- **读取 Issue**：`gh issue view <number> --comments`，配合 `jq` 过滤评论并读取 labels。
- **列出 Issues**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，按需附加 `--label` 和 `--state` 过滤参数。
- **添加评论**：`gh issue comment <number> --body "..."`
- **添加/移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭 Issue**：`gh issue close <number> --comment "..."`

自动推导仓库信息：在 Git 仓库克隆目录下执行时，`gh` 会根据 `git remote -v` 自动推导对应的仓库。

## 当技能提示 "publish to the issue tracker" 时

在 GitHub 仓库中创建一个新的 GitHub Issue。

## 当技能提示 "fetch the relevant ticket" 时

执行 `gh issue view <number> --comments` 获取对应的 Issue 详情及评论历史。
