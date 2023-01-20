import React, { createRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { VscClose } from "react-icons/vsc";
import { ModalContainer, ModalHeader } from ".";
import styles from "../../../styles/ConversationPage/ConversationPage.module.scss";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  InputTextField,
} from "../../_styled/AuthenticationPage";
import { OverlayStyle } from "../../_styled/ConversationPage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createConversationThunk } from "../../../store/slices/conversationSlice";
import { useToast } from "../../../utils/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { postNewMessage } from "../../../utils/api";

interface ConversationModalPropType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateConversationModal: React.FC<ConversationModalPropType> = ({
  showModal,
  setShowModal,
}) => {
  const ref = createRef<HTMLDivElement>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit: formSubmitHandler,
    formState: { errors },
  } = useForm<{
    email: string;
    message: string;
  }>({});
  const { success, error } = useToast();
  const navigate = useNavigate();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setShowModal((prev) => !prev);
  };

  const handleSubmit = (data: { email: string; message: string }) => {
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(async ({ data: { id } }) => {
        // await postNewMessage({ conversationID: id, content: data.message });
        navigate(`/conversations/${id}`);
      });
    if (errors) error("Something went wrong!");
    else success("Conversation created!");
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showModal) {
    return (
      <OverlayStyle
        ref={ref}
        onClick={(e) => {
          const { current } = ref;
          if (current === e.target) setShowModal((prev) => !prev);
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <h1>Create a conversation</h1>
            <VscClose onClick={() => setShowModal((prev) => !prev)} />
          </ModalHeader>
          <form
            className={styles.modalForm}
            onSubmit={formSubmitHandler(handleSubmit)}
          >
            <section>
              <InputContainer backGroundcolor="#171717">
                <InputLabel>Email</InputLabel>
                <InputField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  bottomLine={true}
                />
              </InputContainer>
            </section>
            <section>
              <InputContainer backGroundcolor="#171717">
                <InputLabel>Message (optional)</InputLabel>
                <InputTextField
                  {...register("message", {
                    required: "Message is required",
                  })}
                  bottomLine={true}
                />
              </InputContainer>
            </section>
            <Button type="submit">Create Conversation</Button>
          </form>
        </ModalContainer>
      </OverlayStyle>
    );
  }
  return <></>;
};

export default CreateConversationModal;
