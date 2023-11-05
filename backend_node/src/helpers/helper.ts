export const generateSlug = (data: string): string => {
  return data
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};
