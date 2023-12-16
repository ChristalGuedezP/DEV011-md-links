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
describe('extractLinks', () => {
  const sampleContent = `
    [Link 1](https://example.com/link1)
    [Link 2](https://example.com/link2)
    [Invalid Link](https://invalid-url)
  `;

  test('should extract links without validation', async () => {
    const links = await extractLinks(sampleContent, 'sample.md');
    console.log('Links without validation:', links);
    expect(links).toEqual([
      { text: 'Link 1', href: 'https://example.com/link1', file: 'sample.md' },
      { text: 'Link 2', href: 'https://example.com/link2', file: 'sample.md' },
      { text: 'Invalid Link', href: 'https://invalid-url', file: 'sample.md' },
    ]);
  });
});
