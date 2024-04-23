import mouseFactory from '@features/mouse/factory'
import { NotificationService } from '@services/NotificationService'

try {
    await mouseFactory.initialize()
    NotificationService.success('HandMouse iniciado com sucesso')
} catch(e) {
    NotificationService.error('Erro ao iniciar a HandMouse')
}