import { cn } from "@/libs/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";

interface Props {
  avatar?: string;
  name: string;
  subject?: string;
  message?: string;
  read?: boolean;
  select?: boolean;
  href?: string;
  onClick?: () => void;
}

export function MailListingItem(props: Props) {
  const {
    avatar,
    name,
    subject,
    message,
    read,
    select,
    href = "#",
    onClick,
  } = props;
  return (
    <Link
      className={cn(
        "flex items-center justify-between pr-2 gap-2 hover:bg-primary-50/50 hover:cursor-pointer border-b border-b-primary-100",
        select && "bg-primary-50/50"
      )}
      href={href}
      onClick={onClick}
    >
      <div className={cn("h-16 w-1", select && "bg-primary")} />
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatar} alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="py-1 flex-1">
        <span className="text-sm font-bold line-clamp-1">{name}</span>
        {subject && <span className="text-xs line-clamp-1">{subject}</span>}
        {message && (
          <span className="text-xs font-light line-clamp-1 text-gray-500">
            {message}
          </span>
        )}
      </div>

      <div>
        <span className="text-xs">1d</span>
        <div
          className={cn(
            "w-4 h-4 border rounded-full border-primary-200 bg-primary-200",
            read && "bg-transparent"
          )}
        />
      </div>
    </Link>
  );
}
