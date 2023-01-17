import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
