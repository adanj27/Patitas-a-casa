/* eslint-disable prefer-regex-literals */
export function isValidImageURL(url: string) {
  const imageExtensions = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;
  return imageExtensions.test(url);
}

export function isValidUrl(url) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i",
  );
  return !!urlPattern.test(url);
}

export function validateImage(url) {
  if (isValidImageURL(url) || isValidUrl(url)) {
    return true;
  }
  return false;
}
export function isValidPhone(phone: string) {
  const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
  return regex.test(phone);
}

export function isValidPassword(pass: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return regex.test(pass);
}
