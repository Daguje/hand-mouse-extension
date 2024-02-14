import mouseFactory from '../../factories/MouseFactory'

mouseFactory.initialize()

// import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces'
// import { Camera, Cursor, HandDector, Loading } from '../../lib'
// import { browser } from 'webextension-polyfill-ts'
// import { getStorageItem } from '@utils/storage'

// let video: PixelInput
// let handDetector: HandDector
// let cursor: Cursor
// let isEnabled = true

// const canvas = document.createElement('canvas')
// const ctx = canvas.getContext('2d')

// canvas.style.pointerEvents = 'none'
// canvas.width = globalThis.screen.availWidth
// canvas.height = globalThis.screen.availHeight
// canvas.style.position = 'fixed'
// canvas.style.top = '0'
// canvas.style.left = '0'
// canvas.style.zIndex = '2147483647'

// document.body.appendChild(canvas)

// const results = async () => {
//   if(isEnabled) {
//     const hands = await handDetector.estimateHands(video)
//     cursor.drawHands(hands)
      
//   } else {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//   }

//   requestAnimationFrame(results)
// }

// const contextScript = async () => {
//   video = await Camera.create()
//   await Loading.show()
  
//   handDetector = await HandDector.create()
//   cursor = new Cursor({ video, canvas, ctx })
  
//   Camera.draw(video)
  
//   getStorageItem('hide-camera').then((items) => {
//     const hideCamera = items['hide-camera']
//     if (hideCamera) Camera.hide()
//     else Camera.show()
//   })

//   getStorageItem('disable-detection').then((items) => {
//     const shouldDisable = items['disable-detection']
//     if (shouldDisable) isEnabled = false
//     else isEnabled = true
//   })
  
//   Loading.hide()
//   results()
  
//   browser.runtime.onMessage.addListener(async (message) => {
//     switch (message.from) {
//       case 'popup':
//         if (message.content['hide-camera'] !== undefined) {
//           if (message.content['hide-camera'] === true) {
//             Camera.hide()
//           } else {
//             Camera.show()
//           }
//         }
        
//         if(message.content['disable-detection'] !== undefined) {
//           isEnabled = !message.content['disable-detection']
//         }

//         break
//     }
//   })
// }

// contextScript()
