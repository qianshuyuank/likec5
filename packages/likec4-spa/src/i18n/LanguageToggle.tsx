// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 LikeC4 Contributors

import { ActionIcon, Tooltip } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { toggleLocale, useActiveLocale, useI18n } from './state'

export function LanguageToggle() {
  const locale = useActiveLocale()
  const i18n = useI18n()

  return (
    <Tooltip label={i18n.header.toggleLanguage} withArrow position="bottom">
      <ActionIcon
        size={'md'}
        w={'auto'}
        px={'6px'}
        variant="subtle"
        color="gray"
        onClick={toggleLocale}
        aria-label={i18n.header.toggleLanguage}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 600 }}>
          <IconLanguage size={15} stroke={1.5} />
          {locale === 'zh' ? '中' : 'EN'}
        </span>
      </ActionIcon>
    </Tooltip>
  )
}
