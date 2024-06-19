import styled from "styled-components";

const Overlay = styled.div<{ width?: number }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${(props) => props.width || 400}px;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export default Overlay;
