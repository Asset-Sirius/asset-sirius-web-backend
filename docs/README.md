# Backend Docs

This folder contains design and operational notes for the auth backend module.

Key files:
- specs/: design specification written during planning

Running locally:
- Ensure you have a JWT_SECRET in environment
- npm install
- npm run dev
- npm test

Security note: current frontend plan stores JWT in sessionStorage. This is vulnerable to XSS. Recommend HttpOnly cookies for production.
