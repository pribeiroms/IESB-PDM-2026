export const customCategoryPalette = [
  "#7DB7A8",
  "#D08C60",
  "#7F9FD3",
  "#C786B8",
  "#9FA85C",
  "#C36B7D"
];

export function getCategoryConfig(category) {
  return (
    category ?? {
      icon: "label",
      background: customCategoryPalette[0],
      name: "unknown",
      displayName: "Categoria"
    }
  );
}

export function createCategoryKey(displayName, categories = []) {
  const normalized = displayName
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const baseKey = normalized || `categoria-${Date.now()}`;
  const existingKeys = new Set(categories.map((category) => category.name));

  if (!existingKeys.has(baseKey)) {
    return baseKey;
  }

  let index = 2;
  while (existingKeys.has(`${baseKey}-${index}`)) {
    index++;
  }

  return `${baseKey}-${index}`;
}
