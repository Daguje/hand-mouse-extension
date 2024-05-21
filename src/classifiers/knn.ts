import { GesturesDef } from "@gestures/types";
import { NotificationService } from "@services/NotificationService";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { staticImplements } from "@utils/staticImplements";
import { getStorageItem } from "@utils/storage";
import { IStaticClassifier } from "./types";

@staticImplements<IStaticClassifier>()
export default class KNNClassifier {
    private estimator: knnClassifier.KNNClassifier
    private lastDetectedGesture: GesturesDef = GesturesDef.None

    static create() {
        const knn = new KNNClassifier()
        knn.setup()

        return knn
    }

    static async load() {
        try {
            NotificationService.info('Iniciando Classificador de Gestos')

            const knn = new KNNClassifier()
            knn.setup()

            const { handMouseModel } = await getStorageItem('handMouseModel')
            const parsedHandMouseModel = JSON.parse(handMouseModel)
            
            const dataset = Object.fromEntries(parsedHandMouseModel.map(([label, data, shape])=>[label, tf.tensor(data, shape)]))
            
            knn.estimator.setClassifierDataset(dataset)

            NotificationService.success('Classificador de Gestos iniciado com sucesso!')

            return knn
        } catch(e) {
            const message = 'Não foi possível carregar o Classificador de Gestos'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    async setup() {
        this.estimator = new knnClassifier.KNNClassifier()
    }

    save() {
        try {
            NotificationService.info('Salvando Alterações...')

            const dataset = this.estimator.getClassifierDataset()
            const data = Object.entries(dataset).map(([label, data])=>[label, Array.from(data.dataSync()), data.shape])
            const model = JSON.stringify(data);

            NotificationService.success('Alterações salvas com sucesso!')
    
            return model
        } catch (e) {
            const message = 'Não foi possível salvar as alterações'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    async fit(data: number[][], labels: number[]) {
        try {
            NotificationService.info('Treinando Classificador de Gestos')

            for(let i = 0; i < data.length; i++) {
                const input = tf.tensor(data[i])
                this.estimator.addExample(input, labels[i])

                input.dispose()
            }

            NotificationService.success('Classificador de Gestos treinado com Sucesso')
        } catch (e) {
            const message = 'Não foi possível treinar o Classificador de Gestos'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    async predict(hand: number[]) {
        try {
            const input = tf.tensor(hand)
            const result = await this.estimator.predictClass(input, 1)

            return Number(result.label) as GesturesDef
        } catch(e) {
            const message = 'Não foi possível predizer gestos'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    dispose() {
        this.estimator.dispose()
        this.estimator = null
    }
}