import React from 'react'
import { ProfileListContainer, Section, UserListWrapper } from '../../../_styled/ConversationPage'
import ProfileCard from './ProfileCard';
import imgSrc from "../../../../assets/my_pic.jpg"

const ProfileList = () => {

  const onlineCount: number = 1;
  const offlineCount: number = 1;

  return (
    <ProfileListContainer>
        <header>Participants</header>
        <Section>
          <header>Online Users - {`(${onlineCount})`}</header>
          <UserListWrapper>
            {new Array(onlineCount).fill("").map((_, i) => {
              return (
                <ProfileCard avatar={imgSrc} name="Piush Bose" id={i} key={i} sts="Hey wassup!!" />
              )
            })}
          </UserListWrapper>
        </Section>
        <Section>
          <header>Offline Users - {`(${offlineCount})`}</header>
          <UserListWrapper>
            {new Array(offlineCount).fill("").map((_, i) => {
              return (
                <ProfileCard avatar={imgSrc} name="Piush Bose" id={i} key={i} sts="Hey wassup!!" />
              )
            })}
          </UserListWrapper>
        </Section>
    </ProfileListContainer>
  )
}

export default ProfileList