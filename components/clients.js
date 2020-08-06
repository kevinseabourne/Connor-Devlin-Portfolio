import styled from "styled-components";
import downWave from "../public/images/wave.svg";
import topWave from "../public/images/top-wave.svg";

const Clients = (props) => {
  return (
    <Container>
      <Wave src={downWave} />
      <Title>Clients</Title>
      <BottomWave src={topWave} />
    </Container>
  );
};

export default Clients;

const Container = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-top: 272px;
`;

const Wave = styled.img`
  position: absolute;
  top: -20px;
  left: 0;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -20px;
  left: 0;
  z-index: -100;
`;
