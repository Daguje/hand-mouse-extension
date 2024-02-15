import { GesturesDef } from "@gestures/types"

export interface IClassifier {
    setup(): Promise<void>
    fit(data: unknown, labels: Array<unknown>): Promise<void>
    predict(x: unknown): Promise<GesturesDef>
}

export interface IStaticClassifier {
    new(): IClassifier
    create(): unknown
}