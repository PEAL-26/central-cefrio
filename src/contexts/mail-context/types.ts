import { ReactNode } from 'react';

export type Navigation = {
  nextUrl?: string;
  prevUrl?: string;
};

export type ContentProps = {
  navigation?: Navigation;
};

export interface MailProviderProps {
  children?: ReactNode;
}

export interface MailContextData {
  handleSelectContent(content: ContentProps): void;
  navigation?: Navigation;
}
