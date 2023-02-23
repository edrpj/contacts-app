export const getValuesSeparatedByCommas = (
  arr: any[],
  property: string
): string => {
  let value: string = "";

  for (const element of arr) {
    value += `${element[property]}, `;
  }

  return value.substring(0, value.length - 2);
};
