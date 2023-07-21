import { Extension } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { EditorView, ViewUpdate, keymap, placeholder } from '@codemirror/view'
import {
  LanguageDescription,
  LanguageSupport,
  StreamLanguage
} from '@codemirror/language'
import { useMemo } from 'react'
import { Compartment } from '@codemirror/state'
import { defaultKeymap } from "@codemirror/commands";

import { python } from '@codemirror/lang-python'
import { json } from '@codemirror/lang-json'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import { csharp } from '@codemirror/legacy-modes/mode/clike'

export function useLanguageExtensionsMemo(language: string): Extension[] {
  const commonExtensions = [
    basicSetup,
    keymap.of(defaultKeymap),
    placeholder('Expression (press Shift+Enter for newlines)'),
    EditorView.updateListener.of((update: ViewUpdate): void => {
      console.log(update.state.doc.toString())
    })
  ]

  return useMemo(() => {
    const languageConf = new Compartment()
    switch (language) {
      case 'python':
        commonExtensions.push(python())
        commonExtensions.push(languageConf.of(python()))
        return commonExtensions
      case 'json':
        commonExtensions.push(json())
        commonExtensions.push(languageConf.of(json()))
        return commonExtensions
      case 'javascript':
        commonExtensions.push(javascript())
        commonExtensions.push(languageConf.of(javascript()))
        return commonExtensions
      case 'java':
        commonExtensions.push(java())
        commonExtensions.push(languageConf.of(java()))
        return commonExtensions
      case 'markdown':
        commonExtensions.push(markdown())
        commonExtensions.push(languageConf.of(markdown()))
        return commonExtensions
      case 'yaml':
        commonExtensions.push(StreamLanguage.define(yaml))
        return commonExtensions
      case 'c-sharp':
        commonExtensions.push(
          new LanguageSupport(StreamLanguage.define(csharp))
        )
        return commonExtensions
      default:
        return commonExtensions
    }
  }, [language])
}
