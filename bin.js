#!/usr/bin/env node
/* jshint esversion: 6 */

const { spawnSync } = require('child_process');
const dcraw = require('./');
const args = process.argv.slice(2);

const { status } = spawnSync(dcraw, args, {
  stdio: 'inherit',
  encoding: 'buffer'
});

process.exitCode = status;
