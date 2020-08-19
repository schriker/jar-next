import styled from 'styled-components';

type HighlightsTimelinePropsType = {
  width: number;
};

const HighlightsTimeline = styled.div<HighlightsTimelinePropsType>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #232323;
  border-right: 1px solid #f00;
  width: ${(props) => `${props.width}%`};
`;

export default HighlightsTimeline;
