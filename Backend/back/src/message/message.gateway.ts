import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { MessageService } from './message.service';
import { Server } from 'socket.io';
import { Message } from './message.entity';

@WebSocketGateway(4000, { namespace: 'message' })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private messageService: MessageService;

  @WebSocketServer()
  private wss: Server;

  private logger: Logger = new Logger('MessageGateway');
  private count: number = 0;

  public async handleConnection(client: any, ...args: any[]) {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connection`);
    const messages: Message[] = await this.messageService.getAll();
    client.emit('all-messages-to-client', messages);
  }

  handleDisconnect(client: any) {
    this.count += 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  afterInit(server: any) {
    this.logger.log('MessageGateway Initialized');
  }

  @SubscribeMessage('new-message-to-server')
  public async handleNewMessage(
    @MessageBody() data: { sender: string; message: string },
  ): Promise<void> {
    const message: Message = await this.messageService.createMessage(
      data.sender,
      data.message,
    );
    this.wss.emit('new-messages-to-client', { message });
  }
}
