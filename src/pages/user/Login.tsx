import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Helmet } from "react-helmet";

import LoginForm from "../../components/user/LoginForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(20),
    },
  })
);

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>NO WORDS -- 登录</title>
      </Helmet>
      <LoginForm />
    </div>
  );
};

export default Login;
