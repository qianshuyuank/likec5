# Issue 05: 官方示例样例双语改造与端到端视觉验收

Status: ready-for-human
Type: HITL
Blocked-by: 04-dsl-descriptions-relations-localization
Covers-user-stories: Story 1 - 16 (All)

## Description

在示例项目中引入真实双语定义，启动本地 Dev Server 进行端到端完整体验，并由人工对视觉排版、字体渲染及中英文切换效果进行最终验收。

## Acceptance Criteria

1. **示例项目双语改造**：
   - 在 `examples/cloud-system` 的架构定义中增加典型的 `title:zh` 与 `description:zh` 声明。
2. **端到端运行体验**：
   - 启动 Dev Server，在浏览器中测试点击右上角中英文切换控件；
   - 验证系统界面（顶部栏、弹窗、详情卡片）与架构模型图表文本实现无刷新同步切换。
3. **人工视觉评审**：
   - 确认中文字体渲染清晰、排版紧凑、长文本换行无溢出或截断；
   - 确认刷新页面后本地语言偏好成功记忆保留。

## Comments
