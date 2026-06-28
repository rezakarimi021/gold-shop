const FORMATTER = new Intl.NumberFormat("fa-IR", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  useGrouping: true,
});

export const formatPrice = (amount: number): string => `${FORMATTER.format(amount)} تومان`;

export const formatPriceCompact = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `${FORMATTER.format(Math.round(amount / 1_000_000_000))} میلیارد تومان`;
  }
  if (amount >= 1_000_000) {
    return `${FORMATTER.format(Math.round(amount / 1_000_000))} میلیون تومان`;
  }
  return formatPrice(amount);
};

export const formatWeight = (grams: number): string =>
  `${new Intl.NumberFormat("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(grams)} گرم`;
