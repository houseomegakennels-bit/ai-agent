import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelixCommandShell } from '../shared-ui/HelixCommandShell';
import '../shared-ui/styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelixCommandShell />
  </React.StrictMode>,
);
