// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 LikeC4 Contributors

import { useStore } from '@nanostores/react'
import { atom, onMount } from 'nanostores'
import { en } from './en'
import type { I18nMessages, Locale } from './types'
import { zh } from './zh'

export const STORAGE_LOCALE_KEY = 'likec4-locale'

export const detectLocale = (
  storedValue?: string | null,
  navLanguage?: string | null,
): Locale => {
  if (storedValue === 'zh' || storedValue === 'en') {
    return storedValue
  }
  if (navLanguage && navLanguage.toLowerCase().startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

const detectInitialLocale = (): Locale => {
  try {
    const stored = typeof window !== 'undefined' && window.localStorage
      ? window.localStorage.getItem(STORAGE_LOCALE_KEY)
      : null
    const navLang = typeof navigator !== 'undefined' ? navigator.language : null
    return detectLocale(stored, navLang)
  } catch {
    return 'en'
  }
}

export const $activeLocale = atom<Locale>(detectInitialLocale())

export const setLocale = (locale: Locale) => {
  $activeLocale.set(locale)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_LOCALE_KEY, locale)
    }
  } catch {
    // ignore in restricted environments
  }
}

export const toggleLocale = () => {
  const current = $activeLocale.get()
  setLocale(current === 'zh' ? 'en' : 'zh')
}

const dictionaries: Record<Locale, I18nMessages> = {
  en,
  zh,
}

export const useActiveLocale = () => useStore($activeLocale)

export const useI18n = (): I18nMessages => {
  const locale = useActiveLocale()
  return dictionaries[locale] ?? en
}
