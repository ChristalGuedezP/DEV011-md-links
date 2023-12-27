const path = require('path');
const { isAbsolutePath, convertAbsolute, isValidMdFile, readFileContent, extractLinks } = require('../src/functions');

describe('isAbsolutePath', () => {
  test('should return true for absolute path', () => {
    expect(isAbsolutePath('/absolute/path')).toBe(true);
  });
  test('should return false for relative path', () => {
    expect(isAbsolutePath('relative/path')).toBe(false);
  });
});
describe('convertAbsolute', () => {
  test('should return the absolute path if it is already absolute', () => {
    const absolutePath = '/absolute/path';
    expect(convertAbsolute(absolutePath)).toBe(absolutePath);
  });
  test('should convert a relative path to absolute', () => {
    const relativePath = 'relative/path';
    const expectedPath = path.join(process.cwd(), relativePath);
    expect(convertAbsolute(relativePath)).toBe(expectedPath);
  });
});
describe('isValidMdFile', () => {
  test('should return true for a valid .md file', () => {
    const validMdFilePath = 'valid.md';
    expect(isValidMdFile(validMdFilePath)).toBe(true);
  });
  test('should return false for a non-Markdown file', () => {
    const nonMdFilePath = 'invalid.txt';
    expect(isValidMdFile(nonMdFilePath)).toBe(false);
  });
  describe('readFileContent', () => {
    test('should read content from an existing file', () => {
      const filePath = 'C:\\Users\\chris\\OneDrive\\Documentos\\DEV011-md-links\\src\\pruebas.md';
  
      return readFileContent(filePath).then(content => {
        const expectedContent = [
          '[Link Job Prep](https://laboratoria1.gitbook.io/jobprep-dev-es/ruta-a-busqueda-de-vacantes)',
          '[Google](https://google.com)',
          'Mi nombre es Christal',
          'Soy estudiante de Laboratoria （っ＾▿＾）',
          '[Link de node](https://nodejs.org/)',
        ];
  
        expectedContent.forEach(expectedLine => {
          expect(content).toContain(expectedLine);
        });
      }).catch(error => {
        console.error('Error during readFileContent test:', error);
        throw error;
      });
    });
  
    test('should reject with an error for a non-existing file', () => {
      const nonExistingFilePath = 'nonexistent.md';
  
      return expect(readFileContent(nonExistingFilePath)).rejects.toThrowError('ENOENT: no such file or directory');
    });
  });
 
});
