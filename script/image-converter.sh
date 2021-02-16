#!/bin/bash

while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--outtype) outtype="$2"; shift
        shift ;;
        -i|--intype) intype="$2"; shift
        shift ;;
        *) path="$1"; shift ;;
    esac
done

intype=${intype:-'ppm'}
indir=$path/$intype
outtype=${outtype:-'gif'}
outdir=$path/$outtype

if [ "$outtype" == "gif" ];then
    mkdir -p $outdir
    outname=$(basename $path)
    convert -delay 2 $indir/*.$intype -loop 0 $outdir/$outname.$outtype
elif [ "$outtype" == "png" ];then
    mkdir -p $outdir
    count=$(find $path -maxdepth 1 -type f -name '*.ppm' |wc -l)
    i=0
    echo "Converting: 0/$count"
    for file in $indir/*.$intype; do
        i=$(expr $i + 1)
        echo -e "\e[1A\e[KConverting: $i/$count"
        inname=`basename "$file"`
        outname="${inname%.*}"
        convert $file $outdir/$outname.$outtype
    done
else
    echo "Out type not supported: $outtype"
fi
