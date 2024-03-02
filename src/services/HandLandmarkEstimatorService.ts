import { PixelInput } from "@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces";
import { IHandLandmarkDetector } from "../handLandmarkDetectors/types";

interface IHandLandmarkEstimatorServiceProps {
    handLandmarkDetector: IHandLandmarkDetector
}

export default class HandLandmarkEstimatorService {
    private handLandmarkDetector: IHandLandmarkDetector

    constructor({ handLandmarkDetector }: IHandLandmarkEstimatorServiceProps) {
        this.handLandmarkDetector = handLandmarkDetector
    }

    async estimateHands(img: PixelInput) {
        return await this.handLandmarkDetector.estimateHands(img)
    }

    normalize(hand: unknown, img: PixelInput) {
        return this.handLandmarkDetector.normalize(hand, img)
    }

    parse(hands: unknown) {
        return this.handLandmarkDetector.parse(hands)
    }

    getHandCenter(hand: unknown) {
        return this.handLandmarkDetector.getHandCenter(hand)
    }
}