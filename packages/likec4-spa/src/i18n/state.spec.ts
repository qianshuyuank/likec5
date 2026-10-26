// SPDX-License-Identifier: MIT
//
// Copyright (c) 2023-2026 Denis Davydkov
// Copyright (c) 2026 LikeC4 Contributors

import { describe, expect, it } from 'vitest'
import { en } from './en'
import { $activeLocale, detectLocale, setLocale, toggleLocale } from './state'
import { zh } from './zh'

describe('i18n state and detection', () => {
  it('should detect locale from localStorage if set', () => {
    expect(detectLocale('zh', 'en-US')).toBe('zh')
    expect(detectLocale('en', 'zh-CN')).toBe('en')
  })

  it('should detect locale from navigator.language when localStorage is empty', () => {
    expect(detectLocale(null, 'zh-CN')).toBe('zh')
    expect(detectLocale(null, 'zh-TW')).toBe('zh')
    expect(detectLocale(null, 'zh')).toBe('zh')
    expect(detectLocale(null, 'en-US')).toBe('en')
    expect(detectLocale(null, 'fr-FR')).toBe('en')
    expect(detectLocale(null, null)).toBe('en')
  })

  it('should toggle and set locale cleanly', () => {
    setLocale('en')
    expect($activeLocale.get()).toBe('en')

    toggleLocale()
    expect($activeLocale.get()).toBe('zh')

    toggleLocale()
    expect($activeLocale.get()).toBe('en')
  })

  it('should have consistent dictionary structure across en and zh', () => {
    const checkKeys = (enObj: any, zhObj: any, path = '') => {
      for (const key of Object.keys(enObj)) {
        const fullPath = path ? `${path}.${key}` : key
        expect(zhObj, `Missing key ${fullPath} in zh dictionary`).toHaveProperty(key)
        if (typeof enObj[key] === 'object' && enObj[key] !== null) {
          checkKeys(enObj[key], zhObj[key], fullPath)
        } else {
          expect(typeof zhObj[key]).toBe('string')
        }
      }
    }
    checkKeys(en, zh)
  })
})
