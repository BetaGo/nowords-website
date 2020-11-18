import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { AddUserInput } from "../../../__generated__/globalTypes";
import { Encrypt } from "../../common/encrypt";
import { client } from "../../common/graphql";
import { storeAuthToken } from "../../common/utils";
import { AddUser, AddUserVariables } from "../../graphql/__generated__/AddUser";
import { EncryptToken } from "../../graphql/__generated__/EncryptToken";
import { ADD_USER } from "../../graphql/mutations";
import { ENCRYPT_TOKEN } from "../../graphql/queries";

type ISignUpMessage = {
  show: boolean;
  message: string;
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

const SignUpSchema = yup.object().shape<AddUserInput>({
  username: yup.string().required().max(32),
  password: yup.string().required().max(32),
  displayName: yup.string().required().max(32),
  email: yup.string().email(),
  phone: yup.string().max(32),
});

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, control, errors } = useForm<AddUserInput>({
    resolver: yupResolver(SignUpSchema),
  });
  const [addUser, { data, loading }] = useMutation<AddUser, AddUserVariables>(
    ADD_USER
  );
  const [signUpMessage, setSignUpMessage] = useState<ISignUpMessage>({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (data?.addUser) {
      storeAuthToken(data.addUser);
    }
  }, [data]);

  const onSubmit = async (values: AddUserInput) => {
    const tokenRes = await client.query<EncryptToken>({
      query: ENCRYPT_TOKEN,
    });
    if (!tokenRes.data.encryptToken) {
      return;
    }
    const encrypt = Encrypt.getInstance();
    const encryptedPassword = await encrypt.rsaEncrypt(
      tokenRes.data.encryptToken.publicKey,
      JSON.stringify({
        token: tokenRes.data.encryptToken.token,
        text: values.password,
      })
    );
    values.password = encryptedPassword;
    addUser({
      variables: {
        input: values,
      },
    })
      .then((res) => {
        history.replace("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">注册</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          name="username"
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
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <Controller
          as={TextField}
          name="displayName"
          label="昵称"
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
          error={!!errors.displayName}
          helperText={errors.displayName?.message}
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
        <Controller
          as={TextField}
          name="email"
          label="邮箱"
          fullWidth
          variant="outlined"
          // type="email"
          // @ts-ignore
          control={control}
          defaultValue=""
          rules={{ required: true }}
          classes={{
            root: classes.formItemRoot,
          }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Controller
          as={TextField}
          name="phone"
          label="手机号"
          fullWidth
          variant="outlined"
          control={control}
          defaultValue=""
          classes={{
            root: classes.formItemRoot,
          }}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          classes={{
            fullWidth: classes.buttonFullWidth,
          }}
          disabled={loading}
        >
          注册
        </Button>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          classes={{
            fullWidth: classes.buttonFullWidth,
          }}
          onClick={() => history.push("/user/login")}
        >
          已有账号？点此登录
        </Button>
      </form>
      <Snackbar
        open={signUpMessage.show}
        onClose={() => setSignUpMessage({ show: false, message: "" })}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error">{signUpMessage.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default SignUpForm;
