export const activeLink = (url: string, pathname: string) => {
  const className = {
    active:
      "text-sm font-bold transition-colors hover:text-primary text-primary",
    inative:
      "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
  }[url === pathname ? "active" : "inative"];

  return className;
};
