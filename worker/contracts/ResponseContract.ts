export interface RowResponseContract {
    buffer: ArrayBuffer;
    row: number;
}

export interface ResponseContract {
    params: RowResponseContract;
    type: ResponseType;
}

export type ResponseType =
    | 'row';
