import { MailIcon, UserIcon } from "lucide-react";

interface Props {
  type?: "mail" | "contacts";
}
export function MailUnselected(props: Props) {
  const { type = "mail" } = props;

  return (
    <div className="flex flex-col justify-center items-center">
      {type === "mail" && <MailIcon className="size-20" />}
      {type === "contacts" && <UserIcon className="size-20" />}
      <span className="text-center font-bold text-primary text-lg">
        Selecione um item
      </span>
      <span className="text-center text-sm">Nada Está selecionado</span>
    </div>
  );
}
