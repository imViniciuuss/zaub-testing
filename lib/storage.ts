const isBrowser = typeof window !== 'undefined';

export function loadFromStorage<T>(key: string): T | undefined {
    if (!isBrowser) return undefined;

    try {
        const raw = localStorage.getItem(key);
        if (!raw) return undefined;
        return JSON.parse(raw) as T;
    } catch {
        return undefined;
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    if (!isBrowser) return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
}