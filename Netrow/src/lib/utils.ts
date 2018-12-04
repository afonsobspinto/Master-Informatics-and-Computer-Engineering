

export function isAnyObjectEmpty(obj: Object): boolean {
    for (let k in obj) {
        if (! obj[k]) {
            return false;
        }
    }

    return true;
}