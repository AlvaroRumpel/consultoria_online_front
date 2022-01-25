import styled from "styled-components";
import { corPrimaria } from "../styles/GlobalStyles";

export const LoaderIcon = styled.div`
  border: 8px solid #ffffff00;
  border-top: 8px solid ${corPrimaria};
  border-bottom: 8px solid ${corPrimaria};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;

  @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export const Backgound = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
  width: 100vw;
  height: 110vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1;
  transform: translate(0%, -10%);
`;
