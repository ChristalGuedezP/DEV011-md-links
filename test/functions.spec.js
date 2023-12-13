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