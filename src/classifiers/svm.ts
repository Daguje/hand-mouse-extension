import SVM from 'libsvm-js/dist/browser/asm/libsvm'

import { IStaticClassifier } from '@classifiers/types'
import { staticImplements } from '@utils/staticImplements'
import { GesturesDef } from '@gestures/types'
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
            console.log('Carregando classificador SVM')

            const svm = new SVMClassifier()
            svm.setup()

            const { handMouseModel } = await getStorageItem('handMouseModel')
            svm.estimator = SVM.load(handMouseModel)

            console.log('classificador SVM carregado com sucesso!')

            return svm
        } catch(e) {
            throw new Error(`Não foi possível carregar o modelo: ${e}`)
        }
    }

    async setup() {
        console.log('Iniciando classificador SVM')

        this.estimator  = new SVM({
            kernel: SVM.KERNEL_TYPES.POLYNOMIAL,
            type: SVM.SVM_TYPES.C_SVC,
            gamma: 1,
            cost: 6,
            degree: 2
        });

        console.log('Criado classificador SVM')
    }


    save() {
        try {
            console.log('Serializando Classificador SVM')
            const model = this.estimator.serializeModel()
            console.log('Classificador SVM Serializado com sucesso!')
    
            return model
        } catch (e) {
            throw new Error(`Não foi possível salvar o modelo: ${e}`)
        }
    }

    async fit(data: number[][], labels: number[]) {
        try {
            console.log('Treinando Classificador SVM')
            await this.estimator.train(data, labels)
            console.log('Classificador SVM Treinado com sucesso!')
        } catch (e) {
            throw new Error(`Não foi possível treinar o modelo: ${e}`)
        }
    }

    async predict(hand: number[]) {
        try {
            const predictions = this.estimator.predict(hand)

            if(!predictions) return GesturesDef.None
            if(!predictions.length) return GesturesDef.None
    
            return Math.round(predictions[0]) as GesturesDef
        } catch(e) {
            throw new Error(`Não foi possível fazer a predição: ${e}`)
        }
    }
}