export function formatCurrency(value?: number) {
  let newValue = value;
  if (newValue === undefined || newValue === null) newValue = 0;

  const formatNumber = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  });

  return formatNumber.format(newValue);
}
