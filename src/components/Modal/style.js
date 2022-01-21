import styled from "styled-components";
import { ButtonFilled } from "../styles";

export const Backgound = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
  width: 100vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
`;

export const BackgroundFill = styled.div`
  background-color: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  padding: 2rem;
  width: 50%;
  height: 50%;

  @media (max-width: 768px) {
    height: 90%;
    width: 90%;
  }
`;

export const BtnConfirm = styled(ButtonFilled)`
  background-color: rgb(0, 230, 77);
  border-color: rgb(0, 230, 77);
  width: 30%;

  :hover {
    background-color: rgb(0, 179, 60);
    border-color: rgb(0, 179, 60);
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const BtnCancel = styled(ButtonFilled)`
  background-color: rgb(204, 0, 0);
  border-color: rgb(204, 0, 0);
  width: 30%;

  :hover {
    background-color: rgb(153, 0, 0);
    border-color: rgb(153, 0, 0);
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const BtnClose = styled(ButtonFilled)`
  background-color: rgb(104, 104, 104);
  border-color: rgb(104, 104, 104);
  width: 30%;

  :hover {
    background-color: rgb(84, 84, 84);
  border-color: rgb(84, 84, 84);
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;