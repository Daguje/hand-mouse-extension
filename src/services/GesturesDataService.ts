import { GesturesDef, gestureNameMap } from "@gestures/types";
import { getStorageItem } from "@utils/storage";

export type TGestureData = { 
    [key: string]: Array<Array<number>>
}

export type TGestureLabels = { 
    [key: string]: Array<number> 
}

export type TGesturePreview = { 
    [key: string]: string
}

export class GesturesDataService {
    private async forEachGesture(callback: (gesture: GesturesDef) => Promise<unknown>) {
        for (const gestureDef in GesturesDef) {
            const gesture = GesturesDef[gestureDef] as string | number;
    
            if (typeof gesture === 'string') continue;
    
            await callback(gesture);
        }
    }

    private async get(key: string) {
        return await getStorageItem(key)
    }

    async getLabels(gesture: GesturesDef): Promise<TGestureLabels> {
        const labels = await this.get(`${gestureNameMap[gesture]}Labels`) as TGestureLabels
        return labels
    }
    
    async getData(gesture: GesturesDef): Promise<TGestureData> {
        const gestureData = await this.get(gestureNameMap[gesture]) as TGestureData
        return gestureData
    }

    async getPreview(gesture: GesturesDef): Promise<TGesturePreview> {
        const preview = await this.get(`${gestureNameMap[gesture]}Preview`) as TGesturePreview
        return preview
    }

    async getAllData(): Promise<TGestureData> {
        const data: TGestureData = {}

        await this.forEachGesture(async gesture => {
            const result = await this.getData(gesture)
            data[gesture] = result[gestureNameMap[gesture]]
        })

        return data
    }

    async getAllLabels(): Promise<TGestureLabels> {
        const labels: TGestureLabels = {}

        await this.forEachGesture(async gesture => {
            const l = await this.getLabels(gesture)
            labels[`${gesture}Labels`] = l[`${gestureNameMap[gesture]}Labels`]
        })

        return labels
    }

    async getAllPreviews(): Promise<TGesturePreview> {
        const previews: TGesturePreview = {}

        await this.forEachGesture(async gesture => {
            const p = await this.getPreview(gesture)
            previews[gesture] = p[`${gestureNameMap[gesture]}Preview`]
        })

        return previews
    }

    async getAll() {
        const data = await this.getAllData()
        const labels = await this.getAllLabels()
        const preview = await this.getAllPreviews()

        return {
            data,
            labels,
            preview
        }
    }
}