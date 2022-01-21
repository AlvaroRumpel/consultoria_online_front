import React from "react";
import {
  ContainerV,
  Icons,
  SectionH,
  SectionV,
  StandardParagraph,
  Title,
} from "../styles/index";
import backgoundImageHome from "../../assets/img/backgroundHome.jpeg";
import profileImage from "../../assets/img/profile.jpg";
import linkedinImage from "../../assets/icons/linkedin.png";
import instagramImage from "../../assets/icons/instagram.png";
import {
  BackgroundImage,
  Banner,
  TitleBanner,
  MainParagraphBanner,
  CardDeveloper,
  ProfileIcon,
  ContactSection,
  ContactLink,
  ButtonAboutFilled,
  ButtonAboutOutlined,
} from "./style";
import { Link } from "react-router-dom";

const Home = () => {
  const texts = {
    welcome: "Bem-vindo!",
    thanks: "Obrigado por acessar este projeto",
    about: "Sobre",
    aboutText:
      "O projeto consultoria online tem como objetivo a vizualização de fichas de treino de maneira mais facil e com a possibilidade de acesso em diferentes lugares. Primeiro projeto desenvolvido por mim, Álvaro Rumpel, serve majoritariamente como portifólio e estudo.",
    aboutText2: "Agora, faça cadastre-se ou faça login!",
    developerArea: "Área do Desenvolvedor",
    developerName: "Álvaro C. Rumpel",
    developerText:
      "Olá! Sou um desenvolvedor iniciante, estou terminando a faculdade de sistemas de informação, atualmente trabalhando com desenvolvimento de software como um estágiario fullstack, então este é meu primeiro projeto desenvolvido sozinho, obrigado pelo interesse!",
  };

  // useEffect(async () => {
  //   const token = await localStorage.getItem("token")
  //   console.log(token);
  //   await api
  //     .get("/clients", {
  //       headers: {
  //         'Authorization': 'Bearer ' + token,
  //       },
  //     })
  //     .then((response) => console.log(response.data));
  // });

  return (
    <ContainerV>
      <Banner>
        <TitleBanner>{texts.welcome}</TitleBanner>
        <MainParagraphBanner>{texts.thanks}</MainParagraphBanner>
        <BackgroundImage src={backgoundImageHome} />
      </Banner>
      <SectionV>
        <Title>{texts.about}</Title>
        <StandardParagraph>{texts.aboutText}</StandardParagraph>
        <StandardParagraph>{texts.aboutText2}</StandardParagraph>
        <SectionH>
          <Link to="/login">
            <ButtonAboutFilled>Login</ButtonAboutFilled>
          </Link>
          <Link to="/singup">
            <ButtonAboutOutlined>Cadastre-se</ButtonAboutOutlined>
          </Link>
        </SectionH>
      </SectionV>
      <SectionV>
        <Title>{texts.developerArea}</Title>
        <CardDeveloper>
          <ProfileIcon src={profileImage} />
          <Title>{texts.developerName}</Title>
          <StandardParagraph>{texts.developerText}</StandardParagraph>
          <ContactSection>
            <ContactLink
              href="https://www.linkedin.com/in/alvaro-rumpel"
              target="_blank"
              rel="noreferrer"
            >
              <Icons src={linkedinImage} />
              Linkedin
            </ContactLink>

            <ContactLink
              href="https://www.instagram.com/alvaro_cr13/"
              target="_blank"
              rel="noreferrer"
            >
              <Icons src={instagramImage} />
              Instagram
            </ContactLink>
          </ContactSection>
        </CardDeveloper>
      </SectionV>
    </ContainerV>
  );
};

export default Home;
