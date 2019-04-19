#!/usr/bin/env node
/* jshint esversion: 6, node: true */

const assert = require('assert');
const { spawnSync } = require('child_process');
const dcraw = require('./');

try {
  const { stdout } = spawnSync(dcraw, []);
  assert.strictEqual(stdout.toString().includes('Raw photo decoder "dcraw"'), true);
} catch (e) {
  console.error('dcrawr is not supported on your operating system');
  process.exit(1);
}
