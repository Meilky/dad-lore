import { EventEmitter } from "./event-emitter";

export class Store<K, T, E extends { [KE in keyof E]: any[] }> extends EventEmitter<E> {
    protected _indexing: Map<K, T> = new Map();

    constructor() {
        super();
    }

    public [Symbol.iterator](): IterableIterator<[K, T]> {
        return this._indexing[Symbol.iterator]();
    }

    public entries(): IterableIterator<[K, T]> {
        return this._indexing.entries();
    }

    public keys(): IterableIterator<K> {
        return this._indexing.keys();
    }

    public values(): IterableIterator<T> {
        return this._indexing.values();
    }

    public get(key: K): T | undefined {
        return this._indexing.get(key);
    }

    public has(key: K): boolean {
        return this._indexing.has(key);
    }
}
