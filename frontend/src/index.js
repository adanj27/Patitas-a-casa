import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import ScrollToTop from "./helpers/ScrollToTop";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL = process.env.API || 'http://localhost:8000/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <ScrollToTop />
      <App />
  </BrowserRouter>
);

