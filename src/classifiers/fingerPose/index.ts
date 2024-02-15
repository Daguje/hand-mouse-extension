import * as fp from 'fingerpose'

import { IStaticClassifier } from '@classifiers/types'
import { staticImplements } from '@utils/staticImplements'

import { closedHandGesture } from './closedHandGesture'
import { okGesture } from './okGesture'
import { fingerUp } from './fingerUp'
import { fingerDown } from './fingerDown'
import { Hand, Keypoint } from '@tensorflow-models/hand-pose-detection'
import { GesturesDef } from '@gestures/types'

@staticImplements<IStaticClassifier>()
export default class FingerPoseClassifier {
    private estimator: typeof fp.GestureEstimator

    static create() {
        const fpc = new FingerPoseClassifier()
        fpc.setup()

        return fpc
    }

    async setup() {
        console.log('Iniciando classificador Fingerpose')

        this.estimator =  new fp.GestureEstimator([
            closedHandGesture,
            fingerUp,
            fingerDown,
            okGesture,
        ])

        console.log('Criado classificador Fingerpose')
    }

    async fit(data: unknown, labels: unknown) {
        console.log(data, labels)
    }

    convertToFingerpose(keypoints: Array<Keypoint>) {
        const vetor: number[][] = [];

        for (let i = 0; i < keypoints.length; i++) {
            const x = keypoints[i].x
            const y = keypoints[i].y
            const z = 0;
            vetor[i] = [x, y, z];
        }
        
        return vetor;
    }

    async predict(hands: Array<Hand>) {
        if(!hands.length) return GesturesDef.None

        const hand = hands[0]
        if(!hand.keypoints) return GesturesDef.None

        const fpPredictions = this.convertToFingerpose(hand.keypoints)                       
        const estimatedGestures = this.estimator.estimate(fpPredictions, 9)

        if (!estimatedGestures) return GesturesDef.None
        if (!estimatedGestures.gestures) return GesturesDef.None
        if (!estimatedGestures.gestures.length) return GesturesDef.None
        
        return estimatedGestures.gestures[0].name as GesturesDef
    }
}