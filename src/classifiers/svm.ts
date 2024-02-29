import SVM from 'libsvm-js/dist/browser/asm/libsvm'

import { IStaticClassifier } from '@classifiers/types'
import { staticImplements } from '@utils/staticImplements'

@staticImplements<IStaticClassifier>()
export default class SVMClassifier {
    private estimator: typeof SVM

    static create() {
        const svm = new SVMClassifier()
        svm.setup()

        return svm
    }

    async setup() {
        console.log('Iniciando classificador SVM')

        this.estimator  = new SVM({
            kernel: SVM.KERNEL_TYPES.POLYNOMIAL,
            type: SVM.SVM_TYPES.EPSILON_SVR,
            gamma: 1,
            cost: 6,
            degree: 2
        });

        console.log('Criado classificador SVM')
    }

    async fit(data: number[][], labels: number[]) {
        return await this.estimator.train(data, labels)
    }

    async predict(hands: number[][]) {
        return this.estimator.predict(hands)
    }
}