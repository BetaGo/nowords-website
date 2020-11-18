import { useQuery } from "@apollo/client";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from "@material-ui/core/Slide";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

import {
  UserWords,
  UserWordsVariables,
} from "../../../graphql/__generated__/UserWords";
import { USER_WORDS } from "../../../graphql/queries";
import WordInputDialog from "./WordInputDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      paddingBottom: theme.spacing(8),
      overflow: "auto",
    },
    actions: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(3),
    },
  })
);

const MyWords = () => {
  const classes = useStyles();

  const [inputOpen, setInputOpen] = React.useState(false);

  const { data } = useQuery<UserWords, UserWordsVariables>(USER_WORDS, {
    variables: {
      first: 20,
    },
  });

  const handleClickAdd = () => {
    setInputOpen(true);
  };

  const handleCloseInputDialog = () => {
    setInputOpen(false);
  };

  return (
    <>
      <List className={classes.root}>
        {data?.allUserWords?.edges?.map((v) => (
          <ExpansionPanel key={v.node.id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    onClick={(e) => e.stopPropagation()}
                    // inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography>{v.node.word}</Typography>
                </ListItemText>
              </ListItem>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{v.node.example}</Typography>
              <Typography>{v.node.translation}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </List>
      <Fab
        className={classes.actions}
        color="primary"
        aria-label="remember"
        onClick={handleClickAdd}
      >
        <AddIcon />
      </Fab>
      <WordInputDialog
        open={inputOpen}
        fullScreen
        onClose={handleCloseInputDialog}
        onManualClose={handleCloseInputDialog}
        TransitionComponent={Transition}
      />
    </>
  );
};

export default MyWords;
