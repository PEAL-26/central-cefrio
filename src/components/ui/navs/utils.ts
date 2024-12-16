export const activeLink = (url: string, pathname: string) => {
  const HOME = ['/comercial', '/mails'];
  const isHome = !!HOME.find((h: string) => h === url && h === pathname);

  const className = {
    active: 'text-sm font-bold transition-colors hover:text-primary text-primary',
    inative: 'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
  }[isHome ? 'active' : !HOME.includes(url) && pathname.startsWith(url) ? 'active' : 'inative'];

  return className;
};
