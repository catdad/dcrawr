# dcrawr

The extra R is becuase it's extra cute 😺

[![travis][travis.svg]][travis.link]
[![appveyor][appveyor.svg]][appveyor.link]
[![npm-downloads][npm-downloads.svg]][npm.link]
[![npm-version][npm-version.svg]][npm.link]
[![dm-david][dm-david.svg]][dm-david.link]

[travis.svg]: https://travis-ci.org/catdad/dcrawr.svg?branch=master
[travis.link]: https://travis-ci.org/catdad/dcrawr
[appveyor.svg]: https://ci.appveyor.com/api/projects/status/github/catdad/dcrawr?branch=master&svg=true
[appveyor.link]: https://ci.appveyor.com/project/catdad/dcrawr
[npm-downloads.svg]: https://img.shields.io/npm/dm/dcrawr.svg
[npm.link]: https://www.npmjs.com/package/dcrawr
[npm-version.svg]: https://img.shields.io/npm/v/dcrawr.svg
[dm-david.svg]: https://david-dm.org/catdad/dcrawr.svg
[dm-david.link]: https://david-dm.org/catdad/dcrawr

## CLI

This module can be used as a CLI, with all of the exact same functionality as DCRAW itself. You can either install it globally:

```bash
npm install --global dcrawr

# print help
dcrawr

# convert an image
dcrawr -w -W IMG_1234.CR2
```

Or you can use it directly though `npx`:

```bash
npx dcrawr -w -W IMG_1234.CR2
```

## API

This module only exposes the path to the correct DCRAW binary, which you can use directly through `child_process`:

```javascript
const dcraw = require('dcrawr');
const { promisify } = require('util');
const { execFile } = require('child_process');
const fs = require('fs');

// -c will write the data to stdout
promisify(execFile)(dcraw, ['-c', 'my-image.dng'], {
  // hide the extra window on Windows
  windowsHide: true,
  // we want the raw data, not a string
  encoding: 'buffer',
  // 8-bit PPMs are roughly 3x bigger than the original raw file
  // so you should set this number fairly high
  maxBuffer: 1024 * 1024 * 100
})
  .then(result => {
    // don't use the sync method... you get the idea though
    fs.writeFileSync('./my-image.ppm', result.stdout);
  }).catch(err => {
    console.error(err);
  });
```
