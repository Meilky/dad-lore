import type { VoidCallback } from "./types.ts";

export class Dispatcher<T> {
    private _callbacks: Set<VoidCallback<[T]>> = new Set();

    public register(callback: VoidCallback<[T]>): void {
        this._callbacks.add(callback);
    }

    public unregister(callback: VoidCallback<[T]>): void {
        this._callbacks.delete(callback);
    }

    public dispatch(data: T): void {
        for (const callback of this._callbacks) {
            Promise.resolve(callback(data));
        }
    }
}
