import { Point } from "../types"

export interface IHandLandmarkDetector {
    setup(): Promise<void>
    estimateHands(args: unknown): Promise<unknown>
    estimateFromVideo(video: HTMLVideoElement): Promise<unknown>
    estimateFromImage(image: HTMLImageElement): Promise<unknown>
    getHandCenter(hand: unknown, video: HTMLVideoElement): Point
    preProcess(hand: unknown, img: unknown): Array<number>
    dispose(): void
}

export interface IStaticHandLandmarkDetector {
    new(): IHandLandmarkDetector
    createDetector(): Promise<unknown>
    create(): Promise<unknown>
}