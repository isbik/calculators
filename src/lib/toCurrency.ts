export const toCurrency = (value: number) => {
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$& "); // 12,345.67
};
