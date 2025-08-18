// Arquivo: src/App.jsx

import { NotificationProvider } from './context/NotificationProvider'; // Importamos nosso provedor
import HomePage from './pages/HomePage';

function App() {
  return (
    // Envolvemos a HomePage com o NotificationProvider
    <NotificationProvider>
      <HomePage />
    </NotificationProvider>
  );
}

export default App;