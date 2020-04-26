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

## Important

- The empty `placeholder.html` file is so Firebase Hosting does not error on an empty `public/` folder and still hosts at the Firebase project URL.
- `firebase.json` outlines the catchall rewrite rule for our Cloud Function.
- The [Firebase predeploy](https://firebase.google.com/docs/cli/#predeploy_and_postdeploy_hooks) hooks defined in `firebase.json` will handle linting and compiling of the next app and the functions sourceswhen `firebase deploy` is invoked. The only scripts you should need are `dev`, `clean` and `deploy`.
- Specifying [`"engines": {"node": "8"}`](package.json#L5-L7) in the `package.json` is required for firebase functions
  to be deployed on Node 8 rather than Node 6
  ([Firebase Blog Announcement](https://firebase.googleblog.com/2018/08/cloud-functions-for-firebase-config-node-8-timeout-memory-region.html))
  . This is matched in by specifying target as `es2017` in [`src/functions/tsconfig.json`](src/functions/tsconfig) so that typescript output somewhat compacter and moderner code.

## Learning Resources
- https://github.com/piotrwitek/react-redux-typescript-guide
- https://www.tailwindtoolbox.com/

## Development tools
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
