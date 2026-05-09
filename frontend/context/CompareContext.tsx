'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { College } from '@/lib/api';

const STORAGE_KEY = 'compare_list';

interface CompareContextType {
  list: College[];
  add: (college: College) => void;
  remove: (id: string) => void;
  clear: () => void;
  isInList: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  list: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  isInList: () => false,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<College[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setList(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (next: College[]) => {
    setList(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const add = (college: College) => {
    setList(prev => {
      if (prev.find(c => c.id === college.id)) return prev;
      if (prev.length >= 3) return prev;
      const next = [...prev, college];
      save(next);
      return next;
    });
  };

  const remove = (id: string) => {
    setList(prev => {
      const next = prev.filter(c => c.id !== id);
      save(next);
      return next;
    });
  };

  const clear = () => save([]);

  const isInList = (id: string) => list.some(c => c.id === id);

  return (
    <CompareContext.Provider value={{ list, add, remove, clear, isInList }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
