import { ElementType, ReactElement, ComponentType, ElementRef, ComponentElement } from 'react';

interface Props {
  icon?: any;
  className?: string;
}

export function ContactIcon(props: Props) {
  const { icon: Icon, className } = props;
  if (!Icon) return null;

console.log(Icon)
  return null
  // return <Icon className={className} />;
}
