#!/usr/bin/env bash
set -e
npm install --no-audit --no-fund
npx jest --config runner/jest.config.cjs --runInBand
