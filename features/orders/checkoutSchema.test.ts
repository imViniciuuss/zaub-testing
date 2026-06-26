import { describe, it, expect } from 'vitest';
import { checkoutSchema } from './checkoutSchema';

const validData = {
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Main Street',
};

describe('checkoutSchema', () => {
  it('accepts valid checkout data', () => {
    const result = checkoutSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 characters', () => {
    const result = checkoutSchema.safeParse({ ...validData, name: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = checkoutSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects address shorter than 5 characters', () => {
    const result = checkoutSchema.safeParse({ ...validData, address: 'abc' });
    expect(result.success).toBe(false);
  });
});