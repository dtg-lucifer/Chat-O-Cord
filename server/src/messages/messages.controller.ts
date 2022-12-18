import { Controller } from '@nestjs/common';
import { Routes } from 'src/utils/constants';

@Controller(Routes.MESSAGES)
export class MessagesController {}
