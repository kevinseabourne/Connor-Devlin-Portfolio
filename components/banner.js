import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "./common/imageLoader";
import topWave from "../public/images/top-wave.svg";

const Banner = (props) => {
  return (
    <Container>
      <InnerContainer>
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
          <Link href="/about">
            <ReadMoreLink>Read More</ReadMoreLink>
          </Link>
        </InfoContainer>
        <ImageContainer>
          <ImageLoader
            maxWidth="inherit"
            placeholderSize="66.5%"
            borderRadius="8px"
            boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
            src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
          />
        </ImageContainer>
      </InnerContainer>
      <BottomWave src={topWave} />
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    height: 100%;
  }
  @media (max-width: 1024px) and (max-height: 910px) {
    height: 100%;
  }
`;

const InnerContainer = styled.div`
  padding: 0px 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 20px;
  }
  @media (max-width: 1024px) and (max-height: 910px) {
    padding-bottom: 146.4px;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-top: 80px;
    padding-bottom: 246.4px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  max-width: 450px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 110px;
  margin-right: 30px;
  ${"" /* background-color: rgba(255, 255, 255, 0.8); */}
  @media (max-width: 1024px) {
    margin-top: 60px;
    margin-right: 0px;
    margin-bottom: 50px;
    order: 2;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
`;

const SmallTitle = styled.span`
  font-size: 1rem;
  opacity: 0.7;
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
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
    height: 4px;
    border-radius: 20px;
    width: 155px;
    background-image: ${({ theme }) =>
      `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
    bottom: 0;
    left: 0;
  }
  @media (max-width: 424px) {
    font-size: 2.5rem;
  }
`;

const LastName = styled.h1`
  white-space: nowrap;
  position: relative;
  letter-spacing: 0px;
  font-size: 3rem;
  padding-left: 3px;
  text-align: center;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  @media (max-width: 424px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  letter-spacing: 1px;
  width: 95%;
  opacity: 0.7;
  margin-bottom: 90px;
  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
`;

const ReadMoreLink = styled.span`
  font-size: 1rem;
  font-weight: 800;
  z-index: 0;
  position: relative;
  transition: all 0.3s;
  &::after {
    transition: all 0.2s;
    content: "";
    position: absolute;
    height: 3px;
    border-radius: 20px;
    width: 0%;
    background-image: ${({ theme }) =>
      `linear-gradient( to right,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100% )`};
    bottom: -4px;
    left: 0;
  }
  &:hover {
    cursor: pointer;
    &::after {
      width: 100%;
    }
  }
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
`;

const ImageContainer = styled.div`
  max-width: 700px;
  width: 100%;
  margin-bottom: 75px;
  @media (max-width: 1024px) {
    margin-top: 20px;
    margin-bottom: 0px;
    max-width: 500px;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -55px;
  left: -1px;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
