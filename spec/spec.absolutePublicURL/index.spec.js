const { createBundler, createTester } = require('../utils');

const tester = createTester(__dirname);

describe('absolute publicURL', () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test('absolute publicURL', async () => {
    const publicURL = 'https://example.com';
    const option = Object.assign({}, tester.option, { publicURL });

    await createBundler(__dirname + '/index.html', option).bundle();

    const json = await tester.readManifest();

    expect(Object.keys(json)).toHaveLength(1);
    expect(json['index.html']).toBe(`${publicURL}/index.html`);
  });
});
