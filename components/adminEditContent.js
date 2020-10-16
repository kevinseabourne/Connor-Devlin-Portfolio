import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Videos from "./common/videos";
import { getAllWeddings } from ".././pages/api/weddings";
import { getAllCorporate } from ".././pages/api/corporate";
import lodash from "lodash";
import { motion } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
import { LoadingSpinner } from "../components/loading-spinner";
import { handleWeddingNames } from "./common/utils/handleWeddingName";

const AdminEditContent = (props) => {
  const [state, setState] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [weddingFormVisible, setWeddingFormVisible] = useState(false);
  const [corporateFormVisible, setCorporateFormVisible] = useState(false);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(null);

  const handleClick = (id) => {
    const stateClone = _.cloneDeep(state);

    const selectedVideo = stateClone.find((item) => item.id === id);
    setSelectedVideo(selectedVideo);
  };

  const showWeddingContent = async () => {
    if (status !== "pending") {
      setStatus("pending");
      const response = await getAllWeddings();
      if (response) {
        const updatedWeddings = handleWeddingNames(response, true);
        setState(updatedWeddings);
        setPage("weddings");
        setStatus("resolved");
      }
    }
  };

  const showCorporateContent = async () => {
    if (status !== "pending") {
      setStatus("pending");
      const response = await getAllCorporate();
      if (response) {
        setState(response);
        setPage("corporate");
        setStatus("resolved");
      }
    }
  };

  const loaderAnimation = {
    hidden: { opacity: 0, transform: "scale(0)" },
    show: {
      opacity: 1,
      transform: "scale(1)",
      trasition: {
        type: "spring",
        stiffness: 2000,
      },
    },
  };

  return (
    <Container>
      <AnimateSharedLayout>
        <InnerContainer>
          <ButtonsContainer
            initial={{ marginTop: "400px" }}
            animate={
              page
                ? { marginTop: "0px" }
                : {
                    marginTop: "400px",
                    trasition: {
                      type: "spring",
                      stiffness: 500,
                    },
                  }
            }
          >
            <Title>Choose a section to edit ?</Title>
            <ButtonsInnerContainer>
              <WeddingsFormButton page={page} onClick={showWeddingContent}>
                Weddings
              </WeddingsFormButton>
              <CorporateFormButton page={page} onClick={showCorporateContent}>
                Corporate
              </CorporateFormButton>
            </ButtonsInnerContainer>
          </ButtonsContainer>

          {status === "pending" && (
            <LoadingContainer variants={loaderAnimation}>
              <LoadingSpinner variants={loaderAnimation} />
            </LoadingContainer>
          )}

          {page && <Title>Choose a {page} video to edit</Title>}
          {page === "weddings" && (
            <Videos
              page={page}
              data={state}
              selectedVideo={selectedVideo}
              handleClick={handleClick}
              showAdminContentData={true}
              editDeleteContent={true}
            />
          )}
          {page === "corporate" && (
            <Videos
              page={page}
              data={state}
              selectedVideo={selectedVideo}
              handleClick={handleClick}
              showAdminContentData={true}
              editDeleteContent={true}
            />
          )}
        </InnerContainer>
      </AnimateSharedLayout>
    </Container>
  );
};

export default AdminEditContent;

const Container = styled(motion.div)`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
  transition: all 0.5s ease;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: auto;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 45px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  margin-bottom: 50px;
`;

const ButtonsInnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  position: relative;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
`;

const WeddingsFormButton = styled.button`
  font-size: 1rem;
  color: ${({ page }) => (page === "weddings" ? "black" : "black")};
  min-height: 54px;
  padding: 14px 30px;
  border-radius: 9px;
  transform: ${({ page }) =>
    page === "weddings" ? "scale(1)" : "scale(0.93)"};
  margin-right: 5px;
  border: ${({ page, theme }) =>
    page === "weddings"
      ? "3px solid black"
      : `3px solid ${theme.colors.gradient1}`};
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 390px) {
    margin-bottom: 15px;
  }
`;

const CorporateFormButton = styled.button`
  font-size: 1rem;
  color: ${({ page }) => (page === "corporate" ? "black" : "white")};
  min-height: 54px;
  padding: 14px 30px;
  margin-left: 5px;
  border: ${({ page }) =>
    page === "corporate" ? "3px solid black" : "3px solid white"};
  border-radius: 9px;
  font-weight: 600;
  transform: ${({ page }) =>
    page === "corporate" ? "scale(1)" : "scale(0.93)"};
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
