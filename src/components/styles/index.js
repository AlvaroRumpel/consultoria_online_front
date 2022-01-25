import styled from "styled-components";
import { corPrimaria, corSecundaria } from "./GlobalStyles";

export const ContainerV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  height: 90vh;
`;

export const SectionV = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
  padding: 1rem 1rem;
  width: 100%;
  height: 100%;
`;

export const SectionH = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 2rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 0.5rem 0;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media (max-width: 430px) {
    font-size: 1.5rem;
  }
`;

export const MainParagraph = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media (max-width: 425px) {
    font-size: 1rem;
  }
`;

export const StandardParagraph = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const Form = styled.form`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0 0.2rem 0;
  color: ${({ theme }) => theme.text};
`;

export const InputStandard = styled.input`
  border-radius: 10px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 0.15rem solid ${corSecundaria};
  background: none;
  color: ${({ theme }) => theme.text};

  ::placeholder {
    color: ${({ theme }) => theme.text};
  }
`;

export const InputLarge = styled(InputStandard)`
  width: 60%;

  @media (max-width: 375px) {
    width:  90%;
  }
`;

export const ButtonFilled = styled.button`
  align-self: center;
  width: 100%;
  margin: 0.5rem 0;
  background-color: ${corPrimaria};
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 20px;
  border: 0.2rem solid ${corPrimaria};
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background-color: #05719c;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const ButtonOutlined = styled(ButtonFilled)`
  background: none;

  :hover {
    background: none;
    border: 0.2rem solid #05719c;
  }
`;

export const ButtonEmpty = styled(ButtonFilled)`
  background: none;
  border: none;

  :hover {
    background: none;
    font-weight: 800;
    font-size: 1.1rem;
  }
`;

export const ButtonFilledSmall = styled(ButtonFilled)`
  width: 30%;

  @media (max-width: 375px) {
    width:  90%;
  }
`;

export const BtnTema = styled.button`
  position: absolute;
  top: 14vh;
  right: 20px;
  z-index: 99999;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

export const ListStandart = styled.ul`
  background-color: ${({ theme }) => theme.inside};
  width: 93%;
  border: 2px solid ${corSecundaria};
  border-radius: 15px;
  padding: 1rem 2rem;
`;
export const ListStandartItem = styled.li`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 0;
  font-weight: 600;
  font-size: 1.2rem;
  list-style: none;

  :not(:first-child) {
    border-top: 1px solid ${corSecundaria};
  }
`;

export const Icons = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
  filter: ${({ theme }) => theme.filter};
`;
