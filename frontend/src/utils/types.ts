export type Callback<T extends unknown[], V> = (...args: T) => V;
export type VoidCallback<T extends unknown[]> = Callback<T, void | Promise<void>>;
