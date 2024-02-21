function checkEventCanExecute(delay: number) {
    let lastEvent = Date.now()

    return {
        shouldExecute() {
            const result = (Date.now() - lastEvent) > delay

            if(result) lastEvent = Date.now()

            return result
        }
    }
}

export {
    checkEventCanExecute
}