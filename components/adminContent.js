import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Videos from "./common/videos";
import {
  getContent,
  getMoreContent,
  addContent,
  editContent,
  deleteContent,
} from ".././pages/api/content";
import { isArrayEmpty, isObjEmpty } from "./common/utils/isEmpty";
import { motion, AnimateSharedLayout } from "framer-motion";
import { handleWeddingNames } from "./common/utils/handleWeddingName";
import { bundleDualInputValuesIntoObj } from "./common/utils/bundleDualInputValuesIntoObj";
import AdminContentForm from "./common/adminContentForm";
import popSound from ".././public/sounds/pop.mp3";
import useSound from "use-sound";
import AdminButtonsSection from "./common/adminButtonSections";
import { errorMessage } from "./common/utils/errorMessage";
import isEqual from "lodash.isequal";
import moment from "moment";

const AdminContent = ({ operation }) => {
  const [state, setState] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [sameSelectedData, setSameSelectedData] = useState(false);
  const [status, setStatus] = useState("idle");
  const [buttons] = useState([
    { title: "Weddings", dataTitle: "weddings" },
    { title: "Corporate", dataTitle: "corporate" },
  ]);
  const [videoOverlayOpen, setVideoOverlayOpen] = useState(false);
  const [flexStart, setFlexStart] = useState(false);

  const timeout = useRef(null);
  const timeoutThird = useRef(null);

  const [play] = useSound(popSound, { volume: 0.2 });

  useEffect(() => {
    return () => {
      clearTimeout(timeoutThird.current);
      clearTimeout(timeout.current);
    };
  }, []);

  useEffect(() => {
    if (status === "pending" && !flexStart) {
      setFlexStart(true);
    } else if (status === "resolved") {
      timeout.current = setTimeout(() => {
        setStatus("idle");
      }, 1000);
    }
  }, [status]);

  const handleGetContent = async (newDataTitle, showDataAfterDelete) => {
    newDataTitle ? setSameSelectedData(false) : setSameSelectedData(true);
    status !== "pending" && setStatus("pending");
    const response = await getContent(
      newDataTitle ? newDataTitle : selectedData
    );

    if (response) {
      let data = response;
      if (newDataTitle === "weddings") {
        data = handleWeddingNames(response, true);
      }

      // prevent items from animating out if the new data request is the same as the current selectedData

      newDataTitle && setSelectedData(newDataTitle);
      operation === "Edit" &&
        handleSelectedItemAfterDataRequest(
          data,
          newDataTitle,
          showDataAfterDelete
        );
      setState(data);

      setStatus("resolved");
    } else {
      errorMessage();
    }
  };

  const handleGetMoreContent = async () => {
    setSameSelectedData(true);
    setStatus("pending");

    const lastIndex = state[state.length - 1];
    const lastIndexClone = { ...lastIndex };

    lastIndexClone.date = moment(lastIndex.date, "DD-MM-YYYY").toDate();

    const response = await getMoreContent(lastIndexClone, selectedData);

    let newData = [];
    if (response) {
      if (selectedData === "weddings") {
        const updatedWeddingsData = handleWeddingNames(response);
        newData = updatedWeddingsData;
      } else {
        newData = response;
      }

      setState([...state, ...newData]);
    } else {
      errorMessage();
    }
    setStatus("resolved");
  };

  const handleAddContent = async (data) => {
    setSameSelectedData(true);
    setStatus("pending");

    // organise data from form into an object that fits database requirments
    let dataObj = {};
    switch (selectedData) {
      case "weddings":
        const updatedData = bundleDualInputValuesIntoObj(
          data,
          "partnerFirstName",
          "partnerLastName",
          "firstName",
          "lastName",
          "partners"
        );
        dataObj = arrangeWeddingDataObj(updatedData);
        break;
      case "corporate":
        dataObj = arrangeCorporateDataObj(data);
        break;
    }
    // organise data from form into an object that fits database requirments
    const response = await addContent(selectedData, dataObj);

    if (response) {
      await handleGetContent(selectedData);
      return true;
    } else {
      errorMessage();
    }
  };

  const handleEditContent = async (data) => {
    setSameSelectedData(true);
    setStatus("pending");
    // organise data from form into an object that fits database requirments
    let dataObj = {};
    switch (selectedData) {
      case "weddings":
        const updatedData = bundleDualInputValuesIntoObj(
          data,
          "partnerFirstName",
          "partnerLastName",
          "firstName",
          "lastName",
          "partners"
        );
        dataObj = arrangeWeddingDataObj(updatedData);
        break;
      case "corporate":
        dataObj = arrangeCorporateDataObj(data);
        break;
    }
    const response = await editContent(selectedData, selectedItem.id, dataObj);

    if (response) {
      await handleGetContent(selectedData);
      return true;
    } else {
      errorMessage();
    }
  };

  const handleDeleteContent = async () => {
    setSameSelectedData(true);
    setStatus("pending");

    const response = await deleteContent(selectedData, selectedItem.id);

    if (response) {
      handleGetContent(selectedData, true);
      return true;
    } else {
      errorMessage();
    }
  };

  // ------------------------ Selected Item ------------------------ //

  // handleSelectedItemAfterDataRequest
  // this function updates the selectedItem in state. With it's corresponding item from the database,
  // selectedItem may change from different data being selected (weddings,corporate),
  // updating selectedItem with the data in the database or changing the selectedItem due that item being deleted in the database.

  const handleSelectedItemAfterDataRequest = (
    data,
    newSelectedData,
    showDataAfterDelete
  ) => {
    if (isObjEmpty(selectedItem) || newSelectedData) {
      // The first item in state is selected by default on page load
      setSelectedItem(data[0]);
    } else if (!isObjEmpty(selectedItem) && showDataAfterDelete) {
      // after delete
      handleSelectedItemAfterDelete();
    } else {
      // after edit
      handleSelectedItemAfterEdit(data);
    }
  };

  const handleSelectedItemAfterClick = (id) => {
    const selected = state.find((item) => item.id === id);
    if (
      (operation === "Edit" && isObjEmpty(selectedItem)) ||
      (operation === "Edit" && selected.id !== selectedItem.id)
    ) {
      play();
    } else if (operation === "Add") {
      setVideoOverlayOpen(!videoOverlayOpen);
    }
    setSelectedItem(selected);
  };

  const handleSelectedItemAfterEdit = (data) => {
    if (!isObjEmpty(selectedItem)) {
      const updatedSelectedItem = data.find(
        (item) => item.id === selectedItem.id
      );

      if (!isEqual(selectedItem, updatedSelectedItem)) {
        setSelectedItem(updatedSelectedItem);
      }
    }
  };

  const handleSelectedItemAfterDelete = () => {
    const selectedItemIndex = state.indexOf(selectedItem);

    const newSelectedItemIndex =
      selectedItemIndex === 0 ? selectedItemIndex + 1 : selectedItemIndex - 1;
    const newSelectedItem = state[newSelectedItemIndex];
    setSelectedItem(newSelectedItem);
  };

  const arrangeWeddingDataObj = (data) => {
    return {
      coverPhoto: data.coverPhoto,
      location: {
        state: data.stateTerritory.value,
        suburb: data.suburb,
      },
      date: moment(data.date, "DD-MM-YYYY").toDate(),
      partners: data.partners,
      description: data.description,
      video: `https://player.vimeo.com/video/${data.videoId}?autoplay=1`,
      duration: data.duration,
      testimonial: data.testimonial,
      videoId: data.weddingVideoId,
    };
  };

  const arrangeCorporateDataObj = (data) => {
    return {
      company: data.company,
      coverPhoto: data.coverPhoto,
      description: data.description,
      date: moment(data.date, "DD-MM-YYYY").toDate(),
      testimonial: data.corporateTestimonial,
      video: `https://player.vimeo.com/video/${data.videoId}?autoplay=1`,
      duration: data.duration,
      videoId: data.corporateVideoId,
    };
  };

  const closeOverlay = () => {
    setVideoOverlayOpen(false);
  };

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
        staggerChildren: 0.3,
        delayChildren: 0.9,
        staggerChildren: 0.9,
      },
    },
  };

  const animationVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <AnimateSharedLayout>
      <Container
        variants={variants}
        initial="hidden"
        animate={selectedData ? "show" : "hidden"}
      >
        <AdminButtonsSection
          handleButtonChange={handleGetContent}
          buttons={buttons}
          selectedData={selectedData}
          operation={operation}
          status={status}
        />
        <Videos
          data={state}
          selectedData={selectedData}
          sameSelectedData={sameSelectedData}
          handleGetMoreContent={handleGetMoreContent}
          handleDeleteContent={handleDeleteContent}
          status={status}
          selectedItem={selectedItem}
          videoOverlayOpen={videoOverlayOpen}
          handleSelectedItemAfterClick={handleSelectedItemAfterClick}
          showAdminContentData={true}
          closeOverlay={closeOverlay}
          operation={operation}
        />

        {selectedData && (
          <AdminContentForm
            selectedData={selectedData}
            selectedItem={selectedItem}
            handleAddContent={handleAddContent}
            handleEditContent={handleEditContent}
            operation={operation}
            status={status}
          />
        )}
      </Container>
    </AnimateSharedLayout>
  );
};

export default AdminContent;

AdminContent.propTypes = {
  operation: PropTypes.string.isRequired,
};

const Container = styled(motion.div)`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
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

const AnimationContainer = styled(motion.div)`
  width: 100%;
`;
