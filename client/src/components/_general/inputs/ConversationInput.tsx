import React, { useState, useRef } from 'react'
import { MessageInputProps } from '../../../types/StyledComponentProps/ConversationPage'
import { ConversationInputWrapper, MsgInput } from '../../_styled/ConversationPage'
import { BsPlusCircleFill, BsEmojiSmileFill } from "react-icons/bs"

const ConversationInput: React.FC<MessageInputProps> = ({ name, id }) => {

    const [msg, setMsg] = useState<string | undefined>("")
    const inputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(msg);
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value)
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setMsg(inputRef.current?.value)
        }
    }

  return (
    <ConversationInputWrapper onSubmit={submitHandler}>
        <div><BsPlusCircleFill /></div>
        <MsgInput name='msg' id='msg' placeholder={`Message ${name}`} ref={inputRef} onKeyDown={keyDownHandler} onChange={changeHandler} />
        <div><BsEmojiSmileFill /></div>
    </ConversationInputWrapper>
  )
}

export default ConversationInput