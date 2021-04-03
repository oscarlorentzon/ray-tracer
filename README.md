![Build workflow](https://github.com/oscarlorentzon/ray-tracer/workflows/Build/badge.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oscarlorentzon/ray-tracer/blob/main/LICENSE)

# Ray tracer

## Samples
![clock](https://user-images.githubusercontent.com/2492302/111028115-d8f31400-83f4-11eb-9c31-7436a1124d30.gif)
![sphere3d](https://user-images.githubusercontent.com/2492302/111028020-21f69880-83f4-11eb-8040-5dd33221bb3b.gif)
![sphere-scene](https://user-images.githubusercontent.com/2492302/111028026-2e7af100-83f4-11eb-8943-1937f2ac188f.gif)
![plane](https://user-images.githubusercontent.com/2492302/111028031-35096880-83f4-11eb-9b12-327159d59e2f.gif)
![pattern](https://user-images.githubusercontent.com/2492302/111072852-b5a39400-84dc-11eb-8abf-5d3458299956.gif)

## Prerequisites
- You have [Node](https://nodejs.org) installed at v15.8.0+ and [Yarn](https://classic.yarnpkg.com) at v1.2.0+
- You are familiar with [Git](https://git-scm.com/)

## Development Workflow
After cloning `ray-tracer`, run `yarn install` to fetch its dependencies. Then, you can run several commands:

- `yarn test` runs the complete test suite
- `yarn build` creates a `build` folder and transpiles the library
- `yarn build-examples` creates a `build` folder and tranpiles the examples
- `yarn animate <animation-example-name>` generates an animation
  - Example: `yarn animate spheres`
- `yarn generate <highres-example-name>` generates a high resolution image
  - Example: `yarn generate pattern`
- Render artifacts are written to `build/artifacts`

## Web app

- `yarn build-docs` builds the web app
- `yarn start` starts the development server
- Navigate to `http://localhost:8000/docs`

## Documentation
The ray tracer uses [right-handed coordinates](https://en.wikipedia.org/wiki/Right-hand_rule) and [counter-clockwise](https://en.wikipedia.org/wiki/Clockwise) rotation around the axis. Matrices are [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order).

## Image format conversion
To convert the `.ppm` files to more common image formats, see [CONVERSION.md](./format/CONVERSION.md).
