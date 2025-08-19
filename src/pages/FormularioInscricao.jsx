// Arquivo: src/components/FormularioInscricao.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationProvider';

// Importando componentes do MUI
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Container, Checkbox, FormControlLabel, RadioGroup, Radio, CircularProgress } from '@mui/material';

function FormularioInscricao() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nomeCompleto: '', cpf: '', telefone: '', idade: '', email: '',
    exEducando: 'nao', exEducandoAno: '', motivoEstudar: '', comprometimento: false
  });
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Lista de cursos de exemplo (podemos buscar da planilha no futuro)
    const cursosExemplo = [
        { idCurso: 'curso-01', nomeCurso: 'Auxiliar Administrativo' },
        { idCurso: 'curso-02', nomeCurso: 'Criação de Páginas Web' },
        { idCurso: 'curso-03', nomeCurso: 'Programador Back-End' },
        { idCurso: 'curso-04', nomeCurso: 'Eletricista Instalador' },
        { idCurso: 'curso-05', nomeCurso: 'Instalador de Acessórios Automotivos' },
        { idCurso: 'curso-06', nomeCurso: 'Mecânica de Motor Ciclo Otto' },
        { idCurso: 'curso-07', nomeCurso: 'Mecânica de Suspensão, Direção e Freios de Veículos Leves' },
        { idCurso: 'curso-08', nomeCurso: 'Operador de Microcomputador' },
        { idCurso: 'curso-09', nomeCurso: 'Programador Back-End' },
    ];
    setCursos(cursosExemplo);
    setLoadingCursos(false);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cursoSelecionado) {
      showNotification("Por favor, selecione um curso.", "warning");
      return;
    }
    if (!formData.comprometimento) {
      showNotification("Você precisa marcar a caixa de comprometimento.", "warning");
      return;
    }

    setIsSubmitting(true);

    // URL ATUALIZADA PARA SUA NOVA PLANILHA 'db-cedesp'
    const urlDaApi = "https://script.google.com/macros/s/AKfycbwHDoldhvl8mlxuindmlM9r1tVy-ygG-tNOo-eGqQXufureXnmZoECrf3LJYJSXGLKd/exec"; 

    const curso = cursos.find(c => c.idCurso === cursoSelecionado);
    const dadosParaEnviar = {
      ...formData,
      cursoPretendido: curso ? curso.nomeCurso : 'Não encontrado'
    };

    try {
      const response = await fetch(urlDaApi, {
        method: 'POST',
        redirect: "follow",
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(dadosParaEnviar)
      });
      
      const textResponse = await response.text();
      const resultado = JSON.parse(textResponse);

      if (resultado.status === "sucesso") {
        showNotification(`Inscrição realizada! Seu número é ${resultado.numeroInscricao}.`, "success");
        setFormData({
            nomeCompleto: '', cpf: '', telefone: '', idade: '', email: '',
            exEducando: 'nao', exEducandoAno: '', motivoEstudar: '', comprometimento: false
        });
        setCursoSelecionado('');
      } else {
        throw new Error(resultado.mensagem || "Ocorreu um erro desconhecido no servidor.");
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
          
          <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 2 }}>Dados Pessoais</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Nome Completo" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required fullWidth />
            <TextField label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} required fullWidth />
            <TextField label="Telefone (com DDD)" name="telefone" type="tel" value={formData.telefone} onChange={handleChange} required fullWidth />
            <TextField label="Idade" name="idade" type="number" value={formData.idade} onChange={handleChange} required fullWidth />
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
          </Box>

          <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>Questionário</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl component="fieldset">
              <Typography component="legend">Já foi educando do CEDESP?</Typography>
              <RadioGroup row name="exEducando" value={formData.exEducando} onChange={handleChange}>
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
            {formData.exEducando === 'sim' && (
              <TextField label="Qual ano?" name="exEducandoAno" value={formData.exEducandoAno} onChange={handleChange} fullWidth />
            )}
            <TextField label="Porque você pretende estudar aqui?" name="motivoEstudar" value={formData.motivoEstudar} onChange={handleChange} required multiline rows={4} fullWidth />
            <FormControlLabel control={<Checkbox checked={formData.comprometimento} onChange={handleChange} name="comprometimento" required />}
              label="Você se compromete a participar de todas as atividades?" />
          </Box>
          
          <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>Inscrição no Curso</Typography>
          <FormControl fullWidth required>
            <InputLabel id="curso-select-label">Curso Desejado</InputLabel>
            <Select labelId="curso-select-label" id="curso" value={cursoSelecionado} label="Curso Desejado" onChange={(e) => setCursoSelecionado(e.target.value)}>
              <MenuItem value="" disabled>{loadingCursos ? "Carregando cursos..." : "Selecione um curso"}</MenuItem>
              {cursos.map(curso => (<MenuItem key={curso.idCurso} value={curso.idCurso}>{curso.nomeCurso}</MenuItem>))}
            </Select>
          </FormControl>
          
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 3 }} fullWidth disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Enviar Inscrição"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default FormularioInscricao;