export function displayShortString(
  address: string,
  prefixDigit = 5,
  postfixDigit = 5
) {
  return `${address.substr(0, prefixDigit)}...${address.substr(
    address.length - postfixDigit,
    postfixDigit
  )}`;
}
