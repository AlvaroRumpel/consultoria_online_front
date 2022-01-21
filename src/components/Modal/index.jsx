import React from "react";
import { MainParagraph, SectionH, Title } from "../styles";
import {
  Backgound,
  BackgroundFill,
  BtnCancel,
  BtnClose,
  BtnConfirm,
} from "./style";

const Modal = ({ title, content, btnConfirm, btnClose, btnCancel, open }) => {
  const checkStatus = (open) => {
    return open ? (
      <Backgound>
        <BackgroundFill>
          <Title>{title}</Title>
          <MainParagraph>{content}</MainParagraph>
          <SectionH>
            {btnConfirm ? (
              <BtnConfirm
                onClick={() => {
                  btnConfirm.func();
                }}
              >
                {btnConfirm.text}
              </BtnConfirm>
            ) : (
              false
            )}
            {btnClose ? (
              <BtnClose onClick={btnClose.func}>{btnClose.text}</BtnClose>
            ) : (
              false
            )}
            {btnCancel ? (
              <BtnCancel onClick={btnCancel.func}>{btnCancel.text}</BtnCancel>
            ) : (
              false
            )}
          </SectionH>
        </BackgroundFill>
      </Backgound>
    ) : (
      false
    );
  };
  return checkStatus(open);
};

export default Modal;
