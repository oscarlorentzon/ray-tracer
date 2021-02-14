# Ray tracer

## Prerequisites
- You have [Node](https://nodejs.org) installed at v15.8.0+ and [Yarn](https://classic.yarnpkg.com) at v1.2.0+.
- You are familiar with [Git](https://git-scm.com/).

## Development Workflow
After cloning `ray-tracer`, run `yarn` to fetch its dependencies. Then, you can run several commands:

- `yarn test` runs the complete test suite.
- `yarn build` creates a `build` folder with the transpiled library.
- `yarn build-examples` creates a `build` folder and tranpiles the examples.
- `yarn node-esm build/examples/<example-name>.example.js` runs one of the examples.
- Render artifacts are found in `build/artifacts`.

## Documentation
The ray tracer uses [right-handed coordinates](https://en.wikipedia.org/wiki/Right-hand_rule) and counter-clockwise rotation around the axis. Matrices are row-major.

## Image format conversion
To convert from `.ppm` to `.png` do the following:

1. Install [Docker](https://www.docker.com/).
2. Build the converter image:
```bash
docker build . -t ray-tracer-png -f png.Dockerfile
```
3. Create a ray-tracer-png container and run it interactively:
```bash
docker run -v "$(pwd)":/source/ray-tracer --name ray-tracer-png-container -it ray-tracer-png
```
4. In the running docker container, convert all files in `path/to/my/artifacts`:
```bash
./script/ppm-to-png.sh ./path/to/my/artifacts
```
5. Find the files in `path/to/my/artifacts/png`.
