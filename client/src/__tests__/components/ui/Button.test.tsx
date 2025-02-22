import { describe, it, expect, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';
import type { RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button', () => {
    let rendered: RenderResult;

    it('handles click events', async () => {
        const handleClick = jest.fn();
        rendered = render(<Button onClick={handleClick}>Click me</Button>);
        const button = rendered.getByRole('button', { name: /click me/i });
        await userEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
}); 