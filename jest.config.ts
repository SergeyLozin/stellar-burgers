/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Используем ts-jest для транспиляции TypeScript
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx'
        }
      },
    ],
  },
  
  // Указываем среду выполнения (jsdom для React)
  testEnvironment: 'jsdom',
  
  // Включаем отчеты о покрытии кода
  collectCoverage: true,
  
  // Провайдер для сбора покрытия
  coverageProvider: 'v8',
  
  // Обработка CSS-модулей
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@utils/cookie$': '<rootDir>/src/utils/cookie.ts',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@ui$': '<rootDir>/src/components/ui/index.ts',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages/index.ts'
  },
  
  // Добавляем поддержку jsx
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  
  // Указываем расширения файлов
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Пути для игнорирования
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;