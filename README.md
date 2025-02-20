<h1 align="center">
	Full stack BE framework agnostic monorepo template
</h1>

## What's the purpose of this project?

<strong>NB! This code is not production ready. Use at your own risk!</strong>

I created this template for 2 reasons. To serve as a learning example and reusable template for future projects.

The template allows to quickly get started with a monorepo full stack setup with a end-to-end typesafe experience

Todo app was chosen as an example since it was easy to set up.

The project is supposed to demonstrate a solution that is fit for larger teams and allows for easy scalability in the long run.

While the project has a node backend the solution will work with any backend technology as long as openapi schema is generated.


## Why pandaCSS over tailwind ?

There are lots of reason why I prefer pandaCSS over tailwind

[Check out this link to learn more](https://www.perplexity.ai/search/create-a-detailed-summary-why-bWymfvygQ2K60ODCV6j3_Q)

## Highlights

- React router 7 framework setup, supports SSR
- Generates Business types, react queries and msw mocks from openapi schema(No need to lock BE into node framework to provide typesafe experience)
- Monorepo setup with global configurations
- Design system setup with panda css
- Radix theme tokens and components
- Accessibility handled with react-aria hooks and floating ui
- Panda extendable preset as a package
- Optimized bundles
- vitest setup
- 90% test coverage
- Modern and effective form validation library(react-hook-form & zod schema validation)
- No zustand, redux global store setup due to react query cache
- lucide-react icons

## Setup

### Prerequisites

- Node version --lts
- yarn
- docker cli or docker desktop

```bash
yarn install
```
```bash
docker compose up
```
```bash
yarn build
```
```bash
yarn start
```
```bash
yarn test
```

## Next steps

- More test coverage and refactor existing tests
- Add BE tests & cypress FE e2e tests
- Add comments to document the code
- Implement all the variants for design system components
- Improve accessibility and focusing logic
- Make use of colorPalette in design system components
- SSR does not fully work yet. Should make use of React router framework loaders
- Revisit eslint config and rules.
- Optimize production bundles
- Add authentication and authorization
- Add exception filters
- Add more BE security
