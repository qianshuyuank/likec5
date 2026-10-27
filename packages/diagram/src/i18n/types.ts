// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.

import type { BorderStyle, ElementShape } from '@likec4/core'

export type DiagramLocale = 'en' | 'zh'

export interface DiagramTranslations {
  navigation: {
    untitledView: string
    edit: string
    switchToReadonly: string
    centerCamera: string
    layoutOptions: string
    autoLayout: string
    directionTB: string
    directionBT: string
    directionLR: string
    directionRL: string
    spacing: string
    routing: string
    spline: string
    ortho: string
    manualLayoutTools: string
    alignColumns: string
    alignLeft: string
    alignCenter: string
    alignRight: string
    alignRows: string
    alignTop: string
    alignMiddle: string
    alignBottom: string
    resetControlPoints: string
    semanticLayoutWithAi: string
    startWalkthroughTooltip: string
    start: string
    stop: string
    previous: string
    next: string
    parallel: string
    diagramMode: string
    sequenceMode: string
    compare: string
    savedManual: string
    latestAuto: string
    actions: string
    syncWithLatest: string
    resetLayout: string
    viewTypeChanged: string
    project: string
    searchPlaceholder: string
  }
  elementDetails: {
    kind: string
    tags: string
    openSource: string
    openDefaultView: string
    tabProperties: string
    tabRelationships: string
    tabViews: string
    tabStructure: string
    tabDeployments: string
    summary: string
    description: string
    noDescription: string
    technology: string
    links: string
    metadata: string
    logicalElement: string
    scopedViews: string
    viewsIncludingElement: string
    viewsIncludingDeployment: string
    untitled: string
    noNested: string
    noViews: string
    viewsCount: (count: number) => string
  }
  relationshipsBrowser: {
    incoming: string
    outgoing: string
    hiddenRelationships: (count: number) => string
    relationshipsOf: string
    scope: string
    global: string
    currentView: string
    urlCopied: string
    copyFailed: string
    copyUrl: string
  }
  viewDetails: {
    layout: string
    outOfSync: string
    manual: string
    resetLayout: string
    resetLayoutTooltip: string
    tags: string
    noTags: string
    addTagPlaceholder: string
    apply: string
    revert: string
    links: string
    noLinks: string
    description: string
    noDescription: string
  }
  search: {
    elements: string
    views: string
    placeholder: string
    selectView: string
    scopedViews: string
  }
  toolbar: {
    shapes: Record<ElementShape, string>
    borderStyles: Record<BorderStyle, string>
    tooltips: {
      browseRelationships: string
      openSource: string
    }
    opacity: string
  }
}
