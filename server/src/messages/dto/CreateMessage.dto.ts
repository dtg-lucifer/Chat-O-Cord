import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  conversationID: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
