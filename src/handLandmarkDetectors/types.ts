export interface IHandLandmarkDetector {
    setup(): Promise<void>
    estimateHands(args: unknown): Promise<unknown>
}

export interface IStaticHandLandmarkDetector {
    new(): IHandLandmarkDetector
    createDetector(): Promise<unknown>
    create(): Promise<unknown>
}