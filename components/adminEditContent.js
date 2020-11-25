import styled, { createGlobalStyle } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Videos from "./common/videos";
import {
  getAllWeddings,
  editWedding,
  deleteWedding,
} from ".././pages/api/weddings";
import {
  getAllCorporate,
  editCorporate,
  deleteCorporate,
} from ".././pages/api/corporate";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { handleWeddingNames } from "./common/utils/handleWeddingName";
import { bundlePartnersIntoObj } from "./common/utils/bundlePartnersIntoObj";
import AdminContentForm from "./common/adminContentForm";
import downWave from ".././public/images/wave3.svg";
import popSound from ".././public/sounds/pop.mp3";
import useSound from "use-sound";
import { DeletePopupOverlay } from "./deletePopupOverlay";
import AdminButtonsSection from "./common/adminButtonSections";

const AdminEditContent = (props) => {
  const [state, setState] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [weddingsStatus, setWeddingsStatus] = useState("idle");
  const [corporateStatus, setCorporateStatus] = useState("idle");
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [page, setPage] = useState(null);
  const timeout = useRef(null);
  const timeoutThird = useRef(null);
  const popUpRef = useRef(null);

  const [play] = useSound(popSound, { volume: 0.2 });

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timeout.current);
      clearTimeout(timeoutThird.current);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (id) => {
    const stateClone = _.cloneDeep(state);

    const selected = stateClone.find((item) => item.id === id);
    if (_.isEmpty(selectedVideo) || selected.id !== selectedVideo.id) {
      play();
      setSelectedVideo(selected);
    }
  };

  const handleWeddingPageChange = () => {
    showWeddingContent();
  };

  const handleCorporatePageChange = () => {
    showCorporateContent();
  };

  const showWeddingContent = async () => {
    setWeddingsStatus("pending");
    const response = await getAllWeddings();
    const updatedWeddings = handleWeddingNames(response, true);
    setState(updatedWeddings);
    setSelectedVideo(updatedWeddings[0]);
    setPage("weddings");
    setWeddingsStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setWeddingsStatus("idle");
    }, 1000);
  };

  const showCorporateContent = async () => {
    setCorporateStatus("pending");
    const response = await getAllCorporate();
    setState(response);
    setSelectedVideo(response[0]);
    setPage("corporate");
    setCorporateStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setCorporateStatus("idle");
    }, 1000);
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
    await deleteWedding(selectedVideo);

    const weddingData = await getAllWeddings();
    const updatedWeddings = handleWeddingNames(weddingData, true);

    if (state.length === state.indexOf(selectedVideo)) {
      setSelectedVideo(updatedWeddings[updatedWeddings.length]);
    } else {
      setSelectedVideo(state.indexOf(selectedVideo) + 1);
    }
    setState(updatedWeddings);
    return;
  };

  const handleDeleteCorporateSubmit = async () => {
    // get the latest data and update state with it.
    await deleteCorporate(selectedVideo);
    const corporateData = await getAllCorporate();
    setState(corporateData);

    const corporateDataClone = cloneDeep(state);

    const selectedVideoInState = corporateDataClone.find(
      (item) => item.id === selectedVideo.id
    );

    const index =
      corporateDataClone.length === index
        ? corporateDataClone.indexOf(selectedVideoInState) - 1
        : corporateDataClone.indexOf(selectedVideoInState) + 1;

    setSelectedVideo(corporateDataClone[index]);
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

  const handleClickOutside = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setPopUpOpen(false);
    }
  };

  const handleDeleteContentPopUp = () => {
    setPopUpOpen(!popUpOpen);
  };

  const dataResolved =
    weddingsStatus !== "pending" && corporateStatus !== "pending"
      ? true
      : false;

  const defaultValues = dataResolved
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

  // Framer Motion Animation //

  const variants = {
    hidden: {
      display: "flex",
      justifyContent: "center",
      transition: {
        type: "spring",
      },
    },
    show: {
      display: "flex",
      justifyContent: "flex-start",
      transition: {
        type: "spring",
        delayChildren: 0.1,
        staggerChildren: 0.7,
      },
    },
  };

  return (
    <AnimateSharedLayout>
      <Container
        variants={variants}
        initial="hidden"
        animate={page ? "show" : "hidden"}
      >
        <AdminButtonsSection
          handleWeddingPageChange={handleWeddingPageChange}
          weddingsStatus={weddingsStatus}
          handleCorporatePageChange={handleCorporatePageChange}
          corporateStatus={corporateStatus}
          page={page}
          operation="Edit"
        />

        <AnimatePresence>
          {dataResolved && (
            <AnimateSharedLayout>
              <Videos
                data={state}
                page={page}
                selectedVideo={selectedVideo}
                handleClick={handleClick}
                showAdminContentData={true}
                editDeleteContent={true}
                handleDeleteWeddingSubmit={handleDeleteWeddingSubmit}
                handleDeleteCorporateSubmit={handleDeleteCorporateSubmit}
                handleDeleteContentPopUp={handleDeleteContentPopUp}
              />
            </AnimateSharedLayout>
          )}
        </AnimatePresence>

        {page !== null && (
          <AdminContentForm
            page={page}
            defaultValues={defaultValues}
            dataResolved={dataResolved}
            selectedVideo={selectedVideo}
            handleWeddingSubmit={handleEditWeddingSubmit}
            handleCorporateSubmit={handleEditCorporateSubmit}
            selectedVideo={selectedVideo}
            operation="Edit"
          />
        )}

        <DeletePopupOverlay
          popUpOpen={popUpOpen}
          closePopup={handleDeleteContentPopUp}
          selectedVideo={selectedVideo}
          page={page}
          handleDeleteWeddingSubmit={handleDeleteWeddingSubmit}
          handleDeleteCorporateSubmit={handleDeleteCorporateSubmit}
          ref={popUpRef}
        />
      </Container>
    </AnimateSharedLayout>
  );
};

export default AdminEditContent;

const Container = styled(motion.div)`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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
