/* jshint node: true, esversion: 6 */
const assert = require('assert');
const path = require('path');
const { execFileSync } = require('child_process');

const pkg = require('./package.json');
const lib = require('./');
const bin = pkg.bin.dcrawr;

let exitCode = 0;

function test(actual, expected, message) {
  try {
    assert.strictEqual(expected, actual);
  } catch (e) {
    console.error('× - %s: expected "%s" to equal "%s"', message, actual, expected);
    exitCode += 1;
    return;
  }

  console.log('√ - %s', message);
}

function result(func) {
  let res;

  try {
    res = func();
  } catch (e) {
    res = e;
  }

  return {
    status: res.status || 0,
    text: (res.stdout.toString() + res.stderr.toString()).trim()
  };
}

test(typeof lib, 'string', 'the library exports a string');

const { text: libout, status: libstatus } = result(() => execFileSync(lib));
const { text: binout, status: binstatus } = result(() => execFileSync(process.execPath, [bin]));

test(libstatus, 1, 'lib exited with error code 1');
test(/Raw photo decoder/.test(libout.toString()), true, 'lib printed help content');
test(binstatus, 1, 'bin exited with error code 1');
test(/Raw photo decoder/.test(binout.toString()), true, 'bin printed help content');
test(libout.toString(), binout.toString(), 'the bin and lib print the same help text');

process.exit(exitCode);
