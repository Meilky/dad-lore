import type { VoidCallback } from "./types.ts";

class CallbackError extends Error {
    constructor(event: string, cause: any = undefined) {
        super(`Error while calling callback in event: ${event}`, { cause });

        this.name = "CallbackError";
    }
}

class EmitingErrors extends Error {
    protected errors: CallbackError[];

    constructor(event: string, errors: CallbackError[]) {
        super(`Couldn't fully emit in event: ${event}`);

        this.name = "EmitingErrors";
        this.errors = errors;
    }

    public getErrors(): CallbackError[] {
        return this.errors;
    }
}

export class EventEmitter<T extends { [K in keyof T]: any[] }> {
    protected listeners: Map<string, Set<VoidCallback<any>>>;

    constructor() {
        this.listeners = new Map();
    }

    public on<K extends Extract<keyof T, string>>(event: K, callback: VoidCallback<T[K]>): void {
        let listeners = this.listeners.get(event);

        if (!listeners) {
            const set: Set<VoidCallback<T[K]>> = new Set();

            this.listeners.set(event, set);

            listeners = set;
        }

        listeners.add(callback);
    }

    public off<K extends Extract<keyof T, string>>(event: K, callback: VoidCallback<T[K]>): void {
        const listeners = this.listeners.get(event);

        listeners?.delete(callback);

        if (listeners?.size === 0) {
            this.listeners.delete(event);
        }
    }

    public emit<K extends Extract<keyof T, string>>(event: K, ...args: T[K]): void {
        const listeners = this.listeners.get(event);

        if (listeners === undefined) return;

        const errors = [];

        for (const callback of listeners.values()) {
            try {
                callback(...args);
            } catch (error) {
                errors.push(new CallbackError(event, error));
            }
        }

        if (errors.length > 0) {
            throw new EmitingErrors(event, errors);
        }
    }
}
