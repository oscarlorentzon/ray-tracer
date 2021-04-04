import {
    ObjectsContract,
    SizeContract,
} from './Contract';

export interface RenderRequestContract {
    size: SizeContract;
}

export interface ObjectsRequestContract {
    objects: ObjectsContract;
}

export type RequestParams =
    | RenderRequestContract
    | ObjectsRequestContract;

export type RequestType =
    | 'render'
    | 'objects';

export interface RequestContract {
    params: RequestParams;
    type: RequestType;
}
