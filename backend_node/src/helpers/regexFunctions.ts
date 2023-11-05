export function isValidImageURL(url) {
  const imageExtensions = /\.(jpeg|jpg|gif|png|bmp|svg|webp)$/i;
  return imageExtensions.test(url);
}
