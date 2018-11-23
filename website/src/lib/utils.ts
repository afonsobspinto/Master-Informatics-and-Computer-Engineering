
// if any value of the object == null (weak comparison)
export function isObjectNotFullySet(o: Object) {
    return Object.entries(o)
        .some(e => !e[1])
}