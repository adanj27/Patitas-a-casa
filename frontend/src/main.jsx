import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import Spinner from './components/Spinner/index';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './helpers/ScrollToTop/ScrollToTop';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </Suspense>
);
