/**
 *  This function checks if an event can execute after a certain time in miliseconds
 * @param {number} delay delay in miliseconds
 */
export function checkEventCanExecute(delay: number) {
    let lastEvent = Date.now()

    return {
        shouldExecute() {
            const result = (Date.now() - lastEvent) > delay

            if(result) lastEvent = Date.now()

            return result
        }
    }
}