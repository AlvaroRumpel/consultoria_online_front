import React from "react";
import { Backgound, LoaderIcon } from "./style";
import {StandardParagraph} from "../styles"

const Loader = ({ active, text }) => {
  return active ? (
    <Backgound>
      <LoaderIcon />
      <StandardParagraph>{text}</StandardParagraph>
    </Backgound>
  ) : null;
};

export default Loader;
