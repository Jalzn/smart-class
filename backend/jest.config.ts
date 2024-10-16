import { type JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src/**'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
}

export default config
