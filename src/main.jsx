// Arquivo: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";

// 1. Importamos as ferramentas de tema do Material-UI
import { ThemeProvider, CssBaseline } from '@mui/material';
// 2. Importamos nosso tema customizado que acabamos de criar
import theme from './theme';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Envolvemos todo o aplicativo com o ThemeProvider */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline reseta o CSS do navegador para um padrão consistente */}
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);