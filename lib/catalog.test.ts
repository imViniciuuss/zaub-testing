import { describe, it, expect } from 'vitest';
import { CATALOG_PAGE_SIZE, getSkip, getPageCount } from './catalog';

describe('catalog helpers', () => {
  it('getSkip returns correct offset for page', () => {
    expect(getSkip(1)).toBe(0);
    expect(getSkip(2)).toBe(CATALOG_PAGE_SIZE);
    expect(getSkip(3)).toBe(CATALOG_PAGE_SIZE * 2);
  });

  it('getPageCount returns at least 1 page', () => {
    expect(getPageCount(0)).toBe(1);
    expect(getPageCount(1)).toBe(1);
  });

  it('getPageCount calculates pages from total', () => {
    expect(getPageCount(12)).toBe(1);
    expect(getPageCount(13)).toBe(2);
    expect(getPageCount(24)).toBe(2);
    expect(getPageCount(25)).toBe(3);
  });
});