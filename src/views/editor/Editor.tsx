import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'

import { Container, Input } from '@component/index'
import { IPredefinedContent } from '@appTypes/index'

import styles from './Editor.module.scss'

export const Editor = () => {
  const { languageId } = useParams()

  const [predefinedContents, setPredefinedContents] = useState<
    IPredefinedContent[]
  >([])
  const [selectedContent, setSelectedContent] = useState<IPredefinedContent>()

  useEffect(() => {
    async function getLangData() {
      const contents = (await getContents()) as IPredefinedContent[]
      setPredefinedContents(contents)
    }
    getLangData()
  }, [languageId])

  const getContents = () => {
    if (!isEmpty(languageId)) {
      return new Promise((res, rej) => {
        import(`../../core/pre-defined/${languageId}.json`).then((data) => {
          res(data?.default)
        })
      })
    }
  }

  const onSelectContent = (content: IPredefinedContent) => {
    setSelectedContent(content)
  }

  return (
    <Container>
      <section className={styles.editor}>
        <div className={styles['pre_defined_div']}>
          <Input />
          <div
            className={
              isEmpty(predefinedContents)
                ? styles['empty_content']
                : styles.contents
            }
          >
            {isEmpty(predefinedContents) ? (
              <p>No pre-defined formula present</p>
            ) : (
              predefinedContents?.map((content) => (
                <div
                  className={
                    selectedContent?.id === content.id
                      ? styles['selected_content']
                      : styles.content
                  }
                  key={content.id}
                  onClick={() => onSelectContent(content)}
                >
                  {content.label}
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles['editor_div']}></div>
      </section>
    </Container>
  )
}
