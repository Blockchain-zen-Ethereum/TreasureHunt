import Big from "big.js";

export type Notation = "standard" | "scientific" | "engineering" | "compact";

export function formatNumber(
  number?: string | number,
  precision = 6,
  maxFractionDigits = 2,
  minFractionDigits = 0,
  notation: Notation = "standard"
) {
  if (number === undefined) {
    return undefined;
  }

  const roundedNumber = Big(number).toFixed(precision);
  // TODO: internationalization
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
    notation,
  });
  return formatter.format(parseFloat(roundedNumber));
}
