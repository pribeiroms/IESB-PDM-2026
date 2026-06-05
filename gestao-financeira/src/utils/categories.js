export const customCategoryPalette = [
  "#B565D9",
  "#D96BA8",
  "#8E6AD8",
  "#5F6FD6",
  "#2FA7C9",
  "#C85F8E"
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
