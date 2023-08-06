import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { Suspense } from "react"

import Spinner from "./components/Spinner/index"

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="App">
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  </div>
)
