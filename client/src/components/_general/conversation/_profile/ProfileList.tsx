import React from 'react'
import { ProfileListContainer, Section } from '../../../_styled/ConversationPage'

const ProfileList = () => {
  return (
    <ProfileListContainer>
        <header>Participants</header>
        <Section>Online users</Section>
        <Section>Offline users</Section>
    </ProfileListContainer>
  )
}

export default ProfileList