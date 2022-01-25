import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

body {
  background-color: ${({ theme }) => theme.body};
}

textarea:focus, input:focus, select:focus {
    outline: 0;
} 
`;

export const corPrimaria = "#058bc0";
export const corSecundaria = "#058bc05f";

export const fundoClaro = "#F4FFFF";
export const conteudoClaro = "#DFFFFF"
export const textoFundoClaro = "#1f1f1f";

export const fundoEscuro = "#090933"
export const conteudoEscuro = "#0F0F52"
export const textoFundoEscuro = "#fafafa"
