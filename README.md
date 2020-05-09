# hasura-next-ts-boilerplate

Next.js Typescript boilerplate with Hasura GraphQL backend
This project extends [Next.js Typescript + Firebase example](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting-and-typescript) 
This sample SSR react application with Next.js, integrating [Hasura backend Typescript Boilerplate](https://github.com/hgiasac/hasura-typescript-boilerplate
)

## Prerequisites

- [React 16+](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase Ecosystem](https://firebase.google.com/)

#### Install project:

```bash
npm install
```

#### Run Next.js development:

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
