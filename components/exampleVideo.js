import styled from "styled-components";
import VideoLoader from "./common/videoLoader";
import wave from "../public/images/wave.svg";
import topWave from "../public/images/top-wave.svg";

const ExampleVideo = (props) => {
  return (
    <Container>
      <VideoLoader
        src={"https://www.youtube.com/embed/8Z1eMy2FoX4"}
        width="900px"
        placeholderSize="56.25%"
        alt="example-video"
        centerVideo={true}
      />
      <BottomWave src={topWave} />
    </Container>
  );
};

export default ExampleVideo;

const Container = styled.div`
  width: 100%;
  height: 1200px;
  background-image: linear-gradient(
    to right,
    rgba(50, 172, 109, 1) 10%,
    rgba(209, 251, 155, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TopWave = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
`;
