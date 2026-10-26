import { css } from '@likec4/styles/css'
import { Box } from '@likec4/styles/jsx'
import { hstack } from '@likec4/styles/patterns'
import {
  type TooltipProps,
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core'
import {
  IconLayoutAlignBottom,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignMiddle,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
  IconLayoutBoardSplit,
  IconLayoutCollage,
  IconRouteOff,
} from '@tabler/icons-react'
import { memo, useState } from 'react'
import type { MouseEventHandler, ReactNode } from 'react'
import { useDiagram } from '../../hooks/useDiagram'
import { useMantinePortalProps } from '../../hooks/useMantinePortalProps'
import { useDiagramTranslation } from '../../i18n'
import { PanelActionIcon } from '../_common'
import { Tooltip } from './_common'

const Action = ({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: ReactNode
  onClick: MouseEventHandler
}) => (
  <Tooltip label={label} withinPortal={false} position="top">
    <PanelActionIcon
      classNames={{
        root: 'action-icon',
        icon: css({
          '& > svg': {
            width: '[70%]',
            height: '[70%]',
          },
        }),
      }}
      onClick={onClick}>
      {icon}
    </PanelActionIcon>
  </Tooltip>
)

export function manualLayoutTooltipProps(isPopoverOpen: boolean): Pick<TooltipProps, 'opened'> {
  return isPopoverOpen ? { opened: false } : {}
}

export const ManualLayoutToolsButton = memo(() => {
  const t = useDiagramTranslation()
  const diagram = useDiagram()
  const portalProps = useMantinePortalProps()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <Popover
      onChange={setIsPopoverOpen}
      position="right"
      offset={{
        mainAxis: 12,
      }}
      clickOutsideEvents={[
        'pointerdown',
      ]}
      {...portalProps}>
      <PopoverTarget>
        <Tooltip label={t.navigation.manualLayoutTools} {...manualLayoutTooltipProps(isPopoverOpen)}>
          <Box>
            <PanelActionIcon>
              <IconLayoutCollage />
            </PanelActionIcon>
          </Box>
        </Tooltip>
      </PopoverTarget>
      <PopoverDropdown
        className={hstack({
          gap: '0.5',
          layerStyle: 'likec4.panel',
          padding: '1',
          pointerEvents: 'all',
        })}>
        <Action
          label={t.navigation.alignColumns}
          icon={<IconLayoutBoardSplit />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Column')
          }} />
        <Action
          label={t.navigation.alignLeft}
          icon={<IconLayoutAlignLeft />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Left')
          }} />
        <Action
          label={t.navigation.alignCenter}
          icon={<IconLayoutAlignCenter />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Center')
          }} />
        <Action
          label={t.navigation.alignRight}
          icon={<IconLayoutAlignRight />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Right')
          }} />
        <Action
          label={t.navigation.alignRows}
          icon={<IconLayoutBoardSplit style={{ transform: 'rotate(90deg)' }} />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Row')
          }} />
        <Action
          label={t.navigation.alignTop}
          icon={<IconLayoutAlignTop />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Top')
          }} />
        <Action
          label={t.navigation.alignMiddle}
          icon={<IconLayoutAlignMiddle />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Middle')
          }} />
        <Action
          label={t.navigation.alignBottom}
          icon={<IconLayoutAlignBottom />}
          onClick={e => {
            e.stopPropagation()
            diagram.align('Bottom')
          }} />
        <Action
          label={t.navigation.resetControlPoints}
          icon={<IconRouteOff />}
          onClick={e => {
            e.stopPropagation()
            diagram.resetEdgeControlPoints()
          }} />
      </PopoverDropdown>
    </Popover>
  )
})
ManualLayoutToolsButton.displayName = 'ManualLayoutToolsButton'
