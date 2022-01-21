import React from "react";
import { Icons } from "../styles";
import lampadaOn from "../../assets/icons/lampadaOn.svg";
import lampadaOff from "../../assets/icons/lampadaOff.svg";

const claro = <Icons src={lampadaOff} alt="Tema Claro" />;
const escuro = <Icons src={lampadaOn} alt="Tema escuro" />;

export default ({ theme }) => (theme ? escuro : claro);
