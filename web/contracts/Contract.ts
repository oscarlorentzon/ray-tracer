export interface SizeContract {
    width: number;
    height: number;
}

export interface Coord2DContract {
    x: number;
    y: number;
}

export interface SphereContract {
    position: Coord2DContract;
}

export type InstanceContract =
    | SphereContract

export type ObjectType =
    | 'sphere';

export interface ObjectContract {
    type: ObjectType;
    instance: InstanceContract;
}

export interface ObjectsContract {
    objects: Array<ObjectContract>;
}

export interface PixelRowContract {
    buffer: ArrayBuffer;
    y: number;
}
