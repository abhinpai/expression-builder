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
import { ArrowLeftOutlined, BackwardFilled } from '@ant-design/icons'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  const { languageId } = useParams()
  const { state } = useLocation()

  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <main className={styles.container}>
      <nav
        className={
          isEmpty(languageId)
            ? `${styles.nav} ${styles['nav_without_lang']}`
            : `${styles.nav} ${styles['nav_with_lang']}`
        }
      >
        {!isEmpty(languageId) ? (
          <div className={styles['back_nav']} onClick={goBack}>
            <ArrowLeftOutlined height={1} />
          </div>
        ) : undefined}
        <div>
          <h1 className={styles.title}>Formula Editor</h1>
        </div>
      </nav>
      {!isEmpty(state) ? (
        <p className={styles.language}>{state.label}</p>
      ) : undefined}

      <div className={styles.divider} />
      <div
        className={
          isEmpty(languageId)
            ? styles['children_full']
            : styles['children_partial']
        }
      >
        {children}
      </div>
    </main>
  )
}
