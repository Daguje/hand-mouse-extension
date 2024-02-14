import { IHandLandmarkDetector } from "../handLandmarkDetectors/types";

interface IHandLandmarkEstimatorServiceProps {
    handLandmarkDetector: IHandLandmarkDetector
}

export default class HandLandmarkEstimatorService {
    private handLandmarkDetector: IHandLandmarkDetector

    constructor({ handLandmarkDetector }: IHandLandmarkEstimatorServiceProps) {
        this.handLandmarkDetector = handLandmarkDetector
    }

    async estimateHands(img: HTMLVideoElement) {
        return await this.handLandmarkDetector.estimateHands(img)
    }
}