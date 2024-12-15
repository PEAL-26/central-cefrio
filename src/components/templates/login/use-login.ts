import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type LoginSchema, loginSchema } from "./schema";
import { toastResponseError, toastResponseRegisterSuccess } from "@/helpers/response/response";
import { UNAUTHORIZED_MESSAGE } from "@/helpers/response/messages";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginSchema) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res || !res?.ok) {
        toastResponseError(UNAUTHORIZED_MESSAGE);
        return;
      }

      toastResponseRegisterSuccess("Login feito com sucesso.");
      router.replace(res.url || "/");
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit: form.handleSubmit(handleSubmit) };
}
