# hasura-next-ts-boilerplate

Next.js Typescript boilerplate with Hasura GraphQL backend
This project extends [Next.js Typescript + Firebase example](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting-and-typescript) 
This sample SSR react application with Next.js, integrating [Hasura backend Typescript Boilerplate](https://github.com/hgiasac/hasura-typescript-boilerplate
)

## Prerequisites

- [React 16+](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Line Awesome](https://icons8.com/line-awesome)
- [Firebase Ecosystem](https://firebase.google.com/)

#### Install project:

```bash
npm install
```

#### Run Next.js development:

First of all, copy `src/app/sample.env.js` to `src/app/env.js`. Modify your configuration

```bash
npm run dev
```

#### Run Firebase locally for testing:

```
npm run serve
```

#### Deploy it to the cloud with Firebase:

```bash
npm run deploy
```

#### Clean dist folder

```bash
npm run clean
```

### Testing

Use [Cypress testing framework](https://www.cypress.io/)
Create new test files in `cypress/integration` folder
Run test command:

```bash
npm test 
# end to end test
npm run cy:open
```

## Important

- The empty `placeholder.html` file is so Firebase Hosting does not error on an empty `public/` folder and still hosts at the Firebase project URL.
- `firebase.json` outlines the catchall rewrite rule for our Cloud Function.
- The [Firebase predeploy](https://firebase.google.com/docs/cli/#predeploy_and_postdeploy_hooks) hooks defined in `firebase.json` will handle linting and compiling of the next app and the functions sourceswhen `firebase deploy` is invoked. The only scripts you should need are `dev`, `clean` and `deploy`.
## Learning Resources
- https://github.com/piotrwitek/react-redux-typescript-guide
- https://www.tailwindtoolbox.com/

## Development tools
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
