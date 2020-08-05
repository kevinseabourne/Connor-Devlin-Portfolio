import styled from "styled-components";
import Header from "./header";
import ImageLoader from "./common/imageLoader";

const Banner = (props) => {
  return (
    <Container>
      <Header />
      <InfoContainer>
        <SmallTitle>Videographer</SmallTitle>
        <Name>
          <FirstName>CONNOR</FirstName>
          <LastName>DEVLIN.</LastName>
        </Name>
        <Description>
          Digital media producer and filmmaker based out of Perth WA. Creating
          videos for weddings, businesses and everything in between.
        </Description>
      </InfoContainer>
      <ImageLoader
        width="700px"
        placeholderSize="66.5%"
        borderRadius="8px"
        boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
        src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
      />
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
  max-width: 450px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 50px;
  margin-right: 30px;
  ${"" /* background-color: rgba(255, 255, 255, 0.8); */}
`;

const SmallTitle = styled.span`
  font-size: 1rem;
  opacity: 0.7;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FirstName = styled.h1`
  white-space: nowrap;
  position: relative;
  letter-spacing: 0px;
  font-size: 3rem;
  margin-right: 12px;
  &::after {
    content: "";
    position: absolute;
    height: 2.1px;
    border-radius: 20px;
    width: 155px;
    background-image: radial-gradient(
      circle farthest-corner at 10% 20%,
      rgba(50, 172, 109, 1) 0%,
      rgba(209, 251, 155, 1) 100.2%
    );
    bottom: 0;
    left: 0;
  }
`;

const LastName = styled.h1`
  white-space: nowrap;
  position: relative;
  letter-spacing: 0px;
  font-size: 3rem;
  padding-left: 3px;
  text-align: center;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(50, 172, 109, 1) 0%,
    rgba(209, 251, 155, 1) 100.2%
  );
`;

const Description = styled.p`
  font-size: 1rem;
  letter-spacing: 1px;
  width: 95%;
  opacity: 0.7;
`;
