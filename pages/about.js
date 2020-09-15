import styled from "styled-components";
import ImageLoader from "../components/common/imageLoader";
import topWave from "../public/images/wave4.svg";

const About = (props) => {
  return (
    <Container>
      <ImageWrapper>
        <ImageContainer>
          <ImageLoader
            maxWidth="inherit"
            placeholderSize="66.66%"
            borderRadius="19px"
            opacity="0"
            scale="0.99"
            transitionTime="0.4s ease"
            src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
          />
        </ImageContainer>
        <SmallTitle>Connor Devlin</SmallTitle>
        <Name>
          <FirstName>ABOUT</FirstName>
          <LastName>ME.</LastName>
        </Name>
        <BottomWave src={topWave} />
      </ImageWrapper>

      <Wrapper>
        <InfoContainer>
          <Description>
            Hi! I’m Connor.
            <br /> <br />
            Videographer, photographer, editor all round creative. My passion
            for getting behind the camera took-off at a young age growing up in
            Kalgoorlie WA. I would film my brother and his friends skateboarding
            and eventually became the towns go-to kid for producing skate
            videos. Since then I have followed my passion by moving to Perth,
            obtaining a Film and Photography degree and running my own small
            business.
            <br /> <br />
            I strive for simplicity in my work, focusing on strong
            cinematography, honest performances and precisely tuned audio. As a
            passionate and versatile shooter I employ a creative approach to
            weddings, corporate material and everything in-between. No matter
            the project or occasion, I’d love to work with you. Drop me a
            message down below! Let’s Create.
            <br /> <br />
          </Description>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default About;

const Container = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 0px;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin-top: 40px;
  box-sizing: border-box;
  padding: 0px 20px;

  @media (max-width: 1024px) {
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
  @media (max-width: 750px) {
    margin-top: 20px;
  }
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -70px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1624px) {
    bottom: -10px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 700px;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 30px;
  box-sizing: border-box;
  padding: 0px 20px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const SmallTitle = styled.span`
  margin-top: 18px;
  font-size: 1rem;
  opacity: 0.7;
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
  @media (max-width: 300px) {
    font-size: 0.8rem;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12%;
  @media (max-width: 1624px) {
    margin-bottom: 16%;
  }
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
    width: 75%;
    background-image: ${({ theme }) =>
      `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
    bottom: 0;
    left: 0;
  }
  @media (max-width: 450px) {
    font-size: 2.3rem;
  }
  @media (max-width: 350px) {
    font-size: 2rem;
  }
  @media (max-width: 300px) {
    font-size: 1.7rem;
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
  @media (max-width: 450px) {
    font-size: 2.3rem;
  }
  @media (max-width: 350px) {
    font-size: 2rem;
  }
  @media (max-width: 300px) {
    font-size: 1.7rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-bottom: 90px;
  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
  @media (max-width: 300px) {
    font-size: 0.8rem;
  }
`;
