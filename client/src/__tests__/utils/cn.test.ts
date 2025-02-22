import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('base-class', 'additional-class', { 'conditional-class': true });
    expect(result).toContain('base-class');
    expect(result).toContain('additional-class');
    expect(result).toContain('conditional-class');
  });

  it('handles conditional classes', () => {
    const result = cn('base', { 'hidden': false, 'visible': true });
    expect(result).not.toContain('hidden');
    expect(result).toContain('visible');
  });
}); 