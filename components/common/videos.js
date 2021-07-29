import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import VideoOverlay from "./videoOverlay";
import { isArrayEmpty } from "./utils/isEmpty";
import { LoadingSpinner } from "../loading-spinner";
import Item from "./item";
import { motion, AnimatePresence } from "framer-motion";
import DeletePopUp from "../common/deletePopUp";

const Videos = ({
  selectedData,
  data,
  sameSelectedData,
  status,
  selectedItem,
  videoOverlayOpen,
  closeOverlay,
  weddingNames,
  handleSelectedItemAfterClick,
  operation,
  handleGetMoreContent,
  handleDeleteContent,
  showAdminContentData,
}) => {
  const [state, setState] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const itemsRef = useRef(new Array());
  const deletePopUpRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", closeDeletePopUp);
    return () => {
      window.removeEventListener("mousedown", closeDeletePopUp);
    };
  }, []);

  useEffect(() => {
    if (popUpOpen && deletePopUpRef.current) {
      deletePopUpRef.current.focus();
    }

    if (!popUpOpen && isArrayEmpty(itemsRef.current)) {
      bringItemInfocusItemAfterPopUp();
    }
  }, [popUpOpen]);

  useEffect(() => {
    if (!videoOverlayOpen && isArrayEmpty(itemsRef.current)) {
      bringItemInfocusItemAfterPopUp();
    }
  }, [videoOverlayOpen]);

  useEffect(() => {
    isArrayEmpty(itemsRef.current) && itemsRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (showAdminContentData) {
      if (animationComplete && data) {
        setState(data);
      }
      if (status === "pending" && !sameSelectedData) {
        // account for the first render only set to false when state is filled
        isArrayEmpty(state) && setAnimationComplete(false);
        setState([]);
      }
    } else if (data) {
      setState(data);
    }
  }, [data, sameSelectedData, animationComplete, status, showAdminContentData]);

  const handleAnimationComplete = () => {
    setState([]);
    setAnimationComplete(true);
  };

  // ------------------------ Delete Popup ------------------------ //

  const toggleDeletePopUp = () => {
    setPopUpOpen(!popUpOpen);
  };

  const closeDeletePopUp = (e) => {
    if (deletePopUpRef.current && !deletePopUpRef.current.contains(e.target)) {
      setPopUpOpen(false);
    }
  };

  // ------------------------ Accessibility ------------------------ //

  const bringItemInfocusItemAfterPopUp = () => {
    itemsRef.current = itemsRef.current.filter((i) => i);

    const selectedItemIndex = state.indexOf(selectedItem);
    itemsRef.current[selectedItemIndex] &&
      itemsRef.current[selectedItemIndex].focus();
  };

  // Framer Motion Animation

  const productsContainer = {
    hidden: {
      transition: {
        staggerDirection: -1,
        staggerChildren: 0.2,
        stiffness: 0,
      },
    },
    show: {
      transition: {
        delayChildren: 0,
        staggerChildren: 0.3,
        stiffness: 0,
        staggerDirection: 1,
      },
    },
  };

  const buttonAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring" } },
  };

  // ------------------------ Notes ------------------------ //
  // Staggered intro and exit Animation between mapped states was dificult.
  // Due to layout shift by animating between states,
  // I made the state empty once the exit animation had completed
  // I took into account the onExitComplete function may run before or after data has finishing loading
  //

  // if any data is requested and it is the same as the current selectedData then do not animate it out
  const renderCondition = sameSelectedData
    ? sameSelectedData
    : isArrayEmpty(state) && animationComplete && status !== "pending";

  return (
    <Container layout>
      <AnimatePresence onExitComplete={handleAnimationComplete}>
        {renderCondition && (
          <VideoContainer
            data-testid="videoContainer"
            variants={productsContainer}
            initial="hidden"
            animate="show"
            exit="hidden"
            layout
          >
            <AnimatePresence>
              {state.map((item) => (
                <Item
                  item={item}
                  selectedData={selectedData}
                  toggleDeletePopUp={toggleDeletePopUp}
                  handleSelectedItemAfterClick={handleSelectedItemAfterClick}
                  key={item.id}
                  showAdminContentData={showAdminContentData}
                  operation={operation}
                  selectedItem={selectedItem}
                  ref={(element) => itemsRef.current.push(element)}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {videoOverlayOpen && (
                <VideoOverlay
                  isOpen={videoOverlayOpen}
                  src={selectedItem.video}
                  closeOverlay={closeOverlay}
                  maxWidth={"900px"}
                  placeholderSize={"56.25%"}
                  alt={
                    selectedData === "weddings"
                      ? weddingNames
                      : selectedItem.company
                  }
                  centerVideo={true}
                />
              )}
            </AnimatePresence>
            {showAdminContentData && popUpOpen && (
              <DeletePopUp
                popUpOpen={popUpOpen}
                closePopUp={closeDeletePopUp}
                togglePopUp={toggleDeletePopUp}
                handleDelete={handleDeleteContent}
                ref={deletePopUpRef}
              />
            )}
          </VideoContainer>
        )}
      </AnimatePresence>
      {state.length >= 12 && (
        <ShowMoreButton
          layout
          variants={buttonAnimation}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGetMoreContent}
        >
          {status === "pending" ? (
            <LoadingSpinner size={"28px"} />
          ) : (
            "Show More"
          )}
        </ShowMoreButton>
      )}
    </Container>
  );
};

export default Videos;

Videos.propTypes = {
  selectedData: PropTypes.string,
  data: PropTypes.any,
  sameSelectedData: PropTypes.bool,
  status: PropTypes.string,
  selectedItem: PropTypes.object,
  videoOverlayOpen: PropTypes.bool,
  closeOverlay: PropTypes.func,
  weddingNames: PropTypes.bool,
  handleSelectedItemAfterClick: PropTypes.func,
  operation: PropTypes.string,
  handleGetMoreContent: PropTypes.func,
  handleDeleteContent: PropTypes.func,
  showAdminContentData: PropTypes.bool,
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 640px));
  justify-content: center;
  align-items: flex-start;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: calc(100vw * 0.04) 3%;
  padding-left: 0px;
  box-sizing: border-box;
  background-color: transparent;
  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-gap: calc(100vw * 0.05) 20px;
  }
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    grid-gap: calc(100vw * 0.1) 20px;
  }
`;

const ShowMoreButton = styled(motion.button)`
  margin-top: 80px;
  font-size: 1rem;
  width: 100%;
  max-width: 280px;
  min-width: 280px;
  min-height: 54px;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  margin-bottom: 20px;
  white-space: nowrap;
  color: white;
  position: relative;
  font-weight: 600;
  ${"" /* box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px; */}
  transition: all 0.2s ease;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 1250px) {
    margin-top: 40px;
  }
  @media (max-width: 750px) {
    margin-top: 0px;
    margin-bottom: 60px;
    max-width: 100%;
    width: 100%;
  }
`;
