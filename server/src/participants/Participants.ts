import { ChatParticipant } from "src/utils/typeorm";
import { FindParticipantsParams } from "src/utils/types";

export interface IParticipants {
    findParticipant(params: FindParticipantsParams): Promise<ChatParticipant | null>;
    // findOrCreateParticipants();
    createParticipant(): Promise<ChatParticipant>;
}