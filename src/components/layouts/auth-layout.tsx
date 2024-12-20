import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout(props: AuthLayoutProps) {
  const { children, title, description } = props;
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          {description && <p className="text-gray-2 mt-2">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
