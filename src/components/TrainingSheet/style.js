import styled from "styled-components";
import { Icons, InputStandard } from "../styles";
import { corSecundaria } from "../styles/GlobalStyles";

export const Sheet = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  border: 2px solid ${corSecundaria};
  border-radius: 15px;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.inside};

  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem 1rem;
  }
`;

export const SheetSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem 0.5rem;
  width: 100%;
  border: 2px dotted ${corSecundaria};
  border-radius: 15px;
  padding: 0.5rem;
  margin: 1rem 0;

  @media (max-width: 290px) {
    grid-template-columns: 1fr;
  }
`;

export const Selector = styled.select`
  border: 2px solid ${corSecundaria};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1rem;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const Option = styled.option`
  font-size: 1rem;
  font-weight: 600;
`;

export const InputSheet = styled(InputStandard)`
  margin: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.body};
`;

export const SheetLabel = styled.label`
  margin: 0.3rem 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const SheetLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconsSheet = styled(Icons)`
  border: 2px solid #0f0f0f;
  border-radius: 5px;
  padding: 2px;
  margin: 2rem 0;
  grid-column: span 2;
  align-self: center;
  justify-self: center;
`;

export const IconsLessSheet = styled(Icons)`
  border: 2px solid #0f0f0f;
  border-radius: 5px;
  padding: 2px;
  position: absolute;
  right: 5%;
  top: 2rem;

  @media (max-width: 425px) {
    top: 5rem;
  }
`;
