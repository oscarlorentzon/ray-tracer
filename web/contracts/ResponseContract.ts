import { PixelRowContract } from './Contract.js';

export interface PixelRowResponseContract {
    pixelRow: PixelRowContract;
}

export type ResponseParams =
    | PixelRowResponseContract;

export type ResponseType =
    | 'pixelrow';

export interface ResponseContract {
    params: ResponseParams;
    type: ResponseType;
}
