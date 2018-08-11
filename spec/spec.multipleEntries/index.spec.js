const { createBundler, createTester } = require('../utils');

const tester = createTester(__dirname);

describe('multiple entry file', () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test('html', async () => {
    await createBundler([__dirname + '/index.html', __dirname + '/index2.html'], tester.option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(2);
    expect(json['index.html']).toBeTruthy();
    expect(json['index2.html']).toBeTruthy();
  });
});
