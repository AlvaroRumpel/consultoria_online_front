import styled from "styled-components";
import { corPrimaria } from "../styles/GlobalStyles";

export const Header = styled.nav`
  background-color: ${corPrimaria};
  display: flex;
  justify-content: space-between;
  padding: 0 15vw;
  height: 10vh;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0;
    justify-content: center;
  }
`;

export const Logo = styled.img`
  height: 50px;
  width: 50px;
  filter: ${({ theme }) => theme.filter};

  @media (max-width: 600px){
    display: none;
  }
`;