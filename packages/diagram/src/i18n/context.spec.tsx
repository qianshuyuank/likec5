import { MantineProvider } from '@mantine/core'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { ToggleReadonly } from '../navigationpanel/controls/ToggleReadonly'
import { LikeC4LocaleProvider, useDiagramTranslation } from './context'
import { en } from './en'
import { zh } from './zh'

vi.mock('../hooks/useDiagram', () => ({
  useDiagram: () => ({
    toggleFeature: vi.fn(),
  }),
}))

describe('Diagram i18n', () => {
  it('provides english translations by default', () => {
    function TestComponent() {
      const t = useDiagramTranslation()
      return <div>{t.navigation.edit}</div>
    }

    const html = renderToStaticMarkup(<TestComponent />)
    expect(html).toContain(en.navigation.edit)
    expect(html).toContain('Edit')
  })

  it('provides chinese translations when locale is zh', () => {
    function TestComponent() {
      const t = useDiagramTranslation()
      return (
        <div>
          <span>{t.navigation.edit}</span>
          <span>{t.elementDetails.tabProperties}</span>
          <span>{t.elementDetails.tabRelationships}</span>
          <span>{t.viewDetails.resetLayout}</span>
        </div>
      )
    }

    const html = renderToStaticMarkup(
      <LikeC4LocaleProvider value="zh">
        <TestComponent />
      </LikeC4LocaleProvider>,
    )

    expect(html).toContain(zh.navigation.edit)
    expect(html).toContain('编辑')
    expect(html).toContain(zh.elementDetails.tabProperties)
    expect(html).toContain('属性')
    expect(html).toContain(zh.elementDetails.tabRelationships)
    expect(html).toContain('关联关系')
    expect(html).toContain(zh.viewDetails.resetLayout)
    expect(html).toContain('重置布局')
  })

  it('renders ToggleReadonly button with localized label', () => {
    const htmlEn = renderToStaticMarkup(
      <MantineProvider>
        <LikeC4LocaleProvider value="en">
          <ToggleReadonly disabled={false} isReadOnly={true} />
        </LikeC4LocaleProvider>
      </MantineProvider>,
    )
    expect(htmlEn).toContain('Edit')

    const htmlZh = renderToStaticMarkup(
      <MantineProvider>
        <LikeC4LocaleProvider value="zh">
          <ToggleReadonly disabled={false} isReadOnly={true} />
        </LikeC4LocaleProvider>
      </MantineProvider>,
    )
    expect(htmlZh).toContain('编辑')
  })
})
