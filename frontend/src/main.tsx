import ReactDOM from 'react-dom/client';
import { AppRouter } from './router/index.tsx';
import '@/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeroUIProvider } from '@heroui/react';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <AppRouter />
      <ToastContainer />
    </HeroUIProvider>
  </StrictMode>
);

