# CI/CD Pipeline

## Overview
This project uses GitHub Actions for continuous integration and deployment.

## Workflows

### CI Workflow (.github/workflows/ci.yml)
Runs on every push and pull request to `main` and `develop` branches.

**Steps:**
1. Type checking (TypeScript)
2. Linting (ESLint)
3. Tests (Vitest)
4. Build

### Deploy Workflow (.github/workflows/deploy.yml)
Runs on every push to `main` branch.

**Steps:**
1. Type checking
2. Linting
3. Tests
4. Build (with production env vars)
5. Deploy to Vercel

## Required Secrets

Add these secrets in GitHub repository settings:

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

## Local Testing

Run CI checks locally:

```bash
npm run type-check
npm run lint
npm run test
npm run build
```
