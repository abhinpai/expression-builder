import React from 'react'

import { Container } from '@component/index'
import { ILanguage } from '@appTypes/ILanguage.interface'

import AVAILABLE_LANGUAGES from 'core/languages/languages.json'

import styles from './language.module.scss'
import { useNavigate } from 'react-router-dom'

export const Language = () => {
  const navigate = useNavigate()

  const openEditor = (language: ILanguage) => {
    navigate(`/${language.id}`, {
      state: language
    })
  }

  return (
    <Container>
      <section className={styles['language_section']}>
        {AVAILABLE_LANGUAGES.map((language) => (
          <div
            className={styles.language}
            key={language.id}
            onClick={() => openEditor(language)}
          >
            <p className={styles.label}>{language.label}</p>
            <span className={styles.description}>{language.description}</span>
          </div>
        ))}
      </section>
    </Container>
  )
}
