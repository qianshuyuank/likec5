import {
  Button,
  Group,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalRoot,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@mantine/core'
import { useState } from 'react'
import { useCurrentView } from '../../hooks'
import { useI18n } from '../../i18n'
import { EmbedPanel } from './share-modal/EmbedPanel'
import { WebcomponentsPanel } from './share-modal/WebcomponentsPanel'

type ShareModalOpts = {
  onClose: () => void
}

export function ShareModal({
  onClose,
}: ShareModalOpts) {
  const i18n = useI18n()
  const [diagram] = useCurrentView()
  const [activeTab, setActiveTab] = useState('webcomponent')
  if (!diagram) {
    return null
  }
  return (
    <ModalRoot
      size={'xl'}
      opened
      onClose={onClose}>
      <ModalOverlay backgroundOpacity={0.5} blur={3} />
      <ModalContent>
        <ModalBody>
          <Tabs value={activeTab} onChange={tab => setActiveTab(tab ?? 'webcomponent')}>
            <TabsList>
              <TabsTab value="webcomponent">{i18n.share.webcomponent}</TabsTab>
              <TabsTab value="embed">{i18n.share.embedded}</TabsTab>
            </TabsList>

            <TabsPanel value="embed" pt={'md'}>
              <EmbedPanel diagram={diagram} />
            </TabsPanel>
            <TabsPanel value="webcomponent" pt={'md'}>
              <WebcomponentsPanel diagram={diagram} />
            </TabsPanel>
          </Tabs>
          <Group justify="flex-end" mt={'lg'}>
            <Button size="sm" onClick={onClose}>{i18n.share.close}</Button>
          </Group>
        </ModalBody>
      </ModalContent>
    </ModalRoot>
  )
}
