<!-- Auto-generated guidance for AI coding agents working in this repo -->
# Copilot / AI Agent Instructions

**Project Overview:**
- **Stack:** Next.js (app/ routing, server components), React 18, Node.js test harness (Jest).
- **Purpose:** Starter repo and student-facing templates for coding lessons. Key runtime split: Next app (ESM/React) vs. test/student harness (CommonJS/Node).

**Where to look first:**
- `package.json`: scripts and dependencies (`next`, `react`, `monaco-editor`, `jest`).
- `app/`: Next.js app using the new `app/` directory. See `app/layout.js`, `app/page.js`, and `app/dashboard/page.js`.
- `components/Editor/MonacoEditor.js`: client-only editor (dynamic, `use client`) and contains starter text that points to the student files.
- `runner/student-templates/`: student-editable CommonJS modules (e.g. `madlib.js`, `highscore.js`). Tests import these directly.
- `runner/tests/`: Jest tests that validate student templates. Tests use `path.resolve` to require the templates.
- `runner/jest.config.cjs`: Jest config — tests matched with `**/runner/tests/**/*.test.js` and `testEnvironment: 'node'`.

**Key workflows / commands:**
- Local dev (Next app): `npm run dev` (runs `next dev`).
- Build and run production: `npm run build` then `npm run start`.
- Tests (primary harness): `npm test` → executes `jest --config runner/jest.config.cjs`.
- Alternative script (safe CI/local): `scripts/run_tests.sh` — installs deps and runs `npx jest --config runner/jest.config.cjs --runInBand`.

**Project-specific patterns & conventions:**
- Tests and student templates live under `runner/` and use CommonJS (`module.exports` / `require`). Keep student templates as CommonJS for compatibility.
- Jest runs in a Node environment; do not rely on browser-only globals inside `runner/*` code.
- Tests often create/remove `scores.json` in repo root (see `runner/tests/highscore.test.js`). Be careful when changing file paths or behavior that interacts with the filesystem.
- The Next app uses server components by default. Client-only UI (Monaco editor) uses `dynamic(..., { ssr: false })` and a `'use client'` component — edit with caution to avoid SSR issues.

**Common tasks & examples**
- Add a new student template:
  - Create `runner/student-templates/<name>.js` exporting functions with `module.exports = { ... }`.
  - Add tests in `runner/tests/<name>.test.js` using `const S = require(path.resolve(__dirname, '../student-templates/<name>.js'))`.
  - Run `npm test` or `scripts/run_tests.sh`.
- Update Monaco starter content: edit `components/Editor/MonacoEditor.js`. It includes the default starter code and a comment referencing the student template path.

**Integration and external deps to be aware of**
- `monaco-editor` is loaded client-side only; bundling and SSR must be avoided (the repo already uses dynamic import + `ssr: false`).
- `next@14` app uses modern Next features — prefer editing `app/` files instead of legacy `pages/`.
- Jest (`29.x`) + `babel-jest` used for tests; tests in `runner/tests` run under Node.

**Pitfalls & gotchas**
- Mixing ESM (Next app) and CommonJS (runner) — do not convert `runner` tests/templates to ESM without updating test loader and `require` calls.
- Tests assume working directory is repo root and may read/write `scores.json`. Use tests' `beforeEach`/`afterEach` patterns when modifying that behavior.
- `runner/jest.config.cjs` restricts tests to `runner/tests`; adding tests elsewhere requires updating `testMatch` or keeping them inside `runner/tests`.

**If you need to change tests or add CI**
- Keep `scripts/run_tests.sh` logic: it installs deps non-interactively and runs Jest `--runInBand` (important for filesystem tests).
- For CI, mirror `scripts/run_tests.sh` to ensure reproducible runs.
- For CI, mirror `scripts/run_tests.sh` to ensure reproducible runs.

**CI Example**
- Use GitHub Actions to run the existing test script. This workflow calls `scripts/run_tests.sh` (which installs dependencies non-interactively and runs Jest with `--runInBand` — important for tests that touch the filesystem).

Example workflow (save as `.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install and run tests
        run: |
          chmod +x scripts/run_tests.sh || true
          ./scripts/run_tests.sh
```

Notes:
- Keep `scripts/run_tests.sh` as the single source of truth for CI test steps — it already sets `--runInBand` and installs deps.
- Use Node 18+ to match local development. The `cache: 'npm'` option speeds repeated runs.

**Reviewer Checklist (when changing tests or student templates)**
- **Run tests locally:** `npm install` then `npm test` (or `./scripts/run_tests.sh`).
- **CommonJS compatibility:** Ensure new/modified files under `runner/student-templates/` use `module.exports` / `require` — tests load them with `path.resolve`.
- **Filesystem side-effects:** If tests or templates read/write `scores.json`, confirm tests clean up in `beforeEach`/`afterEach` (see `runner/tests/highscore.test.js`).
- **Keep Jest scope:** If adding tests outside `runner/tests`, update `runner/jest.config.cjs.testMatch` accordingly; prefer keeping tests in `runner/tests`.
- **Avoid SSR-only changes in runner code:** `runner/*` runs in Node — do not use browser globals or ESM-only features unless tests are updated.

If anything in this doc is unclear or you'd like more examples (e.g., a CI job that uploads artifacts, or converting a student template to ESM with test changes), tell me which section to expand.
