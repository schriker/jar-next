import styled from 'styled-components';

type HighlightsMarkerPropsType = {
  index: number;
  duration: number;
};

const markerPosition = (index: number, duration: number): string => {
  return `calc(${(((index + 1) * 1000 * 60 * 2) / duration) * 100}% - 4px)`;
};

const HighlightsMarker = styled.div<HighlightsMarkerPropsType>`
  position: absolute;
  bottom: 0;
  background-color: #515151;
  width: 1px;
  height: ${(props) =>
    (props.index + 1) % 30 === 0
      ? '70%'
      : (props.index + 1) % 5 === 0
      ? '20px'
      : '10px'};
  left: ${(props) => markerPosition(props.index, props.duration)};
`;

export default HighlightsMarker;
