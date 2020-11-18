import { useMutation, useQuery } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";

import {
  NewWords,
  NewWords_allNewWords_edges,
  NewWordsVariables,
} from "../../../graphql/__generated__/NewWords";
import {
  UpdateNewWord,
  UpdateNewWordVariables,
} from "../../../graphql/__generated__/UpdateNewWord";
import { UPDATE_NEW_WORD } from "../../../graphql/mutations";
import { NEW_WORDS } from "../../../graphql/queries";
import WordCardList from "./WordCardList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      flex: 1,
    },
    content: {
      display: "flex",
      flexDirection: "column",
    },
    noWords: {
      margin: "auto",
      padding: theme.spacing(2),
      textAlign: "center",
    },
    action: {
      display: "flex",
      justifyContent: "space-evenly",
      alignContent: "center",
    },
  })
);

const Memorize = () => {
  const classes = useStyles();

  const [listCursor, setListCursor] = React.useState(0);

  const {
    data: newWordsData,
    loading: newWordsLoading,
    fetchMore: newWordsFetchMore,
    refetch: newWordsRefetch,
  } = useQuery<NewWords, NewWordsVariables>(NEW_WORDS, {
    variables: {
      first: 4,
    },
  });

  const [updateNewWord] = useMutation<UpdateNewWord, UpdateNewWordVariables>(
    UPDATE_NEW_WORD
  );

  const fetchMoreNewWords = (params: NewWordsVariables) => {
    newWordsFetchMore({
      variables: params,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.allNewWords)
          return previousResult;
        const newEdges = fetchMoreResult.allNewWords.edges;
        const pageInfo = fetchMoreResult.allNewWords.pageInfo;
        const totalCount = fetchMoreResult.allNewWords.totalCount;
        const newWords: NewWords = {
          allNewWords: {
            __typename: previousResult.allNewWords!.__typename,
            edges: [...previousResult.allNewWords!.edges, ...newEdges],
            pageInfo,
            totalCount,
          },
        };
        return newEdges && newEdges.length ? newWords : previousResult;
      },
    });
  };

  const handleWord = async (
    type: "forgotten" | "remember",
    newWord?: NewWords_allNewWords_edges
  ) => {
    const v = newWord
      ? newWord
      : newWordsData?.allNewWords?.edges?.[listCursor];
    if (!v) return;
    const result = await updateNewWord({
      variables: {
        input: {
          id: v.node.id,
          forgottenTimes:
            type === "forgotten"
              ? v.node.forgottenTimes + 1
              : v.node.forgottenTimes,
          rememberTimes:
            type === "remember"
              ? v.node.rememberTimes + 1
              : v.node.rememberTimes,
        },
      },
    });

    if (result.data?.updateUserWord?.success) {
      setListCursor((v) => v + 1);
      const pageInfo = newWordsData?.allNewWords?.pageInfo;
      if (pageInfo?.hasNextPage) {
        fetchMoreNewWords({
          first: 1,
          after: pageInfo.endCursor,
        });
      }
    }
  };

  const handleRefetch = async () => {
    await newWordsRefetch({
      first: 4,
      after: undefined,
    });
    setListCursor(0);
  };

  const renderContent = () => {
    if (!newWordsData?.allNewWords?.edges?.length && newWordsLoading) {
      return (
        <Paper elevation={0} className={classes.noWords}>
          <Typography variant="body2">Loading...</Typography>
        </Paper>
      );
    }
    if (newWordsData?.allNewWords?.totalCount === 0) {
      return (
        <Paper elevation={0} className={classes.noWords}>
          <Typography variant="body2">没有新的单词了~</Typography>
        </Paper>
      );
    }
    if (
      newWordsData?.allNewWords?.edges?.length &&
      newWordsData?.allNewWords?.edges.length > listCursor
    ) {
      return (
        <>
          <WordCardList
            list={newWordsData?.allNewWords?.edges.slice(
              listCursor,
              listCursor + 4
            )}
            onSlideLeft={(word) => handleWord("forgotten", word)}
            onSlideRight={(word) => handleWord("remember", word)}
          />
          <div className={classes.action}>
            <Fab
              color="secondary"
              aria-label="forgotten"
              onClick={() => handleWord("forgotten")}
            >
              <ClearIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="remember"
              onClick={() => handleWord("remember")}
            >
              <CheckIcon />
            </Fab>
          </div>
        </>
      );
    } else {
      return (
        <Paper elevation={0} className={classes.noWords}>
          <Typography variant="body2">恭喜完成所有单词</Typography>
          <Button variant="outlined" color="secondary" onClick={handleRefetch}>
            再来一遍
          </Button>
        </Paper>
      );
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>{renderContent()}</div>
    </div>
  );
};

export default Memorize;
