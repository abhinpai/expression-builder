import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/index.scss'
import Language from './views/languages/Language'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Language />
  </React.StrictMode>
)
