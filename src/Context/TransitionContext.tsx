'use client';

import { createContext, useState, ReactNode } from 'react';

interface TransitionContextType {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  completed: false,
  toggleCompleted: () => {},
});

interface TransitionProviderProps {
  children: ReactNode;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const [completed, setCompleted] = useState<boolean>(false);

  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider value={{ toggleCompleted, completed }}>
      {children}
    </TransitionContext.Provider>
  );
}

export default TransitionContext;