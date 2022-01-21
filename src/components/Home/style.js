import styled from "styled-components";
import { ButtonFilled, ButtonOutlined, MainParagraph, Title } from "../styles";
import { corPrimaria } from "../styles/GlobalStyles";

export const Banner = styled.section`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.body};
`;

export const BackgroundImage = styled.img`
  height: calc(70vh - 10vh);
  width: 100%;
  object-fit: cover;
  object-position: bottom;
  filter: opacity(30%);

  @media (max-width: 767px) {
    height: calc(50vh - 10vh);
  }
`;

export const TitleBanner = styled(Title)`
  margin: 0;
  position: absolute;
  font-size: 4rem;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -100%);
  z-index: 1;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

export const MainParagraphBanner = styled(MainParagraph)`
  position: absolute;
  font-size: 2rem;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, 10%);
  z-index: 1;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

export const ButtonAboutFilled = styled(ButtonFilled)`
  width: 15rem;
  height: 4rem;
`;

export const ButtonAboutOutlined = styled(ButtonOutlined)`
  width: 15rem;
  height: 4rem;
`;

export const CardDeveloper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background-color: ${({ theme }) => theme.inside};
  box-shadow: 0 0 2rem #003bff2f;
  padding: 1.5rem 1rem;
  margin: 0.5rem;
  width: 20rem;

  @media (max-width: 425px) {
    width: 80%;
  }
`;

export const ProfileIcon = styled.img`
  height: 12rem;
  width: 12rem;
  object-fit: cover;
  border-radius: 50%;
  border: 0.3rem solid ${corPrimaria};

  @media (max-width: 425px) {
    height: 6rem;
    width: 6rem;
  }
`;

export const ContactSection = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0 0;
  justify-content: space-around;
  align-items: center;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0 0.5rem;
  justify-content: space-around;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  @media (max-width: 430px) {
    font-size: 0.7rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
  }
`;
