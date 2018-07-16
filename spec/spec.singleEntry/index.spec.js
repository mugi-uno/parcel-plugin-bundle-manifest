const { createBundler, createTester } = require('../utils');

const tester = createTester(__dirname);

describe('single entry file', () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test('html', async () => {
    await createBundler(__dirname + '/index.html', tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(1);
    expect(json['index.html']).toBeTruthy();
  });
  
  test('javascript', async () => {
    await createBundler(__dirname + '/script.js', tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(1);
    expect(json['script.js']).toBeTruthy();
  });

  test('css', async () => {
    await createBundler(__dirname + '/style.css', tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(1);
    expect(json['style.css']).toBeTruthy();
  });  
});
