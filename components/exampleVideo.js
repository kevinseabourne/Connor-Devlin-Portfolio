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
  background-color: #524f4a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
