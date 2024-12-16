import { getFirstAndLastNameInitials } from '@/helpers/string';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

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
  const { avatar, name, subject, message, read, select, href = '#', onClick } = props;
  return (
    <Link
      className={cn(
        'flex items-center justify-between gap-2 border-b border-b-primary-100 pr-2 hover:cursor-pointer hover:bg-primary-50/50',
        select && 'bg-primary-50/50',
      )}
      href={href}
      onClick={onClick}
    >
      <div className={cn('h-16 w-1', select && 'bg-primary')} />
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatar} alt="user" />
        <AvatarFallback>{getFirstAndLastNameInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 py-1">
        <span className="line-clamp-1 text-sm font-bold">{name}</span>
        {subject && <span className="line-clamp-1 text-xs">{subject}</span>}
        {message && (
          <span className="line-clamp-1 text-xs font-light text-gray-500">{message}</span>
        )}
      </div>

      <div>
        <span className="text-xs">1d</span>
        <div
          className={cn(
            'h-4 w-4 rounded-full border border-primary-200 bg-primary-200',
            read && 'bg-transparent',
          )}
        />
      </div>
    </Link>
  );
}
