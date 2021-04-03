#!/bin/bash

NAME="$1"
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--type) type="$2"; shift
        shift ;;
        *) shift ;;
    esac
done

TYPE=${type:-"animation"}

CONVERTER="$(dirname "${BASH_SOURCE[0]}")/"
ARTIFACTS="$CONVERTER/../build/artifacts/"
EXAMPLE="$ARTIFACTS/$NAME"
PPM="$EXAMPLE/ppm/"

echo "Converting: $TYPE $NAME"
if [ "$TYPE" == "animation" ];then
    OUTTYPE="gif"
    OUTDIR="$EXAMPLE/$OUTTYPE"
    mkdir -p $OUTDIR
    INNAME="$PPM/animation/*.ppm"
    OUTNAME="$OUTDIR/$NAME.$OUTTYPE"
    convert -delay 2 $INNAME -loop 0 $OUTNAME
elif [ "$TYPE" == "highres" ];then
    OUTTYPE="png"
    OUTDIR="$EXAMPLE/$OUTTYPE"
    mkdir -p $OUTDIR
    INNAME="$PPM/$NAME.ppm"
    OUTNAME="$OUTDIR/${NAME%.*}.png"
    convert $INNAME $OUTNAME
else
    echo "Type not supported: $TYPE"
fi
