import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock environment variables
Object.defineProperty(process.env, 'NODE_ENV', { value: 'test' });
Object.defineProperty(process.env, 'VITE_FIREBASE_API_KEY', { value: 'mock-api-key' });
Object.defineProperty(process.env, 'VITE_FIREBASE_AUTH_DOMAIN', { value: 'mock-auth-domain' });
Object.defineProperty(process.env, 'VITE_FIREBASE_PROJECT_ID', { value: 'mock-project-id' });
Object.defineProperty(process.env, 'VITE_FIREBASE_STORAGE_BUCKET', { value: 'mock-storage-bucket' });
Object.defineProperty(process.env, 'VITE_FIREBASE_MESSAGING_SENDER_ID', { value: 'mock-sender-id' });
Object.defineProperty(process.env, 'VITE_FIREBASE_APP_ID', { value: 'mock-app-id' });

// Mock Firebase
jest.mock('@/config/firebase', () => ({
    auth: jest.fn(),
    db: jest.fn(),
    default: {
        auth: jest.fn(),
        db: jest.fn()
    }
})); 