import styled from "styled-components";
import Header from "./header";
import ImageLoader from "./common/imageLoader";

const Banner = (props) => {
  return (
    <Container>
      <Header />
      <InnerContainer>
        <InfoContainer>
          <Title>Connor Devlin</Title>
          <Description>
            Videographer for Wedding and Corporate work.
          </Description>
        </InfoContainer>
        <ImageLoader
          width="800px"
          placeholderSize="66.85%"
          src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
        />
      </InnerContainer>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 60px;
  ${"" /* background-color: rgba(255, 255, 255, 0.8); */}
`;

const Title = styled.h1`
  white-space: nowrap;
`;

const Description = styled.p``;
