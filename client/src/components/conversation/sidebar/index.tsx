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

export default function SideBar({ activeGroup }: SideBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
	const { user } = useContext(AuthContext)

  return (
    <SideBarWrapper>
      <TopWrapper>
        <TextFieldCVA
          placeholder="Search..."
          type="text"
          variant="sideBarSearch"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </TopWrapper>
      <FilterWrapper>
        <ButtonCVA
          variant="sideBarFilter"
          onClick={() => {
            navigate("/conversations/u");
          }}
        >
          Direct
        </ButtonCVA>
        <ButtonCVA
          variant="sideBarFilter"
          onClick={() => {
            navigate("/conversations/g");
          }}
        >
          Group
        </ButtonCVA>
      </FilterWrapper>
      <ChatWrapper>
				{new Array(10).fill(0).map((_, i) => {
					return (
						<ChatCard key={i}>
							<img src={user?.profilePic || "/BLANK.jpeg"} alt="" />
							<div className="details__wrapper">
								<h4>{user?.userName || "UNKNOWN USER"}</h4>
								<p>Some Message</p>
							</div>
						</ChatCard>
					)
				})}
			</ChatWrapper>
    </SideBarWrapper>
  );
}
