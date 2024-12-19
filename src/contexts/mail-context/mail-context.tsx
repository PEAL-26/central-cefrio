'use client';
import { createContext, useContext, useState } from 'react';
import { ContentProps, MailContextData, MailProviderProps, Navigation } from './types';

const MailContext = createContext<MailContextData>({} as MailContextData);

export const MailProvider: React.FC<MailProviderProps> = ({ children }) => {
  const [navigation, setNavigation] = useState<Navigation | undefined>();

  const handleSelectContent = (content: ContentProps) => {
    const { navigation } = content;
    setNavigation(navigation);
  };

  return (
    <MailContext.Provider value={{ handleSelectContent, navigation }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMailContext = () => useContext(MailContext);
