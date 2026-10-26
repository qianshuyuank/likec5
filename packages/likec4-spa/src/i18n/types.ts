// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 LikeC4 Contributors

export type Locale = 'en' | 'zh'

export interface I18nMessages {
  header: {
    share: string
    export: string
    exportDiagram: string
    backToDiagram: string
    toggleLanguage: string
    toggleColorScheme: string
    overview: string
  }
  export: {
    currentView: string
    png: string
    jpg: string
    dot: string
    d2: string
    mmd: string
    puml: string
    drawio: string
    loading: string
  }
  share: {
    webcomponent: string
    embedded: string
    close: string
    copied: string
    copyToClipboard: string
    copyLink: string
    embeddedDesc: string
  }
  sidebar: {
    diagrams: string
    search: string
    filter: string
    noDiagrams: string
  }
}
