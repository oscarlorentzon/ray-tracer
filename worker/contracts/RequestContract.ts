export interface SizeRequestContract {
    size: {
        w: number;
        h: number;
    }
}

export interface RequestContract {
    params: SizeRequestContract;
    type: RequestType;
}

export type RequestType =
    | 'render';
