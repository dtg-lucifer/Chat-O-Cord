import styled from "styled-components";
import img from "../../assets/my_pic.jpg";

export const MainWrapper = styled.div`
  background-color: #222;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: 500px;
  background-position: 0 -120px;
  width: 450px;
  border-radius: 20px;
  padding: 0 20px 30px 20px;
`;

export const MainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 140px;
  position: relative;
`;

export const UserIcon = styled.div`
  height: 120px;
  width: 120px;
  background: #fff;
  border-radius: 50%;
  border: 5px solid #007a14;
  top: -40px;
  position: relative;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Button = styled.div`
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 50%;
`;

export const NameContainer = styled.span`
  color: white;
  font-family: "Harmattan", sans-serif;
  font-size: 40px;
  margin-left: 50px;
`;

export const AboutCotainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 50px;
  gap: 10px;
`;

export const AboutHeader = styled.h2`
  color: rgb(255 255 255 / 0.35);
  font-family: "Harmattan", sans-serif;
  font-size: 34px;
`;

export const AboutText = styled.div`
  max-width: auto;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
  color: #fff;
  border-radius: 15px;
  font-family: "Harmattan", sans-serif;
  font-size: 25px;
  text-align: left;
`;
