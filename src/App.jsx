// Arquivo: src/App.jsx

import { NotificationProvider } from './context/NotificationProvider';
import HomePage from './pages/HomePage';
import { Container, Typography, Box } from '@mui/material';

function App() {
  return (
    <NotificationProvider>
      <Container component="main" maxWidth="md">
        <Box 
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Inscrições Abertas - CEDESP Rede Comunitá
          </Typography>
          <Typography component="p" variant="subtitle1" color="text.secondary">
            Preencha o formulário abaixo para concorrer a uma vaga.
          </Typography>
        </Box>
        <HomePage />
      </Container>
    </NotificationProvider>
  );
}

export default App;