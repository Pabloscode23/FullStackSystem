import { jest } from '@jest/globals';

jest.mock('@/config/firebase', () => ({
    auth: jest.fn(),
    db: jest.fn(),
    default: {
        auth: jest.fn(),
        db: jest.fn()
    }
})); 