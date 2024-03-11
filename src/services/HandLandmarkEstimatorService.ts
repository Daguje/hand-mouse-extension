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

    async estimateFromVideo(video: HTMLVideoElement) {
        return await this.handLandmarkDetector.estimateFromVideo(video)
    }

    async estimateFromImage(image: HTMLImageElement) {
        return await this.handLandmarkDetector.estimateFromImage(image)
    }

    private normalize(hand: unknown, img: PixelInput) {
        return this.handLandmarkDetector.normalize(hand, img)
    }

    private relativize(hand: unknown) {
        return this.handLandmarkDetector.relativize(hand)
    }

    private convert(hands: unknown) {
        return this.handLandmarkDetector.convert(hands)
    }

    preprocess(hand: unknown, img: PixelInput) {
        const relativezedHand = this.relativize(hand)
        const normalizedHand = this.normalize(relativezedHand, img)
        const convertedHandsData = this.convert(normalizedHand)

        return convertedHandsData
    }

    getHandCenter(hand: unknown) {
        return this.handLandmarkDetector.getHandCenter(hand)
    }
}