import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Editor, Language, NotFound } from '@views/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Language />,
    errorElement: <NotFound />
  },
  {
    path: '/:languageId',
    element: <Editor />
  }
])

export const Router = () => <RouterProvider router={router} />
