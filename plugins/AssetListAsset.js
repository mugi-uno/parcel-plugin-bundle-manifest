const Asset = require('parcel-bundler/src/Asset');
const logger = require('parcel-bundler/src/Logger');

class AssetListAsset extends Asset {
    constructor(name, pkg, options) {
        super(name, pkg, options);
    }

    collectDependencies() {
        this.ast.forEach(url => this.addURLDependency(url))
    }

    parse(code) {
        return code.split('\n').map(p => p.replace(/#.*/, '')).map(s => s.trim()).filter(Boolean);
    }
}

module.exports = AssetListAsset;