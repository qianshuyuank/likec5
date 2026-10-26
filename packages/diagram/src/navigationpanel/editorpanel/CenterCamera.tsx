import { IconFocusCentered } from '@tabler/icons-react'
import { useDiagram } from '../../hooks/useDiagram'
import { useDiagramTranslation } from '../../i18n'
import { PanelActionIcon } from '../_common'
import { Tooltip } from './_common'

export const CenterCamera = () => {
  const diagram = useDiagram()
  const t = useDiagramTranslation()
  return (
    <Tooltip label={t.navigation.centerCamera}>
      <PanelActionIcon onClick={() => diagram.fitDiagram()}>
        <IconFocusCentered />
      </PanelActionIcon>
    </Tooltip>
  )
}
