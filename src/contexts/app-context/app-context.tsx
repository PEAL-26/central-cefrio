'use client';
import { ReactLoading } from '@/libs/react-loading';
import { createContext, useContext, useState } from 'react';
import { AppContextData, AppProviderProps } from './types';

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = {
    show: () => setIsLoading(true),
    hide: () => setIsLoading(false),
    visible: isLoading,
  };

  return (
    <AppContext.Provider value={{ loading }}>
      <>
        {children}
        {isLoading && (
          <div className="fixed inset-0 z-[99999999999999999999] flex h-screen items-center justify-center bg-black/50">
            <ReactLoading type="spinningBubbles" color={'#FFF'} height={90} width={90} />
          </div>
        )}
      </>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
