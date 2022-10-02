import React from "react";
import { AboutCotainer, AboutHeader, BtnContainer, Button, MainSection, MainWrapper, NameContainer, UserIcon } from "../../_styled/ProfileCard";
import styles from "../styles/ProfileCard/profilecard.module.css"

const Profilecard = () => {
  return (
    <>
      <MainWrapper>
        <MainSection>
          <UserIcon></UserIcon>
          <BtnContainer>
            <Button id="call"></Button>
            <Button id="msg"></Button>
            <Button id="group"></Button>
          </BtnContainer>
        </MainSection>
        <NameContainer>Srijib_Dev</NameContainer>
        <AboutCotainer>
          <AboutHeader>About Me</AboutHeader>
          <AboutCotainer>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi,
            nam ipsum hic numquam s
          </AboutCotainer>
        </AboutCotainer>
      </MainWrapper>
    </>
  );
};

export default Profilecard;
