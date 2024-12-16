import { ReactNode } from 'react';

type Loading = {
  visible: boolean;
  show: () => void;
  hide: () => void;
};

export interface AppProviderProps {
  children?: ReactNode;
}

export interface AppContextData {
  loading: Loading;
}
