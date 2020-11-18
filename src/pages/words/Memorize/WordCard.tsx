import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDrag } from "react-dnd";

import { NewWords_allNewWords_edges } from "../../../graphql/__generated__/NewWords";
import { DND_WORD_CARD } from "../../../utils/const";
import HiddenText from "./HiddenText";

interface IWordCardProps {
  data: NewWords_allNewWords_edges;
  onSlideLeft?: (v: IWordCardProps["data"]) => void;
  onSlideRight?: (v: IWordCardProps["data"]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: "auto",
      overflow: "auto",
      height: "40vh",
      width: "75vw"
    }
  })
);

const WordCard: React.FC<IWordCardProps> = props => {
  const { node } = props.data;
  const classes = useStyles();
  const [{ offset }, drag] = useDrag({
    item: { type: DND_WORD_CARD.CARD, id: node.id },
    collect: monitor => {
      const initialOffset = monitor.getInitialClientOffset();
      const currentOffset = monitor.getClientOffset();
      const dragItem = monitor.getItem();
      const isDragCurrentItem = dragItem && dragItem.id === node.id;
      return {
        isDragging: !!monitor.isDragging(),
        offset: {
          x:
            isDragCurrentItem && currentOffset && initialOffset
              ? currentOffset?.x - initialOffset?.x
              : 0,
          y:
            isDragCurrentItem && currentOffset && initialOffset
              ? currentOffset?.y - initialOffset?.y
              : 0
        }
      };
    },
    end(item, monitor) {
      const initialOffset = monitor.getInitialClientOffset();
      const currentOffset = monitor.getClientOffset();
      const dragItem = monitor.getItem();
      const isDragCurrentItem = dragItem && dragItem.id === node.id;
      const offsetX =
        currentOffset && initialOffset
          ? currentOffset?.x - initialOffset?.x
          : 0;
      if (isDragCurrentItem && offsetX > 100) {
        props.onSlideRight && props.onSlideRight(props.data);
      }
      if (isDragCurrentItem && offsetX < -100) {
        props.onSlideLeft && props.onSlideLeft(props.data);
      }
    }
  });
  return (
    <div
      ref={drag}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <Card className={classes.card}>
        <CardHeader title={node.word} />
        <CardContent>
          <Typography variant="body2">{node.example}</Typography>
        </CardContent>
        <CardContent>
          <HiddenText>{node.translation}</HiddenText>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCard;
