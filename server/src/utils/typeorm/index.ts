import { User } from "./entities/User";
import { Session } from "./entities/Session";
import { Conversation } from "./entities/Conversation";
import { ChatParticipant } from "./entities/ChatParticipant";

const entities = [User, Session, Conversation, ChatParticipant]

export { User, Session, Conversation, ChatParticipant };
export default entities