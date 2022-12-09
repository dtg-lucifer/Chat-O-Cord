import React, { useContext } from 'react'
import { PanelHeaderProps } from '../../../../types/ComponentProps/ConversationPanel'
import { AuthContext } from '../../../../utils/context/AuthContext'
import { ConversationWrapper } from '../../../_styled/ConversationPage'

const Conversation: React.FC<PanelHeaderProps> = ({
    name,
    id,
    avatar,
    sts
}) => {
  const {user} = useContext(AuthContext)
  return (
    <ConversationWrapper>
        {name} {user?.email}
    </ConversationWrapper>
  )
}

export default Conversation