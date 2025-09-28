export const normalizeCity = (city) =>
  city
    ? city
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // quitar acentos
        .replace(/\s+/g, "-") // espacios → guiones
    : "";
