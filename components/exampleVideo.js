import styled from "styled-components";
import VideoLoader from "./common/videoLoader";
import wave from "../public/images/wave.svg";
import topWave from "../public/images/green-wave.svg";

const ExampleVideo = (props) => {
  return (
    <Container>
      <VideoLoader
        src={
          "https://www.dropbox.com/s/wafb1uu1zhfef6j/CDM_Showreel_1.mp4?raw=1"
        }
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
