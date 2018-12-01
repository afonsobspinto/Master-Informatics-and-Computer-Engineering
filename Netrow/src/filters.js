export function getByTitle(list, keyword) {
  const search = keyword.trim().toLowerCase();
  if (!search.length) return list;
  return list.filter(item => item.title.toLowerCase().indexOf(search) > -1);
}

export function getByCategory(list, category) {
  if (category === "all") return list;
  return list.filter(
    item => item.category.toLowerCase() === category.toLowerCase()
  );
}

export function getInPriceRange(list, range) {
  return list.filter(item => item.price >= range[0] && item.price <= range[1]);
}
