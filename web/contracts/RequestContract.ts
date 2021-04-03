export interface SizeRequestContract {
    width: number;
    height: number;
}

export interface RenderRequestContract {
    size: SizeRequestContract;
}

export interface RequestContract {
    params: RenderRequestContract;
    type: RequestType;
}

export type RequestType =
    | 'render';
