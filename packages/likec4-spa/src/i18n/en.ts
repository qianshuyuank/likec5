// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 LikeC4 Contributors

import type { I18nMessages } from './types'

export const en: I18nMessages = {
  header: {
    share: 'Share',
    export: 'Export',
    exportDiagram: 'Export diagram',
    backToDiagram: 'Back to diagram',
    toggleLanguage: 'Switch to Chinese',
    toggleColorScheme: 'Toggle color scheme',
    overview: 'Overview',
  },
  export: {
    currentView: 'Current view',
    png: 'Export as .png',
    jpg: 'Export as .jpg',
    dot: 'Export as .dot',
    d2: 'Export as .d2',
    mmd: 'Export as .mmd',
    puml: 'Export as .puml',
    drawio: 'Export to Draw.io',
    loading: 'Exporting to Draw.io...',
  },
  share: {
    webcomponent: 'Webcomponent',
    embedded: 'Embedded',
    close: 'Close',
    copied: 'Copied',
    copyToClipboard: 'Copy to clipboard',
    copyLink: 'Copy link',
    embeddedDesc: 'Embedded view is an iframe with a static diagram',
  },
  sidebar: {
    diagrams: 'Diagrams',
    search: 'Search...',
    filter: 'Filter',
    noDiagrams: 'No diagrams found',
  },
}
