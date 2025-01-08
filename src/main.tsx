import App from '@/App.tsx';
import { StrictMode } from 'react';
import '@/assets/styles/root/main.scss';
import { createRoot } from 'react-dom/client';
import '@/plugins/react-i18next.plugin.ts';

const app = createRoot(document.getElementById('root')!);

app.render(
  <StrictMode>
    <App />
  </StrictMode>
);
