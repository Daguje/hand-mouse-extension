import editGesturePageFactory from '@features/editGesturesPage/factory'

await editGesturePageFactory.initialize()

// document.onreadystatechange = async () => {
//   if(document.readyState !== 'complete') return

//   const { clickPreview } = await getStorageItem('clickPreview')
//   const { scrollUpPreview } = await getStorageItem('scrollUpPreview')
//   const { scrollDownPreview } = await getStorageItem('scrollDownPreview')
//   const { freeMovePreview } = await getStorageItem('freeMovePreview')
//   const { backwardPreview } = await getStorageItem('backwardPreview')
//   const { forwardPreview } = await getStorageItem('forwardPreview')

//   const editClickGestureButton = document.getElementById('edit-click-gesture-button') as HTMLButtonElement
//   const editScrollUpGestureButton = document.getElementById('edit-scroll-up-gesture-button') as HTMLButtonElement
//   const editScrollDownGestureButton = document.getElementById('edit-scroll-down-gesture-button') as HTMLButtonElement
//   const editFreeMoveGestureButton = document.getElementById('edit-free-move-gesture-button') as HTMLButtonElement
//   const editBackwardGestureButton = document.getElementById('edit-backward-gesture-button') as HTMLButtonElement
//   const editForwardGestureButton = document.getElementById('edit-forward-gesture-button') as HTMLButtonElement
//   const closePageButton = document.getElementById('close-page-button') as HTMLButtonElement
//   const startCaptureButton = document.getElementById('start-capture-button') as HTMLButtonElement
//   const editDialog = document.getElementById('edit-dialog') as HTMLDialogElement

//   const viewClickGestureButton = document.getElementById('view-click-gesture-preview') as HTMLButtonElement
//   const viewScrollUpGestureButton = document.getElementById('view-scroll-up-gesture-preview') as HTMLButtonElement
//   const viewScrollDownGestureButton = document.getElementById('view-scroll-down-gesture-preview') as HTMLButtonElement
//   const viewFreeMoveGestureButton = document.getElementById('view-free-move-gesture-preview') as HTMLButtonElement
//   const viewBackwardGestureButton = document.getElementById('view-backward-gesture-preview') as HTMLButtonElement
//   const viewForwardGestureButton = document.getElementById('view-forward-gesture-preview') as HTMLButtonElement

//   viewClickGestureButton.disabled = !clickPreview
//   viewScrollUpGestureButton.disabled = !scrollUpPreview
//   viewScrollDownGestureButton.disabled = !scrollDownPreview
//   viewFreeMoveGestureButton.disabled = !freeMovePreview
//   viewBackwardGestureButton.disabled = !backwardPreview
//   viewForwardGestureButton.disabled = !forwardPreview


//   const closePreviewDialogButton = document.getElementById('close-preview-dialog') as HTMLButtonElement
//   const previewDialog = document.getElementById('preview-dialog') as HTMLDialogElement
//   const previewContainer = document.getElementById('preview-container') as HTMLDivElement

//   const trainButton = document.getElementById('train-model-button') as HTMLButtonElement

//   const svmClassifier = SVMClassifier.create();

//   const gestureNameSpan = document.getElementById('gesture-name-span') as HTMLSpanElement

//   const gestureService = new GestureEstimatorService({
//     gestureClassifier: svmClassifier,
//   })

//   const createEditGestureFactory = async (gesture: number) => {
//     startCaptureButton.disabled = true
//     return await editGestureFactory.initialize(gesture)
//   }

//   const onEditButtonClick = async (gesture: number) => {
//     editDialog.showModal()
//     gestureNameSpan.innerHTML = gesturePortugueseTranslateMap[gesture]
//     await createEditGestureFactory(gesture)
//   }

//   const onPreviewButtonClick = async (gesture: number, src: string) => {
//     previewDialog.showModal()
    
//     const translatedGestureName = gesturePortugueseTranslateMap[gesture]
    
//     gestureNameSpan.innerHTML = translatedGestureName

//     const previewImage = document.createElement('img')

//     previewImage.setAttribute('src', "data:image/png;base64," + src)
//     previewContainer.appendChild(previewImage)
//   }

//   editClickGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Click))
//   editScrollUpGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.ScrollUp))
//   editScrollDownGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.ScrollDown))
//   editFreeMoveGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.FreeMove))
//   editBackwardGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Backward))
//   editForwardGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Forward))

//   viewClickGestureButton.addEventListener('click', () => onPreviewButtonClick(GesturesDef.Click, clickPreview))
//   viewScrollUpGestureButton.addEventListener('click', () => onPreviewButtonClick(GesturesDef.ScrollUp, scrollUpPreview))
//   viewScrollDownGestureButton.addEventListener('click', () => onPreviewButtonClick(GesturesDef.ScrollDown, scrollDownPreview))
//   viewFreeMoveGestureButton.addEventListener('click', () => onPreviewButtonClick(GesturesDef.FreeMove, freeMovePreview))
//   viewBackwardGestureButton.addEventListener('click', () => onPreviewButtonClick(GesturesDef.Backward, backwardPreview))
//   viewForwardGestureButton.addEventListener('click', () => onPreviewButtonClick(GesturesDef.Forward, forwardPreview))

//   closePageButton.addEventListener('click', () => window.close())

//   closePreviewDialogButton.addEventListener('click', () => {
//     previewDialog.close()
//     previewContainer.innerHTML = ''
//   })

//   trainButton.addEventListener('click', async () => {
//     const { click } = await getStorageItem(gestureNameMap[0])
//     const { clickLabels } = await getStorageItem(`${gestureNameMap[0]}Labels`)
  
//     const { scrollUp } = await getStorageItem(gestureNameMap[1])
//     const { scrollUpLabels } = await getStorageItem(`${gestureNameMap[1]}Labels`)
  
//     const { scrollDown } = await getStorageItem(gestureNameMap[2])
//     const { scrollDownLabels } = await getStorageItem(`${gestureNameMap[2]}Labels`)
  
//     const { freeMove } = await getStorageItem(gestureNameMap[3])
//     const { freeMoveLabels } = await getStorageItem(`${gestureNameMap[3]}Labels`)
  
//     const { backward } = await getStorageItem(gestureNameMap[4])
//     const { backwardLabels } = await getStorageItem(`${gestureNameMap[4]}Labels`)
  
//     const { forward } = await getStorageItem(gestureNameMap[5])
//     const { forwardLabels } = await getStorageItem(`${gestureNameMap[5]}Labels`)
  
//     const gestures = [
//       ...click,
//       ...freeMove,
//       ...scrollUp,
//       ...scrollDown,
//       ...backward,
//       ...forward
//     ]
  
//     const labels = [
//       ...clickLabels,
//       ...freeMoveLabels,
//       ...scrollUpLabels,
//       ...scrollDownLabels,
//       ...backwardLabels,
//       ...forwardLabels,
//     ]
  
//     gestureService.train(gestures, labels)
//     const customModel = gestureService.save()
//     await setStorageData({ handMouseModel: customModel })
//   })
// }