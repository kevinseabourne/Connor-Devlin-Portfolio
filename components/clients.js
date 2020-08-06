import styled from "styled-components";
import downWave from "../public/images/wave.svg";
import topWave from "../public/images/top-wave.svg";

const Clients = (props) => {
  return (
    <Container>
      <Wave src={downWave} />
      Client Logos
      <BottomWave src={topWave} />
    </Container>
  );
};

export default Clients;

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
`;

const Wave = styled.img`
  position: absolute;
  top: -1px;
  left: 0;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -10px;
  left: 0;
  z-index: -100;
`;
