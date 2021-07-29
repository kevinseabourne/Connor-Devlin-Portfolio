import styled from "styled-components";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { isArrayEmpty } from "./utils/isEmpty";
import Videos from "./videos";
import { handleWeddingNames } from "../common/utils/handleWeddingName";
import downWave from "../../public/images/wave3.svg";
import topWave from "../../public/images/wave4.svg";
import Clients from "../clients";
import ErrorMessage from "./errorMessage";
import { useFontLoaded } from "../../components/common/utils/hooks";

const ContentPage = ({ data, selectedData, showAdminContentData }) => {
  const [state, setState] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [testimonialItem, setTestimonialItem] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoOverlayOpen, setVideoOverlayOpen] = useState(false);

  const [fontLoaded] = useFontLoaded("4.3rem exmouth");

  useEffect(() => {
    if (data) {
      if (selectedData === "weddings") {
        const showFullNames = showAdminContentData ? true : false;
        const updatedWeddings = handleWeddingNames(data, showFullNames);
        setState(updatedWeddings);
        handleTestimonial(updatedWeddings);
      } else {
        setState(data);
      }
    }
  }, []);

  const handleSelectedItemAfterClick = (id) => {
    const selectedItem = state.find((item) => item.id === id);
    setSelectedItem(selectedItem);
    setVideoOverlayOpen(!videoOverlayOpen);
  };

  const closeOverlay = () => {
    setVideoOverlayOpen(false);
  };

  const handleOnLoadOutside = () => {
    setImageLoaded(true);
  };

  const handleTestimonial = (updatedWeddings) => {
    const itemsWithATestimonial = updatedWeddings.filter(
      (item) => item.testimonial
    );
    const randomIndex = Math.floor(
      Math.random() * itemsWithATestimonial.length
    );
    const randomItem = itemsWithATestimonial[randomIndex];

    setTestimonialItem(randomItem);
  };

  return isArrayEmpty(data) ? (
    <Container showAdminContentData={showAdminContentData}>
      <TopContainer>
        <Title>{selectedData === "weddings" ? "Weddings" : "Corporate"}</Title>
      </TopContainer>
      <VideoContainer>
        <Videos
          selectedData={selectedData}
          data={state}
          videoOverlayOpen={videoOverlayOpen}
          closeOverlay={closeOverlay}
          selectedItem={selectedItem}
          showAdminContentData={showAdminContentData}
          handleSelectedItemAfterClick={handleSelectedItemAfterClick}
          handleOnLoadOutside={handleOnLoadOutside}
          imageLoaded={imageLoaded}
        />
      </VideoContainer>
      {selectedData === "corporate" && <Clients />}
      {selectedData === "weddings" && (
        <QuotesContainer>
          <Quote>
            <Wave src={downWave} />
            <Description fontLoaded={fontLoaded}>
              {testimonialItem.testimonial}
            </Description>
            <WeddingPartners data-testid="testimonialPartners">
              {testimonialItem.displayNames}
            </WeddingPartners>
          </Quote>
          <TopWave src={topWave} />
        </QuotesContainer>
      )}
      <Pricing>
        <Link
          href="/pricing/[id]"
          as={
            selectedData === "weddings"
              ? "/pricing/weddings"
              : "/pricing/corporate"
          }
        >
          <ContactButton>PRICING</ContactButton>
        </Link>
      </Pricing>
    </Container>
  ) : (
    <Container>
      <ErrorMessage />
    </Container>
  );
};

export default ContentPage;

ContentPage.propTypes = {
  data: PropTypes.any,
  selectedData: PropTypes.string,
  showAdminContentData: PropTypes.bool,
};

const Container = styled.div`
  min-height: ${({ showAdminContentData }) =>
    showAdminContentData ? "calc(100vh - 75px)" : "100%"};
  width: ${({ showAdminContentData }) =>
    showAdminContentData ? "calc(100% - 280px)" : "100%"};
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  margin-left: ${({ showAdminContentData }) =>
    showAdminContentData ? "auto" : "undefined"};

  @media (max-width: 1250px) {
    width: ${({ showAdminContentData }) =>
      showAdminContentData ? "calc(100% - 200px)" : "100%"};
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gradient1};
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const VideoContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gradient1};
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const Title = styled.h1`
  font-size: 2.1rem;
  margin: 70px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const Wave = styled.img`
  z-index: -20;
  position: absolute;
  top: -20px;
  left: -1px;
  width: 100%;
  object-fit: cover;
`;

const TopWave = styled.img`
  position: absolute;
  bottom: -20px;
  left: -1px;
  z-index: -100;
  width: 100%;
  object-fit: cover;
  @media (max-width: 680px) {
    bottom: -15px;
  }
`;

const Quote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
`;

const WeddingPartners = styled.label`
  align-self: flex-start;
  font-size: 1.1em;
  margin-left: 75px;
  @media (max-width: 750px) {
    margin-left: 0px;
    align-self: center;
  }
`;

const QuotesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20% 20px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 750px) {
    padding: 25% 20px;
  }
`;

const Description = styled.div`
  margin-top: 9px;
  font-family: exmouth, "Brush Script BT", sans-serif;
  font-weight: ${({ fontLoaded }) => (fontLoaded ? "normal" : "100")};
  font-size: 4.3rem;
  text-align: center;
  margin-bottom: 21px;
  letter-spacing: ${({ fontLoaded }) => (fontLoaded ? "1px" : "1.15px")};
  word-spacing: ${({ fontLoaded }) => (fontLoaded ? "0px" : "2px")};
  @media (max-width: 1024px) {
    font-size: 3.2rem;
  }
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 524px) {
    font-size: 2.7rem;
  }
`;

const Pricing = styled.div`
  width: 100%;
    background-color: ${({ theme }) => theme.colors.gradient1};
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding 0 20px;
  box-sizing: border-box;
`;

const ContactButton = styled.button`
  margin: 135px;
  font-size: 1.1rem;
  display: flex;
  z-index: 0;
  font-weight: 700;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 15px 26px;
  margin-top: 100px;
  margin-bottom: 300px;
  color: ${({ theme }) => theme.colors.fontColor};
  border-radius: 8px;
  border: none;
  justify-content: center;
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.fontColor};
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`;
