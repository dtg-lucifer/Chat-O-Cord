import React from 'react'
import { PanelHeaderProps } from '../../../../types/ComponentProps/ConversationPanel'
import { CardWrapper } from '../../../_styled/ConversationPage'

const ProfileCard: React.FC<PanelHeaderProps> = ({ avatar, name, sts }) => {
  return (
    <CardWrapper>
        <img src={avatar} alt="profile_pic" />
        <div>
            <header>{name}</header>
            <span>{sts}</span>
        </div>
    </CardWrapper>
  )
}

export default ProfileCard