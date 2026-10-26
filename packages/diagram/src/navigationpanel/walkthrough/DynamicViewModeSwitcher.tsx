import type { DynamicViewDisplayVariant } from '@likec4/core'
import { css } from '@likec4/styles/css'
import { type SegmentedControlItem, SegmentedControl } from '@mantine/core'
import { m } from 'motion/react'
import { useMemo, useRef } from 'react'
import { selectDiagramContext, useDiagram, useDiagramSelector } from '../../hooks'
import { useDiagramTranslation } from '../../i18n'

const selectDynamicViewVariant = selectDiagramContext(c => c.dynamicViewVariant)

export function DynamicViewModeSwitcher() {
  const t = useDiagramTranslation()
  const dynamicViewModes = useMemo(() =>
    [
      {
        value: 'diagram' as const,
        label: t.navigation.diagramMode,
      },
      {
        value: 'sequence' as const,
        label: t.navigation.sequenceMode,
      },
    ] satisfies SegmentedControlItem<DynamicViewDisplayVariant>[], [t])

  const value = useDiagramSelector(selectDynamicViewVariant)
  const diagram = useDiagram()

  const controlAnimation = useRef({
    initial: { opacity: 0, translateX: -10 },
    animate: { opacity: 1, translateX: 0 },
    exit: { opacity: 0, translateX: -10 },
  })

  return (
    <m.div
      layout="position"
      {...controlAnimation.current}
    >
      <SegmentedControl<DynamicViewDisplayVariant>
        value={value}
        data={dynamicViewModes}
        onChange={variant => {
          diagram.switchDynamicViewVariant(variant)
        }}
        size="xs"
        classNames={{
          label: css({
            fontSize: 'xxs',
          }),
        }}
      />
    </m.div>
  )
}
