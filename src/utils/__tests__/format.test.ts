import { capitalize, formatCurrency, formatDate, truncate } from '../format';

describe('format utilities', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date, 'it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      expect(formatted).toMatch(/15/);
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly for EUR', () => {
      const formatted = formatCurrency(1234.56, 'EUR', 'it-IT');
      expect(formatted).toContain('1');
      expect(formatted).toContain('234');
      expect(formatted).toContain('56');
    });
  });

  describe('truncate', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that should be truncated';
      const truncated = truncate(text, 20);
      expect(truncated.length).toBeLessThanOrEqual(20);
      expect(truncated).toContain('...');
    });

    it('does not truncate short text', () => {
      const text = 'Short text';
      const truncated = truncate(text, 20);
      expect(truncated).toBe(text);
      expect(truncated).not.toContain('...');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('tEsT')).toBe('Test');
    });
  });
});
