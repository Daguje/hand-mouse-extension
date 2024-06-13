import mouseFactory from '@features/mouse/factory'
import { NotificationService } from '@services/NotificationService'
import { getStorageItem } from '@utils/storage'

try {
    const data = await getStorageItem('disable-detection')
    const detectionIsDisabled = data['disable-detection']

    if(!detectionIsDisabled) {
        await mouseFactory.initialize()
        NotificationService.success('HandMouse iniciado com sucesso')
    }
} catch(e) {
    NotificationService.error('Erro ao iniciar a HandMouse')
}