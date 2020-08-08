import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import downWave from "../public/images/wave3.svg";
import topWave from "../public/images/wave4.svg";

const Clients = (props) => {
  return (
    <Container>
      <Wave src={downWave} />
      <Title>Clients</Title>
      <IconsContainer>
        <ImageLoader
          maxWidth="215px"
          placeholderSize="75.7%"
          borderRadius="8px"
          centerImage={true}
          src="https://chpistel.sirv.com/Connor-Portfolio/tlg.png?cx=105&cy=109&cw=554&ch=493"
        />
        <ImageLoader
          maxWidth="215px"
          placeholderSize="75.7%"
          borderRadius="8px"
          centerImage={true}
          src="https://chpistel.sirv.com/Connor-Portfolio/Logo_ECU.png?w=700"
        />
        <ImageLoader
          maxWidth="215px"
          placeholderSize="75.7%"
          borderRadius="8px"
          centerImage={true}
          src="https://chpistel.sirv.com/Connor-Portfolio/Kalamunda%20Logo%2001%20CMYK.png?cw=750&ch=563&w=750&h=563"
        />
      </IconsContainer>
      <BottomWave src={topWave} />
    </Container>
  );
};

export default Clients;

const Container = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  @media (max-width: 680px) {
    height: 100%;
    padding: 40% 20px;
  }
  @media (max-width: 355px) {
    padding: 140px 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-top: -70px;
  opacity: 0.8;
  margin-bottom: 65px;
  padding-left: 3px;
  padding-right: 3px;
  @media (max-width: 680px) {
    margin-top: -93px;
    margin-bottom: 25px;
  }
`;

const IconsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 215px));
  justify-content: center;
  grid-auto-flow: row;
  grid-gap: 12%;
  opacity: 0.8;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    box-sizing: border-box;
    padding: 0 26%;
  }
`;

const Wave = styled.img`
  position: absolute;
  top: -20px;
  left: -1px;
  width: 100%;
  object-fit: cover;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -20px;
  left: -1px;
  z-index: -100;
  object-fit: cover;
`;
