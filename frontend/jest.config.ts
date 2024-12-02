const config = {
  testEnvironment: "jsdom", // Define o ambiente para simular um navegador
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Ignora importações de arquivos CSS/SCSS
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Configurações adicionais de ambiente
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Usa ts-jest para transformar arquivos TypeScript
  },
  testRegex: ".*\\.test\\.tsx?$", // Busca por arquivos de teste com extensão .test.tsx ou .test.ts
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Extensões suportadas
};

export default config;
