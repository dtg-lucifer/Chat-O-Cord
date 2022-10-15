import React from 'react'
import { ProfileListContainer, Section, UserListWrapper } from '../../../_styled/ConversationPage'

const ProfileList = () => {

  const onlineCount: number = 5;
  const offlineCount: number = 17;

  return (
    <ProfileListContainer>
        <header>Participants</header>
        <Section>
          <div>Online Users - {`(${onlineCount})`}</div>
          <UserListWrapper></UserListWrapper>
        </Section>
        <Section>
          <div>Offline Users - {`(${offlineCount})`}</div>
          <UserListWrapper></UserListWrapper>
        </Section>
    </ProfileListContainer>
  )
}

export default ProfileList