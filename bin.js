#!/usr/bin/env node
/* jshint esversion: 6 */

const { spawnSync } = require('child_process');
const dcraw = require('./');
const args = process.argv.slice(2);

try {
  spawnSync(dcraw, args, {
    stdio: 'inherit',
    encoding: 'buffer'
  });
} catch (e) {
  process.exitCode = 1;
}
