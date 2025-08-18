// Arquivo: src/pages/HomePage.jsx

import FormularioInscricao from '../components/FormularioInscricao';
import { Container, Typography, Box } from '@mui/material';

function HomePage() {
  return (
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
          Preencha o formulário abaixo para concorrer a uma vaga em nossos cursos.
        </Typography>
      </Box>
      
      {/* Aqui usamos nosso componente de formulário que construiremos a seguir */}
      <FormularioInscricao />

    </Container>
  );
}

export default HomePage;