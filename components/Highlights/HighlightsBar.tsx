import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { VideoHighLight } from 'types/video';
import Tooltip from '@material-ui/core/Tooltip';
import { seekTo } from 'store/slices/appPlayer';

type StyledHighlightBarPropsType = {
  left: string;
  height: number;
  color: string;
};

const StyledHighlightBar = styled.div<StyledHighlightBarPropsType>`
  cursor: pointer;
  position: absolute;
  width: 5px;
  bottom: 0;
  left: ${(props) => props.left};
  height: 100%;
  &:hover div {
    height: 100%;
  }
  div {
    width: 5px;
    position: absolute;
    bottom: 0;
    height: ${(props) => `${props.height}%`};
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    transition: all ease 0.2s;
    background-color: ${(props) => props.color};
  }
`;

type HighlightsBarPropsType = {
  highlight: VideoHighLight;
  duration: number;
  started: string;
  max: number;
};

const HighlightsBar = ({
  highlight,
  duration,
  started,
  max,
}: HighlightsBarPropsType) => {
  const dispatch = useDispatch();
  const momentMs =
    new Date(highlight.time).getTime() - new Date(started).getTime();
  const height =
    ((highlight.totalMessagesCount + highlight.percent / 10) / (max + 10)) *
    100;
  const left = `${(momentMs / duration) * 100}%`;
  const color = `rgba(100%, ${
    100 -
    ((highlight.totalMessagesCount + highlight.percent / 10) / (max + 10)) * 100
  }%, 0%, 1)`;

  return (
    <Tooltip title={highlight.type} arrow placement="top">
      <StyledHighlightBar onClick={() => dispatch(seekTo(momentMs / 1000 - 25))} color={color} left={left} height={height}>
        <div></div>
      </StyledHighlightBar>
    </Tooltip>
  );
};

export default HighlightsBar;
