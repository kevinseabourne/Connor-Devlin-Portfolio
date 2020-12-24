import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Videos from "./videos";
import lodash from "lodash";
import { handleWeddingNames } from "./utils/handleWeddingName";
import playIcon from "../../public/images/playIcon.svg";
import ImageLoader from "./imageLoader";
import VideoOverlay from "./videoOverlay";
import downWave from "../../public/images/wave3.svg";
import topWave from "../../public/images/wave4.svg";

const AdminContentPage = ({ data, page }) => {
  const [state, setState] = useState(data || []);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (page === "weddings") {
      const updatedWeddings = handleWeddingNames(data, true);
      setState(updatedWeddings);
    } else {
      setState(data);
    }
  }, [data]);

  const handleClick = (id) => {
    const stateClone = _.cloneDeep(data);

    const selectedVideo = stateClone.find((item) => item.id === id);
    setSelectedVideo(selectedVideo);
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const handleOnLoadOutside = () => {
    setImageLoaded(true);
  };

  return state.length > 0 ? (
    <Container>
      <Title>{page} Videos</Title>
      {page === "weddings" && (
        <Videos
          page={page}
          data={state}
          isOpen={isOpen}
          closeOverlay={closeOverlay}
          selectedVideo={selectedVideo}
          handleClick={handleClick}
          handleOnLoadOutside={handleOnLoadOutside}
          imageLoaded={imageLoaded}
          showAdminContentData={true}
        />
      )}
      {page === "corporate" && (
        <Videos
          page={page}
          data={state}
          isOpen={isOpen}
          closeOverlay={closeOverlay}
          selectedVideo={selectedVideo}
          handleClick={handleClick}
          handleOnLoadOutside={handleOnLoadOutside}
          imageLoaded={imageLoaded}
          showAdminContentData={true}
        />
      )}
    </Container>
  ) : (
    <Container></Container>
  );
};

export default AdminContentPage;

const Container = styled.div`
  min-height: calc(100vh - 75px);
  height: 100%;
  margin-left: auto;
  width: calc(100% - 280px);
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  text-transform: capitalize;
  margin: 45px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;
