import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/Logo.png";
import { ButtonEmpty } from "../styles";
import { Header, Logo } from "./style";

const NavHeader = () => {
  return (
    <Header>
      <Link to={`/`}>
        <Logo src={logo} />
      </Link>
      <Link to={`/contact`}>
        <ButtonEmpty>Contato</ButtonEmpty>
      </Link>
      <Link to={`/`}>
        <ButtonEmpty>Home</ButtonEmpty>
      </Link>
    </Header>
  );
};

export default NavHeader;
