const { createBundler, createTester } = require('../utils');

const tester = createTester(__dirname);

describe('service worker file', () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test('dont include service worker file', async () => {
    await createBundler(__dirname + '/index.js', tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(1);
    expect(json['sw.js']).toBeFalsy();
  });
  
  test('include file that isnt a service worker but has similar name', async () => {
    await createBundler(__dirname + '/index.html', tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(2);
    expect(json['sw.js']).toBeTruthy();
  });

});
