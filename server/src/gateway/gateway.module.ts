import { Module } from '@nestjs/common';
import { MessageGateway } from './gateway'
import { Services } from 'src/utils/constants';
import { GatewaySessionManager } from './gateway.session';

@Module({
    providers: [
        MessageGateway,
        {
            provide: Services.GATEWAY_SESSION_MANAGER,
            useClass: GatewaySessionManager
        }
    ]
})
export class GatewayModule {}