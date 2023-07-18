import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import styles from './main.module.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className={styles.sample}>Hello world!</div>
  </React.StrictMode>
)
