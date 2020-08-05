import styled from "styled-components";
import VideoLoader from "./common/videoLoader";
import wave from "../public/images/wave.svg";
import topWave from "../public/images/top-wave.svg";

const ExampleVideo = (props) => {
  return (
    <Container>
      <TopWave src={wave} />
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
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(50, 172, 109, 1) 0%,
    rgba(209, 251, 155, 1) 100.2%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TopWave = styled.img`
  position: absolute;
  top: -80px;
  left: 0;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -80px;
  left: 0;
`;
