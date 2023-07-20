// https://github.com/GoogleCloudPlatform/prometheus/blob/release-2.35.0-gmp/web/ui/react-app/src/pages/graph/ExpressionInput.tsx#L15

import { ViewUpdate, EditorView } from '@codemirror/view'
import { useLanguageExtensionsMemo } from 'hooks'
import { useParams } from 'react-router-dom'
import CodeMirror from '@uiw/react-codemirror'
import { useState, useCallback, useEffect, useRef } from 'react'
import { EditorState, Prec, Compartment } from '@codemirror/state'
import { IPredefinedContent } from '@appTypes/IPredefinedContent.interface'

import styles from './CmEditor.module.scss'
import { isEmpty } from 'lodash'

export const baseTheme = EditorView.theme({
  '&.cm-editor': {
    '&.cm-focused': {
      outline: 'none',
      outline_fallback: 'none'
    }
  },
  '.cm-scroller': {
    overflow: 'hidden',
    fontFamily: '"DejaVu Sans Mono", monospace'
  },
  '.cm-placeholder': {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
  },

  '.cm-matchingBracket': {
    color: '#000',
    backgroundColor: '#dedede',
    fontWeight: 'bold',
    outline: '1px dashed transparent'
  },
  '.cm-nonmatchingBracket': { borderColor: 'red' },

  '.cm-tooltip.cm-tooltip-autocomplete': {
    '& > ul': {
      maxHeight: '350px',
      fontFamily: '"DejaVu Sans Mono", monospace',
      maxWidth: 'unset'
    },
    '& > ul > li': {
      padding: '2px 1em 2px 3px'
    },
    minWidth: '30%'
  },

  '.cm-completionDetail': {
    float: 'right',
    color: '#999'
  },

  '.cm-tooltip.cm-completionInfo': {
    marginTop: '-11px',
    padding: '10px',
    fontFamily:
      "'Open Sans', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;",
    border: 'none',
    minWidth: '250px',
    maxWidth: 'min-content'
  },

  '.cm-completionInfo.cm-completionInfo-right': {
    '&:before': {
      content: "' '",
      height: '0',
      position: 'absolute',
      width: '0',
      left: '-20px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: 'transparent'
    },
    marginLeft: '12px'
  },
  '.cm-completionInfo.cm-completionInfo-left': {
    '&:before': {
      content: "' '",
      height: '0',
      position: 'absolute',
      width: '0',
      right: '-20px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: 'transparent'
    },
    marginRight: '12px'
  },

  '.cm-completionMatchedText': {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#0066bf'
  },

  '.cm-selectionMatch': {
    backgroundColor: '#e6f3ff'
  },

  '.cm-diagnostic': {
    '&.cm-diagnostic-error': {
      borderLeft: '3px solid #e65013'
    }
  },

  '.cm-completionIcon': {
    boxSizing: 'content-box',
    fontSize: '16px',
    lineHeight: '1',
    marginRight: '10px',
    verticalAlign: 'top',
    '&:after': { content: "'\\ea88'" },
    fontFamily: 'codicon',
    paddingRight: '0',
    opacity: '1',
    color: '#007acc'
  },

  '.cm-completionIcon-function, .cm-completionIcon-method': {
    '&:after': { content: "'\\ea8c'" },
    color: '#652d90'
  },
  '.cm-completionIcon-class': {
    '&:after': { content: "'○'" }
  },
  '.cm-completionIcon-interface': {
    '&:after': { content: "'◌'" }
  },
  '.cm-completionIcon-variable': {
    '&:after': { content: "'𝑥'" }
  },
  '.cm-completionIcon-constant': {
    '&:after': { content: "'\\eb5f'" },
    color: '#007acc'
  },
  '.cm-completionIcon-type': {
    '&:after': { content: "'𝑡'" }
  },
  '.cm-completionIcon-enum': {
    '&:after': { content: "'∪'" }
  },
  '.cm-completionIcon-property': {
    '&:after': { content: "'□'" }
  },
  '.cm-completionIcon-keyword': {
    '&:after': { content: "'\\eb62'" },
    color: '#616161'
  },
  '.cm-completionIcon-namespace': {
    '&:after': { content: "'▢'" }
  },
  '.cm-completionIcon-text': {
    '&:after': { content: "'\\ea95'" },
    color: '#ee9d28'
  }
})

interface Props {
  readonly content: IPredefinedContent
}

export const CmEditor = (props: Props) => {
  const { content } = props

  const { languageId } = useParams()

  const extension = useLanguageExtensionsMemo(languageId)

  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  console.log(content)

  useEffect(() => {
    // Create or reconfigure the editor.
    const view = viewRef.current

    const viewState = EditorState.create({
      extensions: { extension },
      doc: !isEmpty(content) ? content.snippet : ''
    })

    if (view === null) {
      // If the editor does not exist yet, create it.
      if (!containerRef.current) {
        throw new Error('expected CodeMirror container element to exist')
      }

      const view = new EditorView({
        state: viewState,
        parent: containerRef.current
      })
      viewRef.current = view

      view.focus()
    } else {
      view.setState(viewState)
    }
    // return () => view?.destroy()
  }, [content])

  return <div ref={containerRef} className={styles['cm-custom-editor']} />
}
