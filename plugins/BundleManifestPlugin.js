const path = require('path');
const hasha = require('hasha');
const fs = require('fs');

module.exports = function (bundler) {
  const logger = bundler.logger;

  const readManifestJson = (path) => {
    if (!fs.existsSync(path)) {
      logger.status('✨', 'create manifest file');
      return {};
    };

    logger.status('🖊', 'update manifest file');

    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch(e) {
      logger.error('manifest file is invalid');
      throw e; 
    }
  };

  bundler.on('bundled', (bundle) => {
    const dir = path.dirname(bundle.name);

    logger.status('📦', 'PackageManifestPlugin');
    logger.status('📁', `     dir : ${dir}`);

    const f = bundle.name;
    const hash = hasha.fromFileSync(f, { algorithm: 'sha256' });
    const ext = path.extname(f);
    const basename = path.basename(f, ext);
    const hashFile = path.join(dir, `${basename}-${hash}${ext}`);

    logger.status('✓', `  bundle : ${bundle.name}`);
    logger.status('✓', `        => ${hashFile}`);    

    // create hash included bundle file
    fs.createReadStream(f).pipe(fs.createWriteStream(path.resolve(dir, hashFile)));

    const manifestPath = path.resolve(dir, 'parcel-manifest.json');

    logger.status('📄', `manifest : ${manifestPath}`);

    const manifestValue = readManifestJson(manifestPath);
    manifestValue[path.relative(dir, f)] = path.relative(dir, hashFile);

    fs.writeFileSync(manifestPath, JSON.stringify(manifestValue));
  });
};
