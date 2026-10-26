// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 LikeC4 Contributors

import type { I18nMessages } from './types'

export const zh: I18nMessages = {
  header: {
    share: '分享',
    export: '导出',
    exportDiagram: '导出架构图',
    backToDiagram: '返回图表',
    toggleLanguage: '切换到英文 (Switch to English)',
    toggleColorScheme: '切换深浅色主题',
    overview: '概览',
  },
  export: {
    currentView: '当前视图',
    png: '导出为 .png 图片',
    jpg: '导出为 .jpg 图片',
    dot: '导出为 .dot 源码',
    d2: '导出为 .d2 源码',
    mmd: '导出为 .mmd (Mermaid)',
    puml: '导出为 .puml (PlantUML)',
    drawio: '在 Draw.io 中打开编辑',
    loading: '正在导出至 Draw.io...',
  },
  share: {
    webcomponent: 'Web 组件 (Webcomponent)',
    embedded: '内嵌页面 (Embedded)',
    close: '关闭',
    copied: '已复制！',
    copyToClipboard: '复制到剪贴板',
    copyLink: '复制链接',
    embeddedDesc: '内嵌视图是一个包含静态架构图的 iframe 页面',
  },
  sidebar: {
    diagrams: '架构图列表',
    search: '搜索架构图...',
    filter: '筛选',
    noDiagrams: '未找到相关架构图',
  },
}
