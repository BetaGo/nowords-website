import React from "react";
import styled from "styled-components";

import { NewWords_allNewWords_edges } from "../../../graphql/__generated__/NewWords";
import WordCard from "./WordCard";

const CardWrapper = styled.div<{ index: number }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transform: ${props =>
    "perspective(500px) translate3d(0," +
    10 * Math.min(props.index, 2) +
    "px," +
    -20 * Math.min(props.index, 2) +
    "px)"};
`;

const Container = styled.div`
  position: relative;
  margin: 20px auto 30px;
  height: 40vh;
  width: 75vw;
`;

interface IWordCardListProps {
  list: NewWords_allNewWords_edges[];
  onSlideLeft?: (v: NewWords_allNewWords_edges) => void;
  onSlideRight?: (v: NewWords_allNewWords_edges) => void;
}

const WordCardList: React.FC<IWordCardListProps> = props => {
  return (
    <Container>
      {props.list
        .map((v, index) => (
          <CardWrapper key={v.node.id} index={index}>
            <WordCard
              data={v}
              onSlideLeft={props.onSlideLeft}
              onSlideRight={props.onSlideRight}
            />
          </CardWrapper>
        ))
        .reverse()}
    </Container>
  );
};

export default WordCardList;
