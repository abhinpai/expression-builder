import React, { FC, PropsWithChildren } from 'react'
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams
} from 'react-router-dom'
import { isEmpty } from 'lodash'

import styles from './container.module.scss'
import { ILanguage } from '@appTypes/ILanguage.interface'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  const { languageId } = useParams()
  const { state } = useLocation()

  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        {!isEmpty(languageId) ? (
          <div className={styles['back_nav']} onClick={goBack} />
        ) : undefined}
        <div>
          <h1 className={styles.title}>Formula Editor</h1>
        </div>
      </nav>
      {!isEmpty(state) ? (
        <p className={styles.language}>{state.label}</p>
      ) : undefined}

      <div className={styles.divider} />
      {children}
    </main>
  )
}
