import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConversationDto {
    @IsNumber()
    @IsNotEmpty()
    recipientID: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}