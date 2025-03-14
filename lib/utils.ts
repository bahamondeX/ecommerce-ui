export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const cn = (...inputs: (string | undefined)[]) => {
  return inputs.filter(Boolean).join(" ");
};