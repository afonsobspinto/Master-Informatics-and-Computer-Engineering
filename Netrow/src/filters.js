export function getByTitle(list, keyword) {
  const search = keyword.trim().toLowerCase();
  if (!search.length) return list;
  return list.filter(item => item.title.toLowerCase().indexOf(search) > -1);
}

export function getByCategory(list, category) {
  if (category === "all") return list;
  const cat = category.split("_");
  if (cat[0] === "cat") {
    return list.filter(
      item => item.category.toLowerCase() === cat[1].toLowerCase()
    );
  }
  return list.filter(
    item => item.subCategory.toLowerCase() === cat.toLowerCase()
  );
}

export function getInPriceRange(list, range) {
  return list.filter(item => item.price >= range[0] && item.price <= range[1]);
}
