import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Videos from "./common/videos";
import { getAllWeddings } from ".././pages/api/weddings";
import { getAllCorporate } from ".././pages/api/corporate";
import lodash from "lodash";
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

  return (
    <Container page={page}>
      <Title>Choose Which section you would like to edit ?</Title>
      <ButtonsContainer>
        <WeddingsFormButton page={page} onClick={showWeddingContent}>
          Weddings
        </WeddingsFormButton>
        <CorporateFormButton page={page} onClick={showCorporateContent}>
          Corporate
        </CorporateFormButton>
      </ButtonsContainer>
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
    </Container>
  );
};

export default AdminEditContent;

const Container = styled.div`
  width: calc(100% - 280px);
  min-height: 100vh;
  transition: all 0.5s ease;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ page }) => (page ? "flex-start" : "center")};
  flex-direction: column;
  margin-left: auto;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 45px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  @media (max-width: 390px) {
    flex-direction: column;
  }
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
