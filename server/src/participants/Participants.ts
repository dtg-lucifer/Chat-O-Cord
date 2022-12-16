import { ChatParticipant } from "src/utils/typeorm";
import { CreateParticipantParams, FindParticipantsParams } from "src/utils/types";

export interface IParticipants {
    findParticipant(params: FindParticipantsParams): Promise<ChatParticipant | null>;
    createParticipant(params: CreateParticipantParams): Promise<ChatParticipant>;
}