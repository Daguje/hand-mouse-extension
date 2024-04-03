import SVM from 'libsvm-js/dist/browser/asm/libsvm'

import { IStaticClassifier } from '@classifiers/types'
import { GesturesDef } from '@gestures/types'
import { NotificationService } from '@services/NotificationService'
import { staticImplements } from '@utils/staticImplements'
import { getStorageItem } from '@utils/storage'

@staticImplements<IStaticClassifier>()
export default class SVMClassifier {
    private estimator: typeof SVM

    static create() {
        const svm = new SVMClassifier()
        svm.setup()

        return svm
    }

    static async load() {
        try {
            NotificationService.info('Iniciando Classificador de Gestos')

            const svm = new SVMClassifier()
            svm.setup()

            const { handMouseModel } = await getStorageItem('handMouseModel')
            svm.estimator = await SVM.load(handMouseModel)

            NotificationService.success('Classificador de Gestos iniciado com sucesso!')

            return svm
        } catch(e) {
            const message = 'Não foi possível carregar o Classificador de Gestos'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    async setup() {
        this.estimator  = new SVM({
            kernel: SVM.KERNEL_TYPES.LINEAR,
            type: SVM.SVM_TYPES.C_SVC,
            gamma: 1,
            cost: 6,
            degree: 1,
            probabilityEstimates: true,
        });
    }

    save() {
        try {
            NotificationService.info('Salvando Alterações...')
            const model = this.estimator.serializeModel()
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
            this.estimator.train(data, labels)
            NotificationService.success('Classificador de Gestos treinado com Sucesso')
        } catch (e) {
            const message = 'Não foi possível treinar o Classificador de Gestos'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    async predict(hand: number[]) {
        try {
            const predictions = this.estimator.predictProbability(hand)
            
            if(!predictions) return GesturesDef.None
            if(!predictions.length) return GesturesDef.None

            const { estimates } = predictions[0]
            
            let greatestProbability = 0
            let greatestProbabilityIndex = -1

            estimates.forEach((estimate: any, index: number) => {
                if(estimate.probability > greatestProbability) {
                    greatestProbability = estimate.probability
                    greatestProbabilityIndex = index
                }
            })

            const { label, probability } = estimates[greatestProbabilityIndex]

            if(probability < 0.7) return GesturesDef.None
            
            return label as GesturesDef
        } catch(e) {
            const message = 'Não foi possível predizer gestos'

            NotificationService.error(message)
            throw new Error(`${message}: ${e}`)
        }
    }

    dispose() {
        this.estimator.free()
        this.estimator = null
    }
}