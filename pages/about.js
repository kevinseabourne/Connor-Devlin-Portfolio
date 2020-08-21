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
            placeholderSize="66.7%"
            borderRadius="8px"
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
            vulputate odio ut enim blandit volutpat maecenas volutpat blandit.
            Accumsan tortor posuere ac ut consequat semper. Mauris commodo quis
            imperdiet massa tincidunt nunc. In tellus integer feugiat
            scelerisque varius morbi enim. Nisi lacus sed viverra tellus in hac.
            Quam adipiscing vitae proin sagittis nisl. Risus at ultrices mi
            tempus imperdiet. Diam volutpat commodo sed egestas egestas
            fringilla phasellus. Tristique senectus et netus et malesuada fames
            ac. <br /> <br />
            Nisl rhoncus mattis rhoncus urna neque viverra. Et odio pellentesque
            diam volutpat commodo. Tortor at risus viverra adipiscing at in
            tellus integer. Gravida arcu ac tortor dignissim convallis. Eget
            velit aliquet sagittis id consectetur purus ut. Quis commodo odio
            aenean sed. Non consectetur a erat nam at. Dictum at tempor commodo
            ullamcorper a lacus vestibulum sed. Nunc congue nisi vitae suscipit
            tellus mauris a diam. Est velit egestas dui id ornare arcu odio. Sed
            libero enim sed faucibus turpis in eu mi bibendum. Dignissim
            suspendisse in est ante in nibh mauris cursus mattis. Risus pretium
            quam vulputate dignissim suspendisse. Imperdiet sed euismod nisi
            porta lorem mollis aliquam ut. Sed velit dignissim sodales ut. Purus
            sit amet luctus venenatis lectus. Senectus et netus et malesuada
            fames. Pharetra et ultrices neque ornare aenean euismod elementum
            nisi. <br /> <br />
            Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Sem
            viverra aliquet eget sit amet tellus cras adipiscing enim. Sociis
            natoque penatibus et magnis dis parturient. Aenean sed adipiscing
            diam donec adipiscing tristique risus. Enim ut tellus elementum
            sagittis vitae et leo duis. Odio ut sem nulla pharetra diam sit amet
            nisl. Ultrices mi tempus imperdiet nulla malesuada. Tempus egestas
            sed sed risus pretium quam vulputate dignissim. Nisl suscipit
            adipiscing bibendum est ultricies. Venenatis lectus magna fringilla
            urna porttitor. Erat nam at lectus urna duis convallis convallis
            tellus. <br /> <br />
            Iaculis nunc sed augue lacus viverra vitae congue. Et odio
            pellentesque diam volutpat commodo sed egestas egestas fringilla. Id
            eu nisl nunc mi ipsum faucibus. Quam elementum pulvinar etiam non
            quam lacus suspendisse faucibus interdum. Varius quam quisque id
            diam vel quam elementum. Mattis enim ut tellus elementum sagittis.
            Ac turpis egestas sed tempus urna et pharetra pharetra massa. Dui
            accumsan sit amet nulla facilisi morbi. Risus pretium quam vulputate
            dignissim suspendisse in est ante. Suspendisse sed nisi lacus sed.
            Accumsan lacus vel facilisis volutpat.
          </Description>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default About;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0px;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  max-width: 700px;
  width: 100%;
  margin-top: 28px;
  box-sizing: border-box;
  padding: 0px 20px;

  @media (max-width: 1024px) {
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -10px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1624px) {
    bottom: -10px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin-top: -5%;
  box-sizing: border-box;
  padding: 0px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 1024px) {
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
  @media (max-width: 750px) {
    margin-top: 10px;
  }
`;

const SmallTitle = styled.span`
  margin-top: 25px;
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
  margin-bottom: 17%;
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
