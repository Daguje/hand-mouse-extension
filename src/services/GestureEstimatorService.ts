import { IClassifier } from "@classifiers/types";

interface IGestureEstimatorService {
    gestureClassifier: IClassifier
}

export default class GestureEstimatorService {
    private gestureClassifier: IClassifier

    constructor({ gestureClassifier }: IGestureEstimatorService) {
        this.gestureClassifier = gestureClassifier
    }

    async train(data: unknown, labels: Array<unknown>) {
        return await this.gestureClassifier.fit(data, labels)
    }

    async predict(hand: unknown) {
        return await this.gestureClassifier.predict(hand)
    }
}