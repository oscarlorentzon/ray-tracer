![Build workflow](https://github.com/oscarlorentzon/ray-tracer/workflows/Build/badge.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oscarlorentzon/ray-tracer/blob/master/LICENSE)

# Ray tracer

## Prerequisites
- You have [Node](https://nodejs.org) installed at v15.8.0+ and [Yarn](https://classic.yarnpkg.com) at v1.2.0+.
- You are familiar with [Git](https://git-scm.com/).

## Development Workflow
After cloning `ray-tracer`, run `yarn` to fetch its dependencies. Then, you can run several commands:

- `yarn test` runs the complete test suite.
- `yarn build` creates a `build` folder with the transpiled library.
- `yarn build-examples` creates a `build` folder and tranpiles the examples.
- `node build/examples/<example-name>.example.js` runs one of the examples.
- Render artifacts are written to `build/artifacts`.

## Documentation
The ray tracer uses [right-handed coordinates](https://en.wikipedia.org/wiki/Right-hand_rule) and [counter-clockwise](https://en.wikipedia.org/wiki/Clockwise) rotation around the axis. Matrices are [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order).

## Image format conversion
To convert mulitple `.ppm` to a `.gif` do the following:

### Setup
1. Install [Docker](https://www.docker.com/).
2. Build a converter image:
```bash
docker build . -t ray-tracer-converter -f converter.Dockerfile
```
3. Create a converter container and run it interactively:
```bash
docker run -v "$(pwd)":/source/ray-tracer --name ray-tracer-converter-container -it ray-tracer-converter
```
4. Restart and attach to the converter container at a later point:
```bash
docker start -ai ray-tracer-converter-container
```

### Conversion
1. In the running docker container, convert all files in `path/to/my/artifacts/<name>`:
```bash
./script/image-converter.sh ./path/to/my/artifacts/<name>
```
2. Find the files in `path/to/my/artifacts/<name>/gif/<name>.gif`.
