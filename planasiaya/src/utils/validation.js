// src/utils/validation.js
export function sanitizeText(text, { maxLength = 500 } = {}) {
  if (!text) return "";

  // Convertir a string, recortar espacios
  let clean = String(text).trim();

  // Quitar caracteres de control raros (saltos de línea se mantienen)
  clean = clean.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");

  // Limitar longitud
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }

  return clean;
}

export function isNonEmpty(text) {
  return sanitizeText(text).length > 0;
}
