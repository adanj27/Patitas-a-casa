import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { Suspense } from "react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<></>}>
    <RouterProvider router={router} />
  </Suspense>
)
