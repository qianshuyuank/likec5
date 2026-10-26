import { describe, it } from 'vitest'
import { createTestServices } from '../../test'

describe('LikeC4ModelBuilder - element and relationship localization', () => {
  it('parses title:zh and preserves in model and computed view', async ({ expect }) => {
    const { validate, buildLikeC4Model } = createTestServices()
    await validate(`
      specification {
        element system
      }
      model {
        sys1 = system {
          title 'Customer Service'
          title:zh '客户服务系统'
        }
        sys2 = system {
          title:zh '支付网关'
        }
      }
      views {
        view index {
          include sys1, sys2
        }
      }
    `)

    const model = await buildLikeC4Model()

    // 1. Verify model elements
    const sys1 = model.element('sys1')
    expect(sys1.title).toBe('Customer Service')
    expect(sys1.$element.locales).toBeDefined()
    expect(sys1.$element.locales?.['zh']?.title).toBe('客户服务系统')

    const sys2 = model.element('sys2')
    expect(sys2.title).toBe('sys2') // Fallback to id when default title omitted
    expect(sys2.$element.locales?.['zh']?.title).toBe('支付网关')

    // 2. Verify computed view nodes
    const view = model.view('index')
    const computedSys1 = view.node('sys1')
    expect(computedSys1.title).toBe('Customer Service')
    expect(computedSys1.locales?.['zh']?.title).toBe('客户服务系统')

    const computedSys2 = view.node('sys2')
    expect(computedSys2.title).toBe('sys2')
    expect(computedSys2.locales?.['zh']?.title).toBe('支付网关')
  })

  it('parses description:zh, technology:zh and relationship locales', async ({ expect }) => {
    const { validate, buildLikeC4Model } = createTestServices()
    await validate(`
      specification {
        element system
        relationship calls
      }
      model {
        sys1 = system {
          title 'Customer Service'
          title:zh '客户服务系统'
          description 'Handles customer inquiries'
          description:zh '处理客户日常咨询与工单'
          technology 'Node.js'
          technology:zh 'Node.js 服务端'
        }
        sys2 = system {
          title 'Payment Gateway'
        }
        sys1 -> sys2 'Submits payments' {
          title:zh '提交支付请求'
          technology 'HTTPS REST'
          technology:zh '安全加密 REST 接口'
          description 'Calls payment processing'
          description:zh '调用支付网关处理交易'
        }
      }
      views {
        view index {
          include sys1, sys2
        }
      }
    `)

    const model = await buildLikeC4Model()

    // 1. Element checks
    const sys1 = model.element('sys1')
    expect(sys1.description.text).toBe('Handles customer inquiries')
    expect(sys1.technology).toBe('Node.js')
    expect((sys1.locales?.['zh']?.description as any).txt).toBe('处理客户日常咨询与工单')
    expect(sys1.locales?.['zh']?.technology).toBe('Node.js 服务端')

    // 2. Computed view node checks
    const view = model.view('index')
    const computedSys1 = view.node('sys1')
    expect(computedSys1.description.text).toBe('Handles customer inquiries')
    expect(computedSys1.technology).toBe('Node.js')
    expect((computedSys1.locales?.['zh']?.description as any).txt).toBe('处理客户日常咨询与工单')
    expect(computedSys1.locales?.['zh']?.technology).toBe('Node.js 服务端')

    // 3. Relationship checks
    const rels = [...model.relationships()]
    expect(rels.length).toBe(1)
    const rel = rels[0]!
    expect(rel.title).toBe('Submits payments')
    expect(rel.locales?.['zh']?.title).toBe('提交支付请求')
    expect(rel.locales?.['zh']?.technology).toBe('安全加密 REST 接口')
    expect((rel.locales?.['zh']?.description as any).txt).toBe('调用支付网关处理交易')

    // 4. Computed edge checks
    const edges = [...view.edges()]
    expect(edges.length).toBe(1)
    const edge = edges[0]!
    expect(edge.label).toBe('Submits payments')
    expect(edge.locales?.['zh']?.label).toBe('提交支付请求')
    expect(edge.locales?.['zh']?.technology).toBe('安全加密 REST 接口')
    expect((edge.locales?.['zh']?.description as any).txt).toBe('调用支付网关处理交易')
  })
})
