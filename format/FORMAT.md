# Image format conversion
To convert the `.ppm` files to more common image formats, do the following:

## Setup
In this directory:

1. Install [Docker](https://www.docker.com/)
2. Build the converter image:
```zsh
docker build . -t ray-tracer-format -f format.Dockerfile
```
3. Create a converter container and run it interactively:
```zsh
docker run -v "$(pwd)"/../:/source/ray-tracer \
    --name ray-tracer-format-container \
    -it ray-tracer-format
```
4. Restart and attach to the converter container at a later point:
```zsh
docker start -ai ray-tracer-format-container
```

## GIF conversion
1. In the running docker container, generate a `.gif` from all files in `build/artifacts/<example-name>/ppm/animation`:
```zsh
./format/format.sh <example-name>
```
2. Find the animation in `build/artifacts/<example-name>/gif/<example-name>.gif`

## PNG conversion
1. In the running docker container, generate a `.png` from a single file in `build/artifacts/<example-name>/ppm/`:
```zsh
./format/format.sh <example-name> -t highres
```
2. Find the high resolution image in `build/artifacts/<example-name>/png/<example-name>.png`
