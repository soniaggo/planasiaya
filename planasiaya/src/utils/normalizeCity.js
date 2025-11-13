export const normalizeCity = (city) =>
  city
    ? city
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // quitar acentos
        .replace(/\s+/g, "-") // espacios → guiones
    : "";

// 🔹 Para mostrar bonito desde el slug
export const displayCityName = (slug) =>
  slug
    ? slug
        .replace(/-/g, " ") // guiones → espacios
        .replace(/\b\w/g, (c) => c.toUpperCase()) // primera letra mayúscula
    : "";

