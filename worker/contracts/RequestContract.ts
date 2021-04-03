export interface SizeRequestContract {
    size: {
        width: number;
        height: number;
    }
}

export interface RequestContract {
    params: SizeRequestContract;
    type: RequestType;
}

export type RequestType =
    | 'render';
