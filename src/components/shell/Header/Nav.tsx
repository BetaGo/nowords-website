import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import React from "react";
import { useHistory } from "react-router-dom";

import { User } from "../../../graphql/__generated__/User";
import { useLoginStatus } from "../../../hooks/useLoginStatus";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 250,
    height: "100%",
  },
  centerList: {
    flex: 1,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  user: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}));

export interface INavProps extends SwipeableDrawerProps {
  toggle: () => void;
  user?: User;
}

const Nav: React.FC<INavProps> = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { logout } = useLoginStatus();

  const handleClick = (path?: string) => (e: React.MouseEvent) => {
    if (path) {
      history.push(path);
    }
    props.toggle();
  };

  const { toggle, user, ...restProps } = props;

  return (
    <SwipeableDrawer {...restProps}>
      <div className={classes.list}>
        <div className={classes.user}>
          <Avatar
            alt="avatar"
            src={user?.user?.avatar || ""}
            className={classes.large}
          >
            {user?.user?.displayName?.[0]}
          </Avatar>
          <Typography variant="body1">{user?.user?.displayName}</Typography>
          <Typography variant="body2">{user?.user?.email}</Typography>
        </div>
        <List className={classes.centerList}>
          <ListItem button onClick={handleClick("/words")}>
            <ListItemIcon>
              <GTranslateIcon />
            </ListItemIcon>
            <ListItemText>记单词</ListItemText>
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>退出登录</ListItemText>
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Nav;
