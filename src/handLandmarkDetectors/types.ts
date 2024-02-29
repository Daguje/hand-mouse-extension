import { PixelInput } from "@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces"
import { Point } from "../types"

export interface IHandLandmarkDetector {
    setup(): Promise<void>
    estimateHands(args: unknown): Promise<unknown>
    getHandCenter(hand: unknown): Point
    normalize(hand: unknown, img: HTMLVideoElement): unknown
}

export interface IStaticHandLandmarkDetector {
    new(): IHandLandmarkDetector
    createDetector(): Promise<unknown>
    create(): Promise<unknown>
}