import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import playIcon from "../public/images/playIcon.svg";
import ImageLoader from "../components/common/imageLoader";
import VideoOverlay from "../components/common/videoOverlay";
import topWave from "../public/images/top-wave.svg";
import downWave from "../public/images/wave3.svg";

const Weddings = (props) => {
  const [weddings, setWeddings] = useState([
    {
      id: 1,
      coverPhoto:
        "https://chpistel.sirv.com/Connor-Portfolio/wedding_photo.png?png.optimize=true",
      names: [
        { firstName: "James", lastName: "Jones" },
        { firstName: "Emma", lastName: "Jones" },
      ],
      location: "Perth WA",
      video: "",
    },
    {
      id: 2,
      coverPhoto:
        "https://chpistel.sirv.com/Connor-Portfolio/wedding_photo.png?png.optimize=true",
      names: [
        { firstName: "Eli", lastName: "Roberts" },
        { firstName: "Megan", lastName: "Ball" },
      ],
      location: "Perth WA",
      video: "",
    },
    {
      id: 3,
      coverPhoto:
        "https://chpistel.sirv.com/Connor-Portfolio/wedding_photo.png?png.optimize=true",
      names: [
        { firstName: "Harvey", lastName: "Spectre" },
        { firstName: "Ella", lastName: "Harper" },
      ],
      location: "Perth WA",
      video: "",
    },
  ]);

  const [selectedWedding, setSelectedWedding] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [weddingNames, setWeddingNames] = useState([]);

  useEffect(() => {
    const weddingsClone = _.cloneDeep(weddings);

    let weddingNames = "";
    weddingsClone.map((wedding) => {
      wedding.names.map((name) => console.log(name));
    });
    // setWeddingNames(weddingNames);
  }, []);

  const handleClick = (id) => {
    const weddingsClone = _.cloneDeep(weddings);

    const selectedWedding = weddingsClone.find((wedding) => wedding.id === id);
    setSelectedWedding(selectedWedding);
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <TopContainer>
        <Title>Weddings</Title>
        <Description></Description>
      </TopContainer>
      <InnerContainer>
        {weddings.map((wedding) => (
          <Item onClick={() => handleClick(wedding.id)} key={wedding.id}>
            <ImageContainer>
              <ImageLoader
                maxWidth="100%"
                placeholderSize="100%"
                src={wedding.coverPhoto}
                boxShadow="0px 9px 20px rgba(0,0,0,0.2)"
              />

              <PlayIcon>
                <ImageLoader
                  maxWidth="15%"
                  placeholderSize="100%"
                  src={playIcon}
                  hover={true}
                  centerImage={true}
                />
              </PlayIcon>
            </ImageContainer>
            <Names>Mark & Ella</Names>
          </Item>
        ))}
        <VideoOverlay
          isOpen={isOpen}
          closeOverlay={closeOverlay}
          src={"https://player.vimeo.com/video/445793664?autoplay=1"}
          maxWidth={"900px"}
          placeholderSize={"56.25%"}
          alt={weddingNames}
          centerVideo={true}
        />
      </InnerContainer>
      <Quotes>
        <Wave src={downWave} />
      </Quotes>
    </Container>
  );
};

export default Weddings;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 0px;
`;

const Description = styled.p`
  margin-top: 0px;
  margin-bottom: 60px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 300px));
  justify-content: center;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 10% 10%;
  padding: 50px 10%;
  padding-top: 0px;
  box-sizing: border-box;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  z-index: 0;
  position: relative;
  border-radius: 10px;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  bottom: 50%;
  right: 0;
  transition: all 0.15s ease-in-out;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 0.15s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    ${PlayIcon} {
    }
  }
`;

const Names = styled.label`
  font-size: 1.2rem;
  letter-spacing: 0.8px;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
`;

const Quotes = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -30px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    ${"" /* bottom: -1px; */}
  }
`;

const Wave = styled.img`
  position: absolute;
  top: -20px;
  left: -1px;
  width: 100%;
  object-fit: cover;
`;
