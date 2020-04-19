import { useLazyQuery } from "@apollo/react-hooks";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GitHubIcon from "@material-ui/icons/GitHub";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { UserLoginInput } from "../../../__generated__/globalTypes";
import { Encrypt } from "../../common/encrypt";
import { client } from "../../common/graphql";
import { storeAuthToken } from "../../common/utils";
import { LoginToken } from "../../graphql/__generated__/LoginToken";
import {
  UserLogin,
  UserLoginVariables,
} from "../../graphql/__generated__/UserLogin";
import { LOGIN_TOKEN, USER_LOGIN } from "../../graphql/queries";
import { useHistory } from "react-router-dom";

type ILoginMessage = {
  show: boolean;
  message: string;
};

const thirdPartLogin = (type: string) => {
  window.location.replace(
    `${
      process.env.REACT_APP_AUTH_URL
    }?type=${type}&redirectUrl=${encodeURIComponent(window.location.href)}`
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 360,
      margin: "auto",
      textAlign: "center",
      padding: theme.spacing(2),
    },
    formItemRoot: {
      margin: "12px auto",
    },
    buttonFullWidth: {
      margin: "3px auto",
    },
    dividerRoot: {
      margin: "12px auto",
    },
  })
);

const LoginSchema = yup.object().shape<UserLoginInput>({
  account: yup.string().required().max(32),
  password: yup.string().required().max(32),
});

const LoginForm = () => {
  const { handleSubmit, control, errors } = useForm<UserLoginInput>({
    validationSchema: LoginSchema,
  });

  const classes = useStyles();

  const [userLogin, { loading, data }] = useLazyQuery<
    UserLogin,
    UserLoginVariables
  >(USER_LOGIN);

  const [loginMessage, setLoginMessage] = useState<ILoginMessage>({
    show: false,
    message: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (data?.userLogin) {
      storeAuthToken(data.userLogin);
      history.push("/home");
    }
  }, [data]);

  const onSubmit = async (data: UserLoginInput) => {
    const tokenRes = await client.query<LoginToken>({
      query: LOGIN_TOKEN,
    });
    if (!tokenRes.data.loginToken) {
      return;
    }
    const encrypt = Encrypt.getInstance();
    const encryptedPassword = await encrypt.rsaEncrypt(
      tokenRes.data.loginToken.publicKey,
      JSON.stringify({
        token: tokenRes.data.loginToken.token,
        text: data.password,
      })
    );
    userLogin({
      variables: {
        input: {
          account: data.account,
          password: encryptedPassword,
        },
      },
    });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">登录</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          name="account"
          label="用户名"
          required
          fullWidth
          variant="outlined"
          // @ts-ignore
          control={control}
          defaultValue=""
          rules={{ required: true }}
          classes={{
            root: classes.formItemRoot,
          }}
          error={!!errors.account}
          helperText={errors.account?.message}
        />
        <Controller
          as={TextField}
          name="password"
          label="密码"
          required
          fullWidth
          variant="outlined"
          type="password"
          // @ts-ignore
          control={control}
          defaultValue=""
          rules={{ required: true }}
          classes={{
            root: classes.formItemRoot,
          }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
          classes={{
            fullWidth: classes.buttonFullWidth,
          }}
          disabled={loading}
        >
          登录
        </Button>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          classes={{
            fullWidth: classes.buttonFullWidth,
          }}
          onClick={() => history.push("/user/signup")}
        >
          注册
        </Button>
      </form>
      <Divider classes={{ root: classes.dividerRoot }} />
      <Typography variant="subtitle2">第三方账号登录</Typography>
      <div>
        <IconButton onClick={() => thirdPartLogin("github")}>
          <GitHubIcon />
        </IconButton>
      </div>
      <Snackbar
        open={loginMessage.show}
        onClose={() => setLoginMessage({ show: false, message: "" })}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error">{loginMessage.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default LoginForm;
