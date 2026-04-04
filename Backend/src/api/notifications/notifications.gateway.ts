import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@WebSocketGateway()
export class NotificationsGateway {
  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage('createNotification')
  create(@MessageBody() userId: string, createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(userId,createNotificationDto);
  }

  @SubscribeMessage('findAllNotifications')
  findAll(@MessageBody() userId: string) {
    return this.notificationsService.findAll(userId);
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: string , userId: string) {
    return this.notificationsService.findOne(id, userId);
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: string, userId: string) {
    return this.notificationsService.remove(id, userId);
  }
}
