// Arquivo: src/components/FormularioInscricao.jsx

import { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationProvider';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Container, CircularProgress } from '@mui/material';

function FormularioInscricao() {
  const { showNotification } = useNotification();
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nomeCompleto: '', idade: '', email: '', telefone: ''
  });
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cursosExemplo = [
        { idCurso: 'Auxiliar Administrativo', nomeCurso: 'Auxiliar Administrativo' },
        { idCurso: 'Criação de Páginas Web', nomeCurso: 'Criação de Páginas Web' },
        { idCurso: 'Programador Back-End', nomeCurso: 'Programador Back-End' },
    ];
    setCursos(cursosExemplo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cursoSelecionado) {
      showNotification("Por favor, selecione um curso.", "warning");
      return;
    }
    setIsSubmitting(true);
    
    // ▼▼▼▼▼ COLE A SUA NOVA URL DO APPS SCRIPT AQUI ▼▼▼▼▼
    const urlDaApi = "https://script.google.com/macros/s/AKfycbwHDoldhvl8mlxuindmlM9r1tVy-ygG-tNOo-eGqQXufureXnmZoECrf3LJYJSXGLKd/exec"; 
    // ▲▲▲▲▲ COLE A SUA NOVA URL DO APPS SCRIPT AQUI ▲▲▲▲▲

    const dadosParaEnviar = { ...formData, cursoPretendido: cursoSelecionado };

    try {
      const response = await fetch(urlDaApi, {
        method: 'POST',
        redirect: "follow",
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(dadosParaEnviar)
      });
      
      const textResponse = await response.text();
      const resultado = JSON.parse(textResponse);

      if (resultado.status === "sucesso") {
        showNotification(`Inscrição realizada! Seu número é ${resultado.numeroInscricao}.`, "success");
        setFormData({ nomeCompleto: '', idade: '', email: '', telefone: '' });
        setCursoSelecionado('');
      } else {
        throw new Error(resultado.mensagem || "Ocorreu um erro no servidor.");
      }
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      showNotification(`Erro ao enviar inscrição: ${error.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ p: 3, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ficha de Inscrição
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
            <TextField label="Nome Completo" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required fullWidth />
            <TextField label="Idade" name="idade" type="number" value={formData.idade} onChange={handleChange} required fullWidth InputProps={{ inputProps: { min: 0 } }}/>
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
            <TextField label="Telefone (com DDD)" name="telefone" type="tel" value={formData.telefone} onChange={handleChange} required fullWidth />
            <FormControl fullWidth required>
              <InputLabel id="curso-select-label">Curso Desejado</InputLabel>
              <Select labelId="curso-select-label" value={cursoSelecionado} label="Curso Desejado" onChange={(e) => setCursoSelecionado(e.target.value)}>
                {cursos.map(curso => (<MenuItem key={curso.idCurso} value={curso.nomeCurso}>{curso.nomeCurso}</MenuItem>))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }} fullWidth disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Enviar Inscrição"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default FormularioInscricao;