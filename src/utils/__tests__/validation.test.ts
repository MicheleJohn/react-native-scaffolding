import {
  isValidEmail,
  isValidFiscalCode,
  isValidItalianPhone,
  isValidVatNumber,
} from '../validation';

describe('validation utilities', () => {
  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });

  describe('isValidFiscalCode', () => {
    it('validates correct fiscal codes', () => {
      expect(isValidFiscalCode('RSSMRA80A01H501U')).toBe(true);
    });

    it('rejects invalid fiscal codes', () => {
      expect(isValidFiscalCode('INVALID')).toBe(false);
      expect(isValidFiscalCode('12345678901')).toBe(false);
    });
  });

  describe('isValidVatNumber', () => {
    it('validates correct VAT numbers', () => {
      expect(isValidVatNumber('12345678901')).toBe(true);
    });

    it('rejects invalid VAT numbers', () => {
      expect(isValidVatNumber('123')).toBe(false);
      expect(isValidVatNumber('123456789012')).toBe(false);
      expect(isValidVatNumber('ABCDEFGHIJK')).toBe(false);
    });
  });

  describe('isValidItalianPhone', () => {
    it('validates correct Italian phone numbers', () => {
      expect(isValidItalianPhone('3331234567')).toBe(true);
      expect(isValidItalianPhone('+393331234567')).toBe(true);
      expect(isValidItalianPhone('333 123 4567')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(isValidItalianPhone('123456')).toBe(false);
      expect(isValidItalianPhone('0612345678')).toBe(false);
    });
  });
});
