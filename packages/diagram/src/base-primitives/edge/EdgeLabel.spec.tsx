// SPDX-License-Identifier: MIT
//
// Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.

import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { LikeC4LocaleProvider } from '../../i18n'
import { EdgeLabel } from './EdgeLabel'

describe('EdgeLabel localization (label, technology)', () => {
  const edgeWithChinese = {
    id: 'edge1',
    data: {
      label: 'Calls payment API',
      technology: 'HTTPS REST',
      locales: {
        zh: {
          label: '调用支付接口',
          technology: '安全加密 REST',
        },
      },
    },
  } as any

  const edgeWithoutChinese = {
    id: 'edge2',
    data: {
      label: 'Syncs data',
      technology: 'gRPC',
    },
  } as any

  it('renders default label and technology in default/en mode', () => {
    const html = renderToStaticMarkup(
      <EdgeLabel edgeProps={edgeWithChinese} />,
    )
    expect(html).toContain('Calls payment API')
    expect(html).toContain('HTTPS REST')
    expect(html).not.toContain('调用支付接口')
    expect(html).not.toContain('安全加密 REST')
  })

  it('renders localized label and technology when locale is zh', () => {
    const html = renderToStaticMarkup(
      <LikeC4LocaleProvider value="zh">
        <EdgeLabel edgeProps={edgeWithChinese} />
      </LikeC4LocaleProvider>,
    )
    expect(html).toContain('调用支付接口')
    expect(html).toContain('安全加密 REST')
    expect(html).not.toContain('Calls payment API')
    expect(html).not.toContain('HTTPS REST')
  })

  it('gracefully falls back to default in zh mode when translation is missing', () => {
    const html = renderToStaticMarkup(
      <LikeC4LocaleProvider value="zh">
        <EdgeLabel edgeProps={edgeWithoutChinese} />
      </LikeC4LocaleProvider>,
    )
    expect(html).toContain('Syncs data')
    expect(html).toContain('gRPC')
  })
})
