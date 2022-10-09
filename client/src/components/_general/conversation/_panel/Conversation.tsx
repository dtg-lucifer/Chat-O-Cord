import React from 'react'
import { PanelHeaderProps } from '../../../../types/ComponentProps/ConversationPanel'
import { ConversationWrapper } from '../../../_styled/ConversationPage'

const Conversation: React.FC<PanelHeaderProps> = ({
    name,
    id,
    avatar,
    sts
}) => {
  return (
    <ConversationWrapper>
        {name}
    </ConversationWrapper>
  )
}

export default Conversation