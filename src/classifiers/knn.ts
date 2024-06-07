import { GesturesDef } from '@gestures/types';
import { NotificationService } from '@services/NotificationService';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { staticImplements } from '@utils/staticImplements';
import { getStorageItem } from '@utils/storage';
import { IStaticClassifier } from './types';

type Dataset = {
  [label: string]: tf.Tensor<tf.Rank.R2>;
};

type DatasetObjectEntry = [
  string,
  number[],
  [number, number],
];

type DatasetObject = DatasetObjectEntry[];

@staticImplements<IStaticClassifier>()
export default class KNNClassifier {
  private estimator: knnClassifier.KNNClassifier;

  static create() {
    const knn = new KNNClassifier();
    knn.setup();

    return knn;
  }

  private async toDatasetObject(dataset: Dataset): Promise<DatasetObject> {
    const result: DatasetObject = await Promise.all(
      Object.entries(dataset).map(async ([classId, value]) => {
        const data = await value.data();

        return [
          classId,
          Array.from(data),
          value.shape,
        ];
      }),
    );

    return result;
  }

  private static fromDatasetObject(datasetObject: DatasetObject): Dataset {
      return Object.entries(datasetObject).reduce(
          (result: Dataset, [indexString, [_, data, shape]]) => {
          const index = Number(indexString);
        const tensor = tf.tensor2d(data, shape);

        result[index] = tensor;

        return result;
      },
      {},
    );
  }

  static async load() {
    try {
      NotificationService.info('Iniciando Classificador de Gestos');

      const knn = new KNNClassifier();
      knn.setup();

      const { handMouseModel } = await getStorageItem('handMouseModel');
      const parsedHandMouseModel = JSON.parse(handMouseModel);
      const dataset = this.fromDatasetObject(parsedHandMouseModel);
      knn.estimator.setClassifierDataset(dataset);

      NotificationService.success(
        'Classificador de Gestos iniciado com sucesso!',
      );

      return knn;
    } catch (e) {
      const message = 'Não foi possível carregar o Classificador de Gestos';

      NotificationService.error(message);
      console.error(e)
      throw new Error(`${message}: ${e}`);
    }
  }

  async setup() {
    this.estimator = new knnClassifier.KNNClassifier();
  }

  async save() {
    try {
      NotificationService.info('Salvando Alterações...');

      const dataset = this.estimator.getClassifierDataset();
      const datasetObject: DatasetObject = await this.toDatasetObject(dataset);
      const model = JSON.stringify(datasetObject);

      NotificationService.success('Alterações salvas com sucesso!');

      return model;
    } catch (e) {
      const message = 'Não foi possível salvar as alterações';

      NotificationService.error(message);
      throw new Error(`${message}: ${e}`);
    }
  }

  async fit(data: number[][], labels: number[]) {
    try {
      NotificationService.info('Treinando Classificador de Gestos');

      this.estimator.clearAllClasses();
      for (let i = 0; i < data.length; i++) {
        const input = tf.tensor(data[i]);
        this.estimator.addExample(input, labels[i]);

        input.dispose();
      }

      NotificationService.success(
        'Classificador de Gestos treinado com Sucesso',
      );
    } catch (e) {
      const message = 'Não foi possível treinar o Classificador de Gestos';

      NotificationService.error(message);
      throw new Error(`${message}: ${e}`);
    }
  }

  async predict(hand: number[]) {
    try {
      const input = tf.tensor(hand);
      const result = await this.estimator.predictClass(input, 1);

      return Number(result.label) as GesturesDef;
    } catch (e) {
      const message = 'Não foi possível predizer gestos';

      NotificationService.error(message);
      throw new Error(`${message}: ${e}`);
    }
  }

  dispose() {
    this.estimator.dispose();
    this.estimator = null;
  }
}
