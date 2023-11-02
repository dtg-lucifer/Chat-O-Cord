import { useState } from "react";
import { TextField as TextFieldCVA } from "../index.components";
import {
  ChatWrapper,
  FilterWrapper,
  SideBarWrapper,
  TopWrapper,
} from "../index.styled";

export default function SideBar() {

	const [query, setQuery] = useState("");

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
      <FilterWrapper></FilterWrapper>
      <ChatWrapper></ChatWrapper>
    </SideBarWrapper>
  );
}