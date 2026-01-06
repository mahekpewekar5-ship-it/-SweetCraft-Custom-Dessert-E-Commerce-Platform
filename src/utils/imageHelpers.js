// src/utils/imageHelpers.js
export function productImagePath(product) {
  return product && product.image ? `/images/${product.image}` : `/images/placeholder.jpg`;
}
