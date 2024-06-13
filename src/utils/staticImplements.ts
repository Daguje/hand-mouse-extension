/**
 *  This function sets an interface for implementing static methods on classes
 * @returns {constructor} The type of the constructor.
 */
export function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}