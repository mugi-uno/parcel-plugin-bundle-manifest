const { createBundler, createTester } = require('../utils');

const tester = createTester(__dirname);

describe('many files with the same filename', () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test('two files with the same filename', async () => {
    await createBundler(__dirname + '/index.html', tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(3);
    expect(json['index.html']).toBeTruthy();
    expect(json['script.js']).toBeTruthy();
    expect(json['sub/script.js']).toBeTruthy();
  });
});
