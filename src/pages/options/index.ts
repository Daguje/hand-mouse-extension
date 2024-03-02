import { browser } from 'webextension-polyfill-ts'
import editGestureFactory from '../../factories/EditGestureFactory'
import { getStorageData } from '@utils/storage'
import { GesturesDef, gesturePortugueseTranslateMap } from '@gestures/types'

const editClickGestureButton = document.getElementById('edit-click-gesture-button') as HTMLButtonElement
const editFreeMoveGestureButton = document.getElementById('edit-free-move-gesture-button') as HTMLButtonElement
const closeDialogButton = document.getElementById('close-dialog') as HTMLButtonElement
const saveChangesButton = document.getElementById('save-changes-button') as HTMLButtonElement
const dialog = document.querySelector('dialog')

const gestureNameSpan = document.getElementById('gesture-name-span') as HTMLSpanElement

const onEditButtonClick = async (gesture: number) => {
  gestureNameSpan.innerHTML = gesturePortugueseTranslateMap[gesture]
  dialog.showModal()
  
  await editGestureFactory.initialize(gesture)
}

editClickGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.Click))
editFreeMoveGestureButton.addEventListener('click', () => onEditButtonClick(GesturesDef.FreeMove))

closeDialogButton.addEventListener('click', () => {
  editGestureFactory.dispose(0)
  dialog.close()
})

saveChangesButton.addEventListener('click', async () => {
  console.log(await getStorageData())
})