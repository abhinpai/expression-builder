import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Editor, Language, NotFound } from '@views/index'
import { CmEditor } from '@component/cmEditor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Language />,
    errorElement: <NotFound />
  },
  {
    path: '/:languageId',
    element: <Editor/>
    // element:  (
    //   <div>
    //     <CmEditor />
    //   </div>
    // )
  }
])

export const Router = () => <RouterProvider router={router} />
