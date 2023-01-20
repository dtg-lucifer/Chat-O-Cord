import React, { useState, useRef } from "react";
import { MessageInputProps } from "../../../types/StyledComponentProps/ConversationPage";
import {
  ConversationInputWrapper,
  MsgInput,
} from "../../_styled/ConversationPage";
import { BsPlusCircleFill, BsEmojiSmileFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { postNewMessage } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { addMessage } from "../../../store/slices/messageSlice";

const ConversationInput: React.FC<MessageInputProps> = ({
  name,
  sendTypingEnd,
  typingSts,
}) => {
  const [msg, setMsg] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg === "" || msg === undefined || !id) return;
    try {
      const { data } = await postNewMessage({ conversationID: parseInt(id!), content: msg });
      dispatch(addMessage({
        id: parseInt(id!),
        message: data
      }))
      setMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  return (
    <ConversationInputWrapper onSubmit={submitHandler}>
      <div>
        <BsPlusCircleFill />
      </div>
      <MsgInput
        name="msg"
        id="msg"
        placeholder={`Message ${name}`}
        value={msg}
        ref={inputRef}
        onChange={changeHandler}
        onKeyDown={typingSts}
        onKeyUp={sendTypingEnd}
      />
      <div>
        <BsEmojiSmileFill />
      </div>
    </ConversationInputWrapper>
  );
};

export default ConversationInput;
