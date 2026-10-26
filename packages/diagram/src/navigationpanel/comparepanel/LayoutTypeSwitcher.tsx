import { type LayoutType, invariant } from '@likec4/core'
import { css } from '@likec4/styles/css'
import { type SegmentedControlItem, SegmentedControl } from '@mantine/core'
import * as m from 'motion/react-m'
import { useMemo } from 'react'
import { useDiagramTranslation } from '../../i18n'

export function LayoutTypeSwitcher({
  value,
  onChange,
}: {
  value: LayoutType
  onChange: (layout: LayoutType) => void
}) {
  const t = useDiagramTranslation()
  const data = useMemo(() =>
    [
      { value: 'manual', label: t.navigation.savedManual },
      { value: 'auto', label: t.navigation.latestAuto },
    ] satisfies SegmentedControlItem[], [t])

  return (
    <m.div layout="position">
      <SegmentedControl
        size="xs"
        color={value === 'manual' ? 'orange' : 'green'}
        value={value}
        onChange={layout => {
          invariant(layout === 'manual' || layout === 'auto', 'Invalid layout type')
          onChange(layout)
        }}
        classNames={{
          label: css({
            fontSize: 'xxs',
            fontWeight: 'medium',
          }),
        }}
        data={data} />
    </m.div>
  )
}
