type TotalInputType = {
  quantity: number;
  price: number;
  discount: number;
  iva: number;
};

export const invoiceUpdateItemTotal = (input: TotalInputType) => {
  const { quantity, price, discount, iva } = input;

  const discountAmount = (discount * price) / 100;
  const priceDiscount = price - discountAmount;
  const ivaAmount = (iva * priceDiscount) / 100;
  const priceIva = priceDiscount + ivaAmount;
  const total = quantity * priceIva;

  return { discountAmount, priceDiscount, ivaAmount, priceIva, total };
};

type ResumeInputType = {
  items: {
    discountAmount: number;
    ivaAmount: number;
    total: number;
  }[];
  customerId?: string;
  withholdingTaxPercentage?: number;
};

export const invoiceUpdateResume = (input: ResumeInputType) => {
  const { items = [], customerId, withholdingTaxPercentage } = input;
  const subtotal = items.reduce((total, item) => total + item.total ?? 0, 0) ?? 0;
  const totalIva = items.reduce((total, item) => total + item.ivaAmount, 0) ?? 0;
  const totalDiscount = items?.reduce((total, item) => total + item.discountAmount, 0);

  let withholdingTaxPer = 0;

  if (customerId && withholdingTaxPercentage) {
    withholdingTaxPer = withholdingTaxPercentage ?? 0;
  }

  const totalWithholdingTax = (subtotal * withholdingTaxPer) / 100;
  const total = subtotal - totalWithholdingTax;

  return { subtotal, totalDiscount, totalIva, totalWithholdingTax, total };
};
