import { ModalContainer, ModalHeader, ModalContent } from ".";
import { InputContainer, InputField } from "../../_styled/AuthenticationPage";
import { OverlayStyle } from "../../_styled/ConversationPage";
import { VscClose } from "react-icons/vsc"

const CreateConversationModal = () => {
  return (
    <OverlayStyle>
      <ModalContainer>
        <ModalHeader><h1>Create conversation</h1></ModalHeader>
        <ModalContent>Content goes here</ModalContent>
        <form>
          <InputContainer>
            <InputField />
          </InputContainer>
        </form>
        <VscClose />
      </ModalContainer>
    </OverlayStyle>
  );
};

export default CreateConversationModal;
