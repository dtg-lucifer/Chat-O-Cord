import { Module } from '@nestjs/common';
import { MessageGateway } from './websocket.gateway';

@Module({
    providers: [MessageGateway]
})
export class GatewayModule {}