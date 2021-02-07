# Ray tracer

## Prerequisites
- You have [Node](https://nodejs.org) installed at v15.8.0+ and [Yarn](https://classic.yarnpkg.com) at v1.2.0+.
- You are familiar with [Git](https://git-scm.com/).

## Development Workflow
After cloning ray-tracer, run `yarn` to fetch its dependencies. Then, you can run several commands:

- `yarn test` runs the complete test suite.
- `yarn build` creates a `build` folder with the transpiled library.
- `yarn build-examples` creates a `build` folder and tranpiles the examples.
- `yarn node-esm build/examples/<example-name>.example.js` runs one of the examples.

## Documentation
The ray tracer uses [right-handed coordinates](https://en.wikipedia.org/wiki/Right-hand_rule).
