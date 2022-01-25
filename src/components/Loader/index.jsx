import React from "react";
import { Backgound, LoaderIcon } from "./style";

const Loader = ({ active }) => {
  return active ? (
    <Backgound>
      <LoaderIcon />
    </Backgound>
  ) : null;
};

export default Loader;
