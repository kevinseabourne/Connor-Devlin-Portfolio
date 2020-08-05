import styled from "styled-components";
import VideoLoader from "./common/videoLoader";

const ExampleVideo = (props) => {
  return (
    <Container>
      <VideoLoader
        src={"https://www.youtube.com/embed/8Z1eMy2FoX4"}
        width="1000px"
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
  height: 100vh;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(50, 172, 109, 1) 0%,
    rgba(209, 251, 155, 1) 100.2%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;
