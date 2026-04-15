export const formatCurrency = (value: number) => {
  const rounded = Math.round(value / 100) * 100;

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  })
    .format(rounded)
    .replace(/\u00A0/g, ' ');
};
