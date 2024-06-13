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
    
    preprocess(hand: unknown, img: PixelInput) {
        return this.handLandmarkDetector.preProcess(hand, img)
    }

    getHandCenter(hand: unknown, video: HTMLVideoElement) {
        return this.handLandmarkDetector.getHandCenter(hand, video)
    }

    dispose() {
        this.handLandmarkDetector.dispose()
    }
}