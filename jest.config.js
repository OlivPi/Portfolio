const nextJest = require('next/jest')

// On indique le répertoire racine de application Next.js
const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  // Fichiers à exécuter avant les tests pour configurer l'environnement
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Environnement de test
  testEnvironment: 'jest-environment-jsdom',

  // Configuration du module alias pour Jest (correspond à tsconfig paths)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@testing-library/jest-dom$':
      '<rootDir>/node_modules/@testing-library/jest-dom',
  },

  // Transformation des fichiers TS/TSX via ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Ignorer les transformations pour ces fichiers
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Nettoyer les mocks entre chaque test
  resetMocks: true,
}

module.exports = createJestConfig(customJestConfig)
