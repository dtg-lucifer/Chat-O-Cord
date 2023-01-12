import { Module } from '@nestjs/common';
import { MessageGateway } from './gateway'
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
    imports: [ConversationsModule],
    providers: [
        MessageGateway,
        {
            provide: Services.GATEWAY_SESSION_MANAGER,
            useClass: GatewaySessionManager
        }
    ]
})
export class GatewayModule {}