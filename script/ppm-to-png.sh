#!/bin/bash

mkdir -p $1/png
count=$(find $1 -maxdepth 1 -type f -name '*.ppm' |wc -l)

echo "Converting: 0/$count"
i=0
for file in $1/*.ppm; do
    i=$(expr $i + 1)
    echo -e "\e[1A\e[KConverting: $i/$count"
    ppmname=`basename "$file"`
    name="${ppmname%.*}"
    convert $file $1/png/$name.png
done
