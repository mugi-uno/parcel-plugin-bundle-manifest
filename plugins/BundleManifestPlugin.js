const path = require('path');
const hasha = require('hasha');
const fs = require('fs');
const logger = require('parcel-bundler/src/Logger');

module.exports = function (bundler) {

  /**
   * Read the paths already registered within the manifest.json
   * @param {string} path 
   * @returns {Object}
   */
  const readManifestJson = (path) => {
    if (!fs.existsSync(path)) {
      logger.log('✨ create manifest file');
      return {};
    };

    logger.log('🖊 update manifest file');

    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
      logger.error('manifest file is invalid');
      throw e;
    }
  };

  /**
   * Feed the manifest exploring childBundles recursively
   * @param {Bundle} bundle 
   * @param {Object} manifestValue 
   * @param {string} publicURL 
   */
  const feedManifestValue = (bundle, manifestValue, publicURL) => {
    let output = path.join(publicURL, path.basename(bundle.name));
    let input = bundle.entryAsset ? bundle.entryAsset.basename : bundle.assets.values().next().value.basename;
    if (!manifestValue[input]) {
      manifestValue[input] = output;
      logger.log(`✓  bundle : ${input} => ${output}`);
    }
    bundle.childBundles.forEach(function (bundle) {
      feedManifestValue(bundle, manifestValue, publicURL);
    });
  }

  bundler.on('bundled', (bundle) => {
    const dir = bundle.entryAsset.options.outDir;
    const publicURL = bundle.entryAsset.options.publicURL;

    const manifestPath = path.resolve(dir, 'parcel-manifest.json');
    const manifestValue = {}

    logger.log('📦 PackageManifestPlugin');
    feedManifestValue(bundle, manifestValue, publicURL);
    logger.success(`📄 manifest : ${manifestPath}`);

    const oldManifestValue = readManifestJson(manifestPath);
    const combinedManifest = Object.assign(oldManifestValue, manifestValue)
    fs.writeFileSync(manifestPath, JSON.stringify(combinedManifest, null, 2));
  });
};