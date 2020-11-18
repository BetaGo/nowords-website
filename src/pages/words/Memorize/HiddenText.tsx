import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React from "react";
import { useToggle } from "react-use";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      textAlign: "center",
    },
    text: {
      whiteSpace: "pre-wrap",
    },
  })
);

const HiddenText: React.FC = (props) => {
  const classes = useStyles();
  const [visible, toggleVisible] = useToggle(false);
  return (
    <>
      <div className={classes.icon}>
        {visible ? (
          <VisibilityOffIcon onClick={toggleVisible} />
        ) : (
          <VisibilityIcon onClick={toggleVisible} />
        )}
      </div>
      {visible ? (
        <Typography variant="body2" className={classes.text}>
          {props.children}
        </Typography>
      ) : null}
    </>
  );
};

export default HiddenText;
