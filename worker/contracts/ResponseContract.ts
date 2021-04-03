export interface RowResponseContract {
    buffer: ArrayBuffer;
    y: number;
}

export interface ResponseContract {
    params: RowResponseContract;
    type: ResponseType;
}

export type ResponseType =
    | 'pixelrow';
