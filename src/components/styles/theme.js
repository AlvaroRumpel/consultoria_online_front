import {
  fundoClaro,
  conteudoClaro,
  textoFundoClaro,
  conteudoEscuro,
  fundoEscuro,
  textoFundoEscuro,
} from "./GlobalStyles";

export const themeClaro = {
  body: fundoClaro,
  inside: conteudoClaro,
  text: textoFundoClaro,
  filter: "",
};

export const themeEscuro = {
  body: fundoEscuro,
  inside: conteudoEscuro,
  text: textoFundoEscuro,
  filter: "invert(100%)",
};
