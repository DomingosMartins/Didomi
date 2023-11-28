# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

## What Questions I would have asked before start the User Storie

- Do we need to persist data!
- What types of errors should we show to the user?
- Do we need to support multiple languages?
- Should we add accessibility?
- Do we need to log any User/browser metrics like clicks or console errors in any service?
- Should we add trace ids to the requests?

## Things I would have done with more time

- Integration test with playwright
- Complete the Unit tests for all the code/files
- Add support to mobile viewport
- Break the code into smaller pices and move some of the logic into hooks
- handle small edge cases like errors and loading states
