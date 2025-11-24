/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Italian fiscal code (Codice Fiscale)
 */
export function isValidFiscalCode(code: string): boolean {
  const fiscalCodeRegex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
  return fiscalCodeRegex.test(code);
}

/**
 * Validate Italian VAT number (Partita IVA)
 */
export function isValidVatNumber(vat: string): boolean {
  const vatRegex = /^\d{11}$/;
  return vatRegex.test(vat);
}

/**
 * Validate Italian phone number
 */
export function isValidItalianPhone(phone: string): boolean {
  const phoneRegex = /^(\+39)?\s?3\d{2}\s?\d{6,7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}
