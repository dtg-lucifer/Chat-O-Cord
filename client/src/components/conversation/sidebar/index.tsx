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

export default function SideBar({
  activeGroup,
  activeConversationId,
}: SideBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { user } = useContext(AuthContext);

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
          variant={activeGroup === "u" ? "active" : "sideBarFilter"}
          onClick={() => {
            navigate("/conversations/u");
          }}
          style={{
            boxShadow: activeGroup === "u" ? "var(--shadow-primary)" : "",
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
        {new Array(10).fill(0).map((_, i) => {
          return (
            <ChatCard
              key={i}
              onClick={() => {
                navigate(`/conversations/${activeGroup}/${i}`);
              }}
              style={{
                backgroundColor:
                  activeConversationId === i.toString()
                    ? "var(--clr-light-bg-faint)"
                    : "",
              }}
            >
              <img src={user?.profilePic || "/BLANK.jpeg"} alt="profile" />
              <div className="details__wrapper">
                <h4>@name</h4>
                <p>Some message....</p>
              </div>
            </ChatCard>
          );
        })}
      </ChatWrapper>
    </SideBarWrapper>
  );
}
