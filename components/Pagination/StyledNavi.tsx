import styled from 'styled-components';

type NaviPropsType = {
  isActive: boolean;
  fixedWidth: boolean;
};

const StyledNavi = styled.li<NaviPropsType>`
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#F00' : '#2C2C2C')};
  width: ${(props) => props.fixedWidth ? '30px' : 'auto'};
  height: 30px;
  margin-right: 15px;
  transition: all ease 0.1s;
  &:hover {
    background-color: #f00;
  }
  a {
    padding: ${(props) => props.fixedWidth ? '0' : '0 10px'};
  }
`;

export default StyledNavi;
