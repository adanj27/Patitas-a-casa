/* eslint-disable prefer-regex-literals */
export function isValidImageURL(url: string) {
  const imageExtensions = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;
  return imageExtensions.test(url);
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
