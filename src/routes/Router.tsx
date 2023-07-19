import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Language from '@views/languages/Language'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Language />
  }
])

export const Router = () => <RouterProvider router={router} />
