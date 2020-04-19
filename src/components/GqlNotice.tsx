import React, { useLayoutEffect } from "react";

import { useSnackbar } from "notistack";

import { EE } from "../common/events";

const GqlNotice: React.FC = () => {
  const handleShowSnackbar = (message: string, option: any) => {
    console.log("1111111", message);
    enqueueSnackbar(message, option);
  };

  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    EE.addListener("notistack", handleShowSnackbar);
    return () => {
      EE.removeListener("notistack", handleShowSnackbar);
    };
  }, []);

  return <div></div>;
};

export default GqlNotice;
