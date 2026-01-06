// src/utils/categoryImageMap.js
const map = {
  "bento-cakes": "bento.jpg",
  "cupcakes": "cupcakes.jpg",
  "pancakes": "pancakes.jpg",
  "waffles": "waffles.jpg",
  "custom-cakes": "customcake.jpg",
  "cookies": "cookies.jpg",
  "pastries": "strawberry-pastry.jpg"

};

export default function getCategoryImage(category) {
  if (!category) return "/images/placeholder.jpg";
  if (category.image) return `/images/${category.image}`;
  const slug = (category.slug || category.name || "").toString().toLowerCase().trim();
  const filename = map[slug] || `${slug}.jpg`;
  return `/images/${filename}`;
}
