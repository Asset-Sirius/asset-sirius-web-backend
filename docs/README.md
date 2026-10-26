# Backend Docs

This folder contains design and operational notes for the auth backend module.

Key files:
- specs/: design specification written during planning

Running locally:
- npm install
- npm run dev
- npm test

Security note: storing sensitive data in sessionStorage is vulnerable to XSS. Recommend HttpOnly cookies for production.
