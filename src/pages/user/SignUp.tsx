import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Helmet } from "react-helmet";

import SignUpForm from "../../components/user/SignUpForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(20),
    },
  })
);

const SignUp: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>NO WORDS -- 注册</title>
      </Helmet>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
