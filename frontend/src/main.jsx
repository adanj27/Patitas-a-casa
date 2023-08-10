import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import AppRouter from './router'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from "react"

import Spinner from "./components/Spinner/index"
import ScrollToTop from "./helpers/scrollToTop/scrollToTop"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  </Suspense>
)
