// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IShape {}

export interface IStaticShape {
    new(): IShape
    draw(...args: any): void
}