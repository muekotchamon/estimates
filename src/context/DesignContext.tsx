import React, { createContext, useContext, useState, useMemo } from 'react';
import { DesignId, getDesignSet, DesignSet } from '../data/designSets';

interface DesignContextValue {
  designId: DesignId;
  setDesignId: (id: DesignId) => void;
  designData: DesignSet;
}

const DesignContext = createContext<DesignContextValue | null>(null);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  const [designId, setDesignId] = useState<DesignId>(1);
  const designData = useMemo(() => getDesignSet(designId), [designId]);
  const value = useMemo(
    () => ({ designId, setDesignId, designData }),
    [designId, designData]
  );
  return (
    <DesignContext.Provider value={value}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error('useDesign must be used within DesignProvider');
  return ctx;
}
