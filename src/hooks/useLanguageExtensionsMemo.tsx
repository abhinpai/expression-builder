import { python } from '@codemirror/lang-python'
import { Extension } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { EditorView, ViewUpdate, placeholder } from '@codemirror/view'
import { useMemo } from 'react'
import { Compartment } from '@codemirror/state'

export function useLanguageExtensionsMemo(language: string): Extension[] {
  const commonExtensions = [
    basicSetup,
    placeholder('Expression (press Shift+Enter for newlines)'),
    EditorView.updateListener.of((update: ViewUpdate): void => {
      console.log(update.state.doc.toString())
    })
  ]

  return useMemo(() => {
    switch (language) {
      case 'python':
        const languageConf = new Compartment()
        commonExtensions.push(python())
        commonExtensions.push(languageConf.of(python()))
        return commonExtensions
      case 'raw':
        return commonExtensions
      default:
        return commonExtensions
    }
  }, [language])
}
