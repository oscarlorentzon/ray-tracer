## Image format conversion
To convert the `.ppm` files to more common image formats, do the following:

### Setup
1. Install [Docker](https://www.docker.com/)
2. Build a converter image:
```zsh
docker build . -t ray-tracer-converter -f converter.Dockerfile
```
3. Create a converter container and run it interactively:
```zsh
docker run -v "$(pwd)":/source/ray-tracer \
    --name ray-tracer-converter-container \
    -it ray-tracer-converter
```
4. Restart and attach to the converter container at a later point:
```zsh
docker start -ai ray-tracer-converter-container
```

### GIF conversion
1. In the running docker container, generate a `.gif` from all files in `build/artifacts/<example-name>/ppm/animation`:
```zsh
./script/image-converter.sh <example-name>
```
2. Find the animation in `build/artifacts/<example-name>/gif/<example-name>.gif`

### PNG conversion
1. In the running docker container, generate a `.png` from a single file in `build/artifacts/<example-name>/ppm/`:
```zsh
./script/image-converter.sh <example-name> -t highres
```
2. Find the high resolution image in `build/artifacts/<example-name>/png/<example-name>.png`
