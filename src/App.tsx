import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './providers';
import { Routes } from './routes';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
