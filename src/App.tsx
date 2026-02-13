import React from 'react';
import { DesignProvider } from './context/DesignContext';
import { EstimatePage } from './pages/EstimatePage';
export function App() {
  return (
    <DesignProvider>
      <EstimatePage />
    </DesignProvider>
  );
}