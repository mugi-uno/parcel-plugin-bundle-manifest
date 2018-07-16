Parcel plugin for generating an bundle manifest.

![](https://travis-ci.org/mugi-uno/parcel-plugin-bundle-manifest.svg?branch=master)

Usage
========

## install

```
npm install --save-dev parcel-plugin-bundle-manifest
```

## build

```
parcel build entry.js
```

## Output

Output a `parcel-manifest.json` file to the same directory as the bundle file.

- dist/entry.html
- dist/{hash}.js
- dist/{hash}.css
- dist/parcel-manifest.json

The Manifest will look like this : 

```json
{
  "index.html": "/dist/index.html",
  "index.js": "/dist/5f0796534fe2892712053b3a035f585b.js",
  "main.scss": "/dist/5f0796534fe2892712053b3a035f585b.css"
}
```

License
========

MIT
