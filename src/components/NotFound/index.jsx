import React from "react";
import { Link } from "react-router-dom";
import { ContainerV, MainParagraph, SectionV, Title } from "../styles";

const NotFound = () => {
  return (
    <ContainerV>
      <SectionV>
        <Title>Pagina não encontrada</Title>
        <MainParagraph>Por favor retorne a pagina principal</MainParagraph>
        <Link to="/home"></Link>
      </SectionV>
    </ContainerV>
  );
};

export default NotFound;
