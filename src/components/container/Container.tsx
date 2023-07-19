import React, { FC, PropsWithChildren } from 'react'
import styles from './container.module.scss'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Formula Editor</h1>
      <div className={styles.divider} />
      {children}
    </main>
  )
}
