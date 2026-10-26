// SPDX-License-Identifier: MIT
//
// Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.

import type { ComputedNodeStyle, NodeId } from '@likec4/core'
import type { Color } from '@likec4/core/types'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { LikeC4LocaleProvider } from '../../i18n'
import { ElementData } from './ElementData'

function renderElementData(icon: string | null | undefined, style: ComputedNodeStyle = {}) {
  return renderToStaticMarkup(
    <ElementData
      data={{
        id: 'test' as NodeId,
        title: 'Test',
        color: 'blue' as Color,
        style,
        ...(icon !== undefined && { icon }),
      }}
    />,
  )
}

describe('ElementData icon blending', () => {
  it('renders a deployment leaf description without a logical reference', () => {
    const html = renderToStaticMarkup(
      <ElementData
        data={{
          id: 'prod.server' as NodeId,
          title: 'Production server',
          color: 'blue',
          style: {},
          description: { md: '**Production** workload' },
        }} />,
    )

    expect(html).toContain('<strong>Production</strong> workload')
  })

  it('does not add the blending recipe variant for brand, provider, and image icons', () => {
    const icons = [
      'tech:postgresql',
      'tech:react',
      'aws:lambda',
      'azure:virtual-machine',
      'gcp:cloud-run',
      'https://example.com/icon.svg',
      'data:image/svg+xml,%3Csvg%3E%3C/svg%3E',
      'file:///tmp/icon.svg',
      'none',
      null,
      undefined,
    ]

    for (const icon of icons) {
      const html = renderElementData(icon)

      expect(html).toContain('likec4-element-node-data--withIconBlend_false')
      expect(html).not.toContain('likec4-element-node-data--withIconBlend_true')
    }
  })

  it('adds the blending recipe variant for bootstrap icons without explicit iconColor', () => {
    expect(renderElementData('bootstrap:house')).toContain('likec4-element-node-data--withIconBlend_true')

    const html = renderElementData('bootstrap:house', { iconColor: 'indigo' })

    expect(html).toContain('likec4-element-node-data--withIconColor_true')
    expect(html).toContain('likec4-element-node-data--withIconBlend_false')
    expect(html).toContain('--likec4-icon-color:')
  })
})

describe('ElementData localization (title, technology, description)', () => {
  const nodeWithChinese = {
    id: 'customer' as NodeId,
    title: 'Customer Service',
    technology: 'Node.js',
    description: { txt: 'Handles customer inquiries' },
    color: 'blue' as Color,
    style: {},
    locales: {
      zh: {
        title: '客户服务系统',
        technology: 'Node.js 服务端',
        description: { txt: '处理客户日常咨询与工单' },
      },
    },
  }

  const nodeWithoutChinese = {
    id: 'backend' as NodeId,
    title: 'Backend API',
    technology: 'Go',
    description: { txt: 'Core backend service' },
    color: 'blue' as Color,
    style: {},
  }

  it('renders default title, technology and description in default/en mode', () => {
    const html = renderToStaticMarkup(
      <ElementData data={nodeWithChinese} />,
    )
    expect(html).toContain('Customer Service')
    expect(html).toContain('Node.js')
    expect(html).toContain('Handles customer inquiries')
    expect(html).not.toContain('客户服务系统')
    expect(html).not.toContain('Node.js 服务端')
    expect(html).not.toContain('处理客户日常咨询与工单')
  })

  it('renders localized title, technology and description when locale is zh', () => {
    const html = renderToStaticMarkup(
      <LikeC4LocaleProvider value="zh">
        <ElementData data={nodeWithChinese} />
      </LikeC4LocaleProvider>,
    )
    expect(html).toContain('客户服务系统')
    expect(html).toContain('Node.js 服务端')
    expect(html).toContain('处理客户日常咨询与工单')
    expect(html).not.toContain('Customer Service')
    expect(html).not.toContain('Handles customer inquiries')
  })

  it('gracefully falls back to default in zh mode when translation is missing', () => {
    const html = renderToStaticMarkup(
      <LikeC4LocaleProvider value="zh">
        <ElementData data={nodeWithoutChinese} />
      </LikeC4LocaleProvider>,
    )
    expect(html).toContain('Backend API')
    expect(html).toContain('Go')
    expect(html).toContain('Core backend service')
  })
})
