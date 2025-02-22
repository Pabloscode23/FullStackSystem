import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json'
        }]
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/__helpers__/',
        '/__mocks__/',
        '/setup.ts'
    ],
    moduleDirectories: ['node_modules', 'src'],
    transformIgnorePatterns: [
        'node_modules/(?!(firebase|@firebase)/)'
    ],
    testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
};

export default config; 