import { AuthLayout } from "@/components/layouts";
import { LoginScreenComponent } from "@/components/templates/login";
import { getCsrfToken } from "next-auth/react";

export const metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const csrfToken = await getCsrfToken();

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      description="Entre na sua conta para continuar"
    >
      <LoginScreenComponent csrfToken={csrfToken} />
    </AuthLayout>
  );
}
