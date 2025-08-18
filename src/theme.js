// Arquivo: src/theme.js

import { createTheme } from '@mui/material/styles';

// Este objeto define a identidade visual de todo o nosso aplicativo.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Um azul profissional para botões e links principais
    },
    secondary: {
      main: '#dc004e', // Uma cor de destaque para ações secundárias
    },
    background: {
      default: '#f4f6f8', // Um cinza bem claro para o fundo da página
      paper: '#ffffff',   // O fundo dos "cards" e formulários será branco puro
    },
  },
  typography: {
    // Define a família de fontes padrão para todo o texto
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    // Você pode adicionar mais customizações de tipografia aqui
  },
  shape: {
    // Define o arredondamento padrão das bordas
    borderRadius: 8,
  },
});

export default theme;