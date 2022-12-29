import React, { createRef, useEffect } from "react";
import { ModalContainer, ModalHeader } from ".";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  InputTextField,
} from "../../_styled/AuthenticationPage";
import { OverlayStyle } from "../../_styled/ConversationPage";
import { VscClose } from "react-icons/vsc";
import styles from "../../../styles/ConversationPage/ConversationPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

interface ConversationModalPropType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateConversationModal: React.FC<ConversationModalPropType> = ({
  showModal,
  setShowModal,
}) => {
  const ref = createRef<HTMLDivElement>();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setShowModal(prev => !prev);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }

  const conversation = useSelector((state: RootState) => state.conversation.conversations)
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  if (showModal) {
    return (
      <OverlayStyle
        ref={ref}
        onClick={(e) => {
          const { current } = ref;
          if (current === e.target) setShowModal(prev => !prev);
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <h1>Create a conversation</h1>
            <VscClose onClick={() => setShowModal(prev => !prev)} />
          </ModalHeader>
          <form className={styles.modalForm}>
            <section>
              <InputContainer backGroundcolor="#171717">
                <InputLabel>Recipients</InputLabel>
                <InputField bottomLine={true} />
              </InputContainer>
            </section>
            <section>
              <InputContainer backGroundcolor="#171717">
                <InputLabel>Message (optional)</InputLabel>
                <InputTextField bottomLine={true} />
              </InputContainer>
            </section>
            <Button onClick={handleSubmit} type="submit">
              Create Conversation
            </Button>
          </form>
        </ModalContainer>
      </OverlayStyle>
    );
  }
  return <></>;
};

export default CreateConversationModal;
