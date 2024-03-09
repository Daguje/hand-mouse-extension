import editGestureFactory from '../../factories/EditGestureFactory'
import { getStorageItem, setStorageData } from '@utils/storage'
import { GesturesDef, gestureNameMap, gesturePortugueseTranslateMap } from '@gestures/types'
import EditGestureController from '@controllers/EditGestureController'
import GestureEstimatorService from '@services/GestureEstimatorService'
import SVMClassifier from '@classifiers/svm'

const editClickGestureButton = document.getElementById('edit-click-gesture-button') as HTMLButtonElement
const editScrollUpGestureButton = document.getElementById('edit-scroll-up-gesture-button') as HTMLButtonElement
const editScrollDownGestureButton = document.getElementById('edit-scroll-down-gesture-button') as HTMLButtonElement
const editFreeMoveGestureButton = document.getElementById('edit-free-move-gesture-button') as HTMLButtonElement
const editBackwardGestureButton = document.getElementById('edit-backward-gesture-button') as HTMLButtonElement
const editForwardGestureButton = document.getElementById('edit-forward-gesture-button') as HTMLButtonElement

const closeDialogButton = document.getElementById('close-dialog') as HTMLButtonElement
const trainButton = document.getElementById('train-model-button') as HTMLButtonElement
const dialog = document.querySelector('dialog')

const svmClassifier = SVMClassifier.create();

const gestureNameSpan = document.getElementById('gesture-name-span') as HTMLSpanElement

let factory = null as EditGestureController

const gestureService = new GestureEstimatorService({
  gestureClassifier: svmClassifier,
})

const createEditGestureFactory = async (gesture: number) => {
  return await editGestureFactory.initialize(gesture)
}

const disposeEditGestureFactory = (controller: EditGestureController) => {
  return editGestureFactory.dispose(controller)
}

const onEditButtonClick = async (gesture: number) => {
  gestureNameSpan.innerHTML = gesturePortugueseTranslateMap[gesture]
  factory = await createEditGestureFactory(gesture)
  dialog.showModal()
}

editClickGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Click))
editScrollUpGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.ScrollUp))
editScrollDownGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.ScrollDown))
editFreeMoveGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.FreeMove))
editBackwardGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Backward))
editForwardGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Forward))

closeDialogButton.addEventListener('click', () => {
  factory = disposeEditGestureFactory(factory)
  dialog.close()
})

trainButton.addEventListener('click', async () => {
  const { click } = await getStorageItem(gestureNameMap[0])
  const { clickLabels } = await getStorageItem(`${gestureNameMap[0]}Labels`)

  const { scrollUp } = await getStorageItem(gestureNameMap[1])
  const { scrollUpLabels } = await getStorageItem(`${gestureNameMap[1]}Labels`)

  const { scrollDown } = await getStorageItem(gestureNameMap[2])
  const { scrollDownLabels } = await getStorageItem(`${gestureNameMap[2]}Labels`)

  const { freeMove } = await getStorageItem(gestureNameMap[3])
  const { freeMoveLabels } = await getStorageItem(`${gestureNameMap[3]}Labels`)

  const { backward } = await getStorageItem(gestureNameMap[4])
  const { backwardLabels } = await getStorageItem(`${gestureNameMap[4]}Labels`)

  const { forward } = await getStorageItem(gestureNameMap[5])
  const { forwardLabels } = await getStorageItem(`${gestureNameMap[5]}Labels`)

  const gestures = [
    ...click,
    ...freeMove,
    ...scrollUp,
    ...scrollDown,
    ...backward,
    ...forward
  ]

  const labels = [
    ...clickLabels,
    ...freeMoveLabels,
    ...scrollUpLabels,
    ...scrollDownLabels,
    ...backwardLabels,
    ...forwardLabels,
  ]

  gestureService.train(gestures, labels)
  const customModel = gestureService.save()
  await setStorageData({ handMouseModel: customModel })
})