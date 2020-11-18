import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import AppBar from "@material-ui/core/AppBar";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { AddUserWordInput } from "../../../../__generated__/globalTypes";
import {
  AddNewWord,
  AddNewWordVariables,
} from "../../../graphql/__generated__/AddNewWord";
import { ADD_NEW_WORD } from "../../../graphql/mutations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    content: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
      flex: 1,
      margin: theme.spacing(2),
      overflow: "auto",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

interface IWordInputDialogProps extends DialogProps {
  onManualClose: () => void;
}

const WordInputDialog: React.FC<IWordInputDialogProps> = (props) => {
  const { onManualClose, ...restProps } = props;

  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm<AddUserWordInput>({
    mode: "onChange",
  });
  const [addNewWord] = useMutation<AddNewWord, AddNewWordVariables>(
    ADD_NEW_WORD
  );
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    onManualClose();
  };

  const handleSave = async (data: AddUserWordInput) => {
    setLoading(true);
    const res = await addNewWord({
      variables: {
        input: data,
      },
    });
    setLoading(false);
    if (res.data?.addUserWord?.id) {
      onManualClose();
    }
  };

  console.log("errors:", errors);

  return (
    <Dialog {...restProps}>
      <form
        className={classes.root}
        onSubmit={handleSubmit(handleSave)}
        noValidate
        autoComplete="off"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              添加生词
            </Typography>
            <Button disabled={loading} autoFocus color="inherit" type="submit">
              保存
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Controller
            control={control}
            as={
              <TextField
                error={!!errors.word}
                fullWidth
                label="生词"
                placeholder="请输入生词"
                variant="outlined"
                helperText={<ErrorMessage errors={errors} name="word" />}
              />
            }
            name="word"
            rules={{
              required: {
                value: true,
                message: "必填",
              },
              maxLength: {
                value: 32,
                message: "单词过长",
              },
            }}
            defaultValue=""
          />
          <Controller
            control={control}
            as={
              <TextField
                fullWidth
                label="翻译"
                placeholder="请输入翻译（可不填）"
                variant="outlined"
                helperText={<ErrorMessage errors={errors} name="translation" />}
              />
            }
            name="translation"
            rules={{
              maxLength: {
                value: 512,
                message: "翻译过长",
              },
            }}
            multiline
            rows="4"
            defaultValue=""
          />
          <Controller
            control={control}
            as={
              <TextField
                fullWidth
                label="例句"
                placeholder="请输入例句（可不填）"
                variant="outlined"
                helperText={<ErrorMessage errors={errors} name="example" />}
              />
            }
            name="example"
            rules={{
              maxLength: {
                value: 512,
                message: "例句过长",
              },
            }}
            multiline
            rows="4"
            defaultValue=""
          />
        </div>
      </form>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default WordInputDialog;
