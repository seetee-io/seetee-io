import React from "react";
import { StyleSheetManager } from "styled-components";

export default ({ element }) => {
  const Content = <>{element}</>;

  return process.env.NODE_ENV === "production" ? (
    Content
  ) : (
    <StyleSheetManager disableVendorPrefixes>{Content}</StyleSheetManager>
  );
};
