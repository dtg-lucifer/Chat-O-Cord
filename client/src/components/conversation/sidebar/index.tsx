import { useContext, useState } from "react";
import {
  Button as ButtonCVA,
  TextField as TextFieldCVA,
} from "../index.components";
import {
  ChatCard,
  ChatWrapper,
  FilterWrapper,
  SideBarWrapper,
  TopWrapper,
} from "../index.styled";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../utils/context/authContext";
import { SideBarProps } from "../../../types/conversation";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { ActiveChatContext } from "../../../utils/context/activeChatContext";

export default function SideBar({ activeGroup }: SideBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { user } = useContext(AuthContext);
  const { activeChat, setActiveChat } = useContext(ActiveChatContext);
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  return (
    <SideBarWrapper>
      <TopWrapper>
        <TextFieldCVA
          placeholder="Search..."
          type="text"
          variant="base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </TopWrapper>
      <FilterWrapper>
        <ButtonCVA
          variant={activeGroup === "d" ? "active" : "sideBarFilter"}
          onClick={() => {
            navigate("/conversations/d");
          }}
          style={{
            boxShadow: activeGroup === "d" ? "var(--shadow-primary)" : "",
          }}
        >
          Direct
        </ButtonCVA>
        <ButtonCVA
          variant={activeGroup === "g" ? "active" : "sideBarFilter"}
          onClick={() => {
            navigate("/conversations/g");
          }}
          style={{
            boxShadow: activeGroup === "g" ? "var(--shadow-primary)" : "",
          }}
        >
          Group
        </ButtonCVA>
      </FilterWrapper>
      <ChatWrapper>
        {conversations.map((c) => {
          return (
            <ChatCard
              key={c.id}
              onClick={() => {
                setActiveChat(c);
                console.log("Active Chat: ", c);
                navigate(`/conversations/${activeGroup}/${c.id}`);
              }}
              style={{
                backgroundColor:
                  activeChat?.id === c.id.toString()
                    ? "var(--clr-light-bg-faint)"
                    : "",
              }}
            >
              <img
                src={
                  c.creator.id === user?.id
                    ? c.recipient.profilePic || "/BLANK.jpeg"
                    : c.creator.profilePic || "/BLANK.jpeg"
                }
                alt="profile"
              />
              <div className="details__wrapper">
                <h4>
                  {c.creator.id === user?.id
                    ? c.recipient.userName
                    : c.creator.userName}
                </h4>
                <p>
                  {c.messages[0]?.content
                    ? c.messages[0]?.content.slice(0, 30) +
                      (c.messages[0]?.content.length > 30 ? "..." : "")
                    : "No messages yet"}
                </p>
              </div>
            </ChatCard>
          );
        })}
      </ChatWrapper>
    </SideBarWrapper>
  );
}
