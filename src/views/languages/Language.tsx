import React from 'react'

import { Container } from '@component/index'

import { AVAILABLE_LANGUAGES } from 'utils/constants'

import styles from './language.module.scss'

const Language = () => {
  return (
    <Container>
      <section className={styles['language_section']}>
        {AVAILABLE_LANGUAGES.map((language) => (
          <div className={styles.language} key={language.id}>
            <p className={styles.label}>{language.label}</p>
            <span className={styles.description}>{language.description}</span>
          </div>
        ))}
      </section>
    </Container>
  )
}

export default Language
