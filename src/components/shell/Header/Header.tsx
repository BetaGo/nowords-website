import { Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useToggle } from "react-use";

import { useUserInfo } from "../../../hooks/useUserInfo";
import Nav from "./Nav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function TopAppBar() {
  const classes = useStyles();
  const [navOpen, toggleNavOpen] = useToggle(false);
  const { loading, data } = useUserInfo();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleNavOpen}
          >
            {loading ? <HourglassEmptyIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Awesome
          </Typography>
          {data?.user ? (
            <Avatar src={data.user.avatar || ""}>
              {data.user.displayName[0]}
            </Avatar>
          ) : (
            <Button color="inherit" href="/user/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Nav
        user={data}
        open={navOpen}
        toggle={toggleNavOpen}
        onOpen={toggleNavOpen}
        onClose={toggleNavOpen}
      />
    </>
  );
}
