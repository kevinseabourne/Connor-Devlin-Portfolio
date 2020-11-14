import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Videos from "./common/videos";
import { getAllWeddings, editWedding } from ".././pages/api/weddings";
import { getAllCorporate, editCorporate } from ".././pages/api/corporate";
import _ from "lodash";
import moment from "moment";
import { motion } from "framer-motion";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "../components/loading-spinner";
import { handleWeddingNames } from "./common/utils/handleWeddingName";
import { bundlePartnersIntoObj } from "./common/utils/bundlePartnersIntoObj";
import AdminContentForm from "./common/adminContentForm";
import downWave from ".././public/images/wave3.svg";
import popSound from ".././public/sounds/pop.mp3";
import useSound from "use-sound";

const AdminEditContent = (props) => {
  const [state, setState] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(null);
  const [play] = useSound(popSound, { volume: 0.2 });

  const handleClick = (id) => {
    const stateClone = _.cloneDeep(state);

    const selected = stateClone.find((item) => item.id === id);
    if (_.isEmpty(selectedVideo) || selected.id !== selectedVideo.id) {
      play();
      setSelectedVideo(selected);
    }
  };

  const handleWeddingPageChange = () => {
    setPage(null);
    showWeddingContent();
  };

  const handleCorporatePageChange = () => {
    setPage(null);
    showCorporateContent();
  };

  const showWeddingContent = async () => {
    setStatus("pending");
    const response = await getAllWeddings();
    const updatedWeddings = handleWeddingNames(response, true);
    setState(updatedWeddings);
    setSelectedVideo(updatedWeddings[0]);
    setPage("weddings");
    setStatus("resolved");
  };

  const showCorporateContent = async () => {
    setStatus("pending");
    const response = await getAllCorporate();
    setState(response);
    setSelectedVideo(response[0]);
    setPage("corporate");
    setStatus("resolved");
  };

  const handleEditWeddingSubmit = async (data) => {
    const updatedData = bundlePartnersIntoObj(data);
    updatedData.id = selectedVideo.id;
    const response = await editWedding(updatedData);

    // get the latest data and update state with it.
    const weddingData = await getAllWeddings();
    const updatedWeddings = handleWeddingNames(weddingData, true);
    setState(updatedWeddings);
    updateSelectedVideo(updatedWeddings);
    return response;
  };

  const handleEditCorporateSubmit = async (data) => {
    const updatedData = bundlePartnersIntoObj(data);
    updatedData.id = selectedVideo.id;
    const response = await editCorporate(updatedData);

    // get the latest data and update state with it.
    const corporateData = await getAllCorporate();
    setState(corporateData);

    updateSelectedVideo(corporateData);
    return response;
  };

  const handleDeleteWeddingSubmit = async () => {
    // get the latest data and update state with it.
    const weddingData = await getAllWeddings();
    const updatedWeddings = handleWeddingNames(weddingData, true);
    setState(updatedWeddings);
    setSelectedVideo(updatedWeddings[0]);
    return response;
  };

  const handleDeleteCorporateSubmit = async () => {
    // get the latest data and update state with it.
    const corporateData = await getAllCorporate();
    setState(corporateData);

    setSelectedVideo(corporateData[0]);
    return response;
  };

  const updateSelectedVideo = (data) => {
    const dataClone = _.cloneDeep(data);
    const updatedSelectedVideo = dataClone.find(
      (item) => item.id === selectedVideo.id
    );
    if (
      updatedSelectedVideo &&
      !_.isEqual(selectedVideo, updatedSelectedVideo)
    ) {
      setSelectedVideo(updatedSelectedVideo);
    }
  };

  const defaultValues = !_.isEmpty(selectedVideo)
    ? page === "weddings"
      ? {
          weddingVideoId: selectedVideo.videoId,
          partners: selectedVideo.partners,
          stateTerritory: selectedVideo.location.state,
          suburb: selectedVideo.location.suburb,
          weddingDate: selectedVideo.date,
          testimonial: selectedVideo.testimonial,
        }
      : {
          corporateVideoId: selectedVideo.videoId,
          company: selectedVideo.company,
          jobDate: selectedVideo.date,
          corporateTestimonial: selectedVideo.testimonial,
        }
    : {};

  const loaderAnimation = {
    hidden: { opacity: 0, transform: "scale(0)" },
    show: {
      opacity: 1,
      transform: "scale(1)",
      transition: {
        type: "spring",
      },
    },
  };

  const innerContainerAnimation = {
    hidden: {
      display: "flex",
      justifyContent: "center",
      trasition: {
        type: "spring",
      },
    },
    show: {
      display: "flex",
      justifyContent: "flex-start",
      trasition: {
        type: "spring",
      },
    },
  };

  return (
    <Container>
      <AnimateSharedLayout>
        <InnerContainer
          page={page}
          variants={innerContainerAnimation}
          initial="hidden"
          animate={page ? "show" : "hidden"}
          layout
        >
          <ButtonsContainer layout>
            <Title>Choose a section to edit ?</Title>
            <ButtonsInnerContainer>
              <WeddingsFormButton page={page} onClick={handleWeddingPageChange}>
                Weddings
              </WeddingsFormButton>
              <CorporateFormButton
                page={page}
                onClick={handleCorporatePageChange}
              >
                Corporate
              </CorporateFormButton>
            </ButtonsInnerContainer>
          </ButtonsContainer>
          <AnimatePresence>
            {status === "pending" && (
              <LoadingContainer
                layout
                initial="hidden"
                animate={status === "pending" ? "show" : "hidden"}
                exit="hidden"
                variants={loaderAnimation}
              >
                <LoadingSpinner size={"45px !important"} />
              </LoadingContainer>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {page && (
              <Videos
                data={state}
                page={page}
                selectedVideo={selectedVideo}
                handleClick={handleClick}
                showAdminContentData={true}
                editDeleteContent={true}
              />
            )}
          </AnimatePresence>
        </InnerContainer>
      </AnimateSharedLayout>
      {page !== null && (
        <FormContainer>
          <Wave src={downWave} />
          <AdminContentForm
            page={page}
            defaultValues={defaultValues}
            selectedVideo={selectedVideo}
            handleWeddingSubmit={handleEditWeddingSubmit}
            handleCorporateSubmit={handleEditCorporateSubmit}
            selectedVideo={selectedVideo}
            handleDeleteWeddingSubmit={handleDeleteWeddingSubmit}
            handleDeleteCorporateSubmit={handleDeleteCorporateSubmit}
            operation="Edit"
          />
        </FormContainer>
      )}
    </Container>
  );
};

export default AdminEditContent;

const Container = styled(motion.div)`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: auto;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const InnerContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: ${({ page }) => (page ? "100%" : "calc(100vh - 75px)")};
  height: 100%;
`;

const Title = styled(motion.h1)`
  margin: 0px 20px;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 750px) {
    font-size: 1.4rem;
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 70px 20px;
`;

const ButtonsInnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 609px) {
    padding: 0px 20px;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
  }
  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  position: relative;
  width: 45px;
  height: 45px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  margin: 35px 0px;
  @media (max-width: 750px) {
    margin-top: -35px;
    margin-bottom: 20px;
  }
`;

const WeddingsFormButton = styled.button`
  font-size: 1rem;
  color: ${({ page, theme }) =>
    page === "weddings" ? "white" : theme.colors.gradient1};
  min-height: 54px;
  padding: 14px 30px;
  border-radius: 9px;
  transform: ${({ page }) =>
    page === "weddings" ? "scale(1)" : "scale(0.85)"};
  margin-right: 5px;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  background-image: ${({ theme, page }) =>
    page === "weddings"
      ? `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`
      : "white"};
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 750px) {
    font-size: 0.9rem;
  }
  @media (max-width: 609px) {
    width: 100%;
  }
  @media (max-width: 390px) {
    margin-right: 0px;
    margin-bottom: 15px;
  }
`;

const CorporateFormButton = styled.button`
  font-size: 1rem;
  color: ${({ page, theme }) =>
    page === "corporate" ? "white" : theme.colors.gradient1};
  min-height: 54px;
  padding: 14px 30px;
  margin-left: 5px;
  border-radius: 9px;
  font-weight: 600;
  border: none;
  transform: ${({ page }) =>
    page === "corporate" ? "scale(1)" : "scale(0.85)"};
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme, page }) =>
    page === "corporate"
      ? `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`
      : "white"};
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 750px) {
    font-size: 0.9rem;
  }
  @media (max-width: 609px) {
    width: 100%;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  padding-top: 18%;
  box-sizing: border-box;
  position: relative;
  background-color: white;
  padding-bottom: 150px;
  @media (max-width: 950px) {
    padding-top: 25%;
  }
`;

const Wave = styled.img`
  position: absolute;
  top: -20px;
  left: -1px;
  width: 100%;
  object-fit: cover;
`;
