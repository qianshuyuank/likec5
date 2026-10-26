// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.

import { createContext, useContext } from 'react'
import { en } from './en'
import type { DiagramLocale, DiagramTranslations } from './types'
import { zh } from './zh'

const translations: Record<DiagramLocale, DiagramTranslations> = {
  en,
  zh,
}

export const LikeC4LocaleContext = createContext<DiagramLocale>('en')
export const LikeC4LocaleProvider = LikeC4LocaleContext.Provider

export function useDiagramLocale(): DiagramLocale {
  return useContext(LikeC4LocaleContext)
}

export function useDiagramTranslation(): DiagramTranslations {
  const locale = useDiagramLocale()
  return translations[locale] ?? translations.en
}
