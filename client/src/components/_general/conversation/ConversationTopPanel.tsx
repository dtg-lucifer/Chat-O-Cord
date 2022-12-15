import { useState } from "react";
import {
  ShowmodalButton,
  Wrapper,
} from "../../_styled/ConversationPage";
import CreateConversationModal from "../modals/CreateConversationModal";

const ConversationTopPanel = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(e.target);
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showModal && <CreateConversationModal showModal={true} setShowModal={setShowModal} />}
      <Wrapper bottomLine={true}>
        <ShowmodalButton onClick={clickHandler}>Search</ShowmodalButton>
      </Wrapper>
    </>
  );
};

export default ConversationTopPanel;
