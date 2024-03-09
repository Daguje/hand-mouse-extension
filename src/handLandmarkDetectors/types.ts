import { PixelInput } from "@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces"
import { Point } from "../types"

export interface IHandLandmarkDetector {
    setup(): Promise<void>
    estimateHands(args: unknown): Promise<unknown>
    estimateFromVideo(video: HTMLVideoElement): Promise<unknown>
    estimateFromImage(image: HTMLImageElement): Promise<unknown>
    getHandCenter(hand: unknown): Point
    normalize(hand: unknown, img: PixelInput): unknown
    convert(hand: unknown): Array<number>
}

export interface IStaticHandLandmarkDetector {
    new(): IHandLandmarkDetector
    createDetector(): Promise<unknown>
    create(): Promise<unknown>
}