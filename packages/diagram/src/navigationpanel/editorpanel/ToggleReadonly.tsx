import { IconLockOpen2 } from '@tabler/icons-react'
import { useDiagram } from '../../hooks/useDiagram'
import { useDiagramTranslation } from '../../i18n'
import { PanelActionIcon } from '../_common'
import { Tooltip } from './_common'

export const ToggleReadonly = () => {
  const diagram = useDiagram()
  const t = useDiagramTranslation()
  return (
    <Tooltip label={t.navigation.switchToReadonly}>
      <PanelActionIcon onClick={() => diagram.toggleFeature('ReadOnly')}>
        <IconLockOpen2 size={14} stroke={2} />
      </PanelActionIcon>
    </Tooltip>
  )
}
