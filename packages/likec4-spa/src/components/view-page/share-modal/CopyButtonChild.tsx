import { Button, rem } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useI18n } from '../../../i18n'

export const CopyButtonChild = ({ copied, copy }: { copied: boolean; copy: () => void }) => {
  const i18n = useI18n()
  return (
    <Button
      size="xs"
      color={copied ? 'teal' : 'gray'}
      variant={'light'}
      leftSection={copied
        ? <IconCheck style={{ width: rem(16) }} />
        : <IconCopy style={{ width: rem(16) }} />}
      onClick={copy}>
      {copied ? i18n.share.copied : i18n.share.copyToClipboard}
    </Button>
  )
}
