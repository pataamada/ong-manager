/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx|js|jsx|mjs)$": ["ts-jest", { useESM: true }], // Define o `useESM` diretamente no transform
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Trata arquivos TypeScript como módulos ESM
  transformIgnorePatterns: [
    "/node_modules/(?!(next-safe-action|next|other-esm-module)/)", // Inclui dependências específicas para transformação
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeia o alias @ para o diretório src
  },
};
