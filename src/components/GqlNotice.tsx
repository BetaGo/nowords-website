import React, { useLayoutEffect, useCallback } from "react";

import { useSnackbar } from "notistack";

import { EE } from "../common/events";

const GqlNotice: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleShowSnackbar = useCallback(
    (message: string, option: any) => {
      enqueueSnackbar(message, option);
    },
    [enqueueSnackbar]
  );

  useLayoutEffect(() => {
    EE.addListener("notistack", handleShowSnackbar);
    return () => {
      EE.removeListener("notistack", handleShowSnackbar);
    };
  }, [handleShowSnackbar]);

  return <div></div>;
};

export default GqlNotice;
