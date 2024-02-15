import { Point } from "../types"

export interface IHandLandmarkDetector {
    setup(): Promise<void>
    estimateHands(args: unknown): Promise<unknown>
    getHandCenter(hand: unknown): Point
}

export interface IStaticHandLandmarkDetector {
    new(): IHandLandmarkDetector
    createDetector(): Promise<unknown>
    create(): Promise<unknown>
}