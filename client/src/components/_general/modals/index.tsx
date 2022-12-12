import React from "react"
import { ModalContainerStyle, ModalContentStyle, ModalHeaderStyle } from "../../_styled/ConversationPage"

export const ModalHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <ModalHeaderStyle>{children}</ModalHeaderStyle>
}

export const ModalContent : React.FC<React.PropsWithChildren> = ({ children }) => {
    return <ModalContentStyle>{children}</ModalContentStyle>
}

export const ModalContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <ModalContainerStyle>{children}</ModalContainerStyle>
}