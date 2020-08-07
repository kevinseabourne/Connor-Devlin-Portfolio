import styled from "styled-components";
import VideoLoader from "./common/videoLoader";
import wave from "../public/images/wave.svg";
import topWave from "../public/images/green-wave.svg";

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
    </Container>
  );
};

export default ExampleVideo;

const Container = styled.div`
  width: 100%;
  height: 600px;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 680px) {
    height: 420px;
  }
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
