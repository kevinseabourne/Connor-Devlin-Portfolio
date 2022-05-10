import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import playIcon from "../../public/images/playIcon.svg";
import ImageLoader from "./imageLoader";
import { motion, AnimatePresence } from "framer-motion";
import TextLoadingPlaceholder from "../common/textLoadingPlaceholder";
import ImageVideoLoadingPlaceholder from "../common/imageVideoLoadingPlaceholder";

const Item = React.forwardRef(
  (
    {
      item,
      showAdminContentData,
      operation,
      selectedItem,
      handleSelectedItemAfterClick,
      selectedData,
      toggleDeletePopUp,
    },
    ref
  ) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleOnLoadOutside = () => {
      setImageLoaded(true);
    };

    const itemA = {
      hidden: { opacity: 0, y: -20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
        },
      },
    };

    const itemB = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.2,
        },
      },
    };

    const dotAnimation = {
      hidden: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        opacity: 0,
        scale: 0,
      },
      show: {
        backgroundColor: "rgba(50,172,109,1)",
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 800,
        },
      },
    };

    const variants = {
      hidden: { scale: 0, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 800,
          bounce: 1,
          damping: 25,
        },
      },
    };

    const loaderAnimation = {
      hidden: { opacity: 0, y: 0 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          stiffness: 0,
        },
      },
    };

    const itemAnimation = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          type: "spring",
          duration: 0.1,
        },
      },
      hover: {
        scale: 1,
      },
    };

    const playIconAnimation = {
      hidden: {
        opacity: 0,
        y: 0,
        scale: 0,
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.15,
          ease: "easeInOut",
        },
      },
      hover: {
        scale: 1.1,
        transition: {
          duration: 0.15,
          ease: "easeInOut",
        },
      },
    };

    return (
      <ItemContainer variants={itemA} exit="hidden" layout>
        {!imageLoaded && (
          <LoadingContainer variants={loaderAnimation} exit="hidden">
            <ImageVideoLoadingPlaceholder
              placeholderSize="56.3%"
              maxWidth="690px"
              borderRadius="9px"
              duration={1.3}
            />
            <TextLoadingPlaceholder
              marginTop="9px"
              marginLeft="auto"
              marginRight="auto"
              maxWidth="60%"
              height={showAdminContentData ? "64px" : "28px"}
              borderRadius="9px"
              duration={1.3}
            />
          </LoadingContainer>
        )}

        <ImageContainer
          onClick={() => handleSelectedItemAfterClick(item.id)}
          onKeyDown={(e) => {
            const key = e.key === 27 || e.keyCode === 27;
            key && handleSelectedItemAfterClick(item.id);
          }}
          ref={ref}
          whileHover="hover"
          data-testid="item"
          variants={itemAnimation}
          initial="hidden"
          animate={imageLoaded ? "show" : "hidden"}
        >
          <ImageLoader
            itemId={item.id}
            maxWidth="100%"
            placeholderSize="56.3%"
            src={item.coverPhoto}
            hover={true}
            opacity={0}
            boxShadow="0px 9px 20px rgba(0,0,0,0.2)"
            borderRadius={"9px"}
            handleOnLoadOutside={handleOnLoadOutside}
            alt={selectedData === "weddings" ? item.displayNames : item.company}
            dataTestId="photo"
          />
          {operation !== "Edit" && imageLoaded && (
            <PlayIconContainer variants={playIconAnimation} aria-label="play">
              <ImageLoader
                maxWidth="inherit"
                placeholderSize="100%"
                hover={true}
                opacity={0}
                alt="play Icon"
                src={playIcon}
                centerImage={true}
              />
            </PlayIconContainer>
          )}

          {operation !== "Edit" && (
            <VideoDuration>{item.duration}</VideoDuration>
          )}

          {operation === "Edit" && imageLoaded && (
            <EditDeleteContainer>
              <SelectedItemButton>
                <Dot
                  variants={dotAnimation}
                  animate={
                    selectedItem && selectedItem.id === item.id
                      ? imageLoaded
                        ? "show"
                        : "hidden"
                      : "hidden"
                  }
                  aria-label="Selected Item"
                />
              </SelectedItemButton>
              <AnimatePresence>
                {selectedItem.id === item.id && (
                  <DeleteIconContainer
                    onClick={toggleDeletePopUp}
                    variants={variants}
                    exit="hidden"
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      const enterKey = e.key === 13 || e.keyCode === 13;
                      enterKey && toggleDeletePopUp();
                    }}
                    animate={
                      selectedItem.id === item.id
                        ? imageLoaded
                          ? "show"
                          : "hidden"
                        : "hidden"
                    }
                    aria-label="Delete"
                  >
                    <ImageLoader
                      maxWidth="inherit"
                      placeholderSize="100%"
                      hover={true}
                      src={
                        "https://chpistel.sirv.com/Connor-Portfolio/error.png?w=60"
                      }
                    />
                  </DeleteIconContainer>
                )}
              </AnimatePresence>
            </EditDeleteContainer>
          )}
        </ImageContainer>

        {!showAdminContentData && (
          <Names
            title="contentName"
            variants={itemB}
            animate={imageLoaded ? "show" : "hidden"}
            key={item.id}
            onClick={() => handleClick(item.id)}
            data-testid="firstName"
          >
            {selectedData === "weddings" ? item.displayNames : item.company}
          </Names>
        )}

        {showAdminContentData && (
          <WrappedNames
            onClick={() => handleClick(item.id)}
            variants={itemB}
            animate={imageLoaded ? "show" : "hidden"}
            data-testid={item.displayNames ? "fullName" : "companyName"}
          >
            {item.displayNames
              ? showAdminContentData
                ? item.displayNames.replaceAll("&", "\n")
                : item.displayNames.replace("&", "\n")
              : item.company}
          </WrappedNames>
        )}

        {showAdminContentData && (
          <AdminVideoContent
            variants={itemB}
            animate={imageLoaded ? "show" : "hidden"}
          >
            {selectedData === "weddings" && item.location && (
              <Location data-testid="location">{`${item.location.suburb}, ${item.location.state}`}</Location>
            )}
            <EventDate data-testid="date">{item.date}</EventDate>
            {selectedData === "corporate" && (
              <Description data-testid="description">
                {item.description}
              </Description>
            )}
            <Description data-testid="testimonial">
              {item.testimonial}
            </Description>
          </AdminVideoContent>
        )}
      </ItemContainer>
    );
  }
);

export default Item;

Item.propTypes = {
  item: PropTypes.object,
  showAdminContentData: PropTypes.bool,
  operation: PropTypes.string,
  selectedItem: PropTypes.object,
  handleSelectedItemAfterClick: PropTypes.func,
  selectedData: PropTypes.string,
  toggleDeletePopUp: PropTypes.func,
};

const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 45px;
  max-height: 45px;
  width: 100%;
  height: 100%;
  margin: auto;
  transition: all 0.15s ease-in-out;
  transform: scale(0.9);
  opacity: ${({ imageLoaded }) => (imageLoaded ? 1 : 0)};
  @media (max-width: 750px) {
    max-width: 30px;
    max-height: 30px;
  }
`;

const VideoDuration = styled.div`
  position: absolute;
  right: 3.1%;
  bottom: 4.1%;
  font-family: "Karla-Bold";
  background-color: #ffffff;
  padding: 5px 10px;
  letter-spacing: 0.8px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 10px;
  transition: all 0.15s ease-in-out;
  opacity: 0;
  transform: scale(0.9) translateY(25px);
  @media (max-width: 1025px) {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
`;

const ImageContainer = styled(motion.button)`
  margin-bottom: 9px;
  background-color: transparent !important;
  border: none;
  padding: 0px;
  border: none;
  z-index: 0;
  position: relative;
  border-radius: 10px;
  transition: all 0.15s ease-in-out;
  &:hover {
    cursor: pointer;
    ${VideoDuration} {
      opacity: 1;
      transform: scale(1) translateY(0px);
    }
  }
  &:focus-visible {
    ${VideoDuration} {
      opacity: 1;
      transform: scale(1) translateY(0px);
    }
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const SelectedItemButton = styled(motion.div)`
  width: 20px;
  height: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: contain;
  object-position: left;
  border-radius: 50%;
  left: 20px;
  top: 20px;
  background-color: white;
  position: absolute;
`;

const EditDeleteContainer = styled(motion.div)``;

const PlayIconContainer = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 45px;
  max-height: 45px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Dot = styled(motion.div)`
  width: 60%;
  height: 60%;
  border-radius: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
`;

const DeleteIconContainer = styled(motion.div)`
  position: absolute;
  max-width: 40px;
  width: 100%;
  top: -15px;
  right: -15px;
  padding-left: 20px;
  padding-bottom: 20px;
  border: 0;
  padding: 0;
  background: transparent;
`;

const ItemContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const Names = styled(motion.label)`
  font-size: 1.18rem;
  font-family: "Karla-Bold";
  font-weight: 900;
  margin-left: auto;
  text-align: center;
  margin-right: auto;
  white-space: normal;
  position: relative;
  transition: all 0.15s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:hover {
    cursor: pointer;
    ${PlayIcon} {
      transform: scale(1);
    }
  }
  @media (max-width: 770px) {
    font-size: 1rem;
  }
  @media (max-width: 550px) {
    font-size: 1.2rem;
  }
`;

const WrappedNames = styled(motion.div)`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  align-items: center;
  text-align: center;
  @media (max-width: 1500px) {
    font-size: 0.9rem;
  }
`;

const AdminVideoContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1px;
  font-weight: 400;
  &:hover {
    cursor: default;
  }
`;

const EventDate = styled.span`
  @media (max-width: 1500px) {
    font-size: 0.9rem;
  }
`;

const Location = styled.span`
  @media (max-width: 1500px) {
    font-size: 0.9rem;
  }
`;

const Description = styled.p`
  @media (max-width: 1500px) {
    font-size: 0.9rem;
  }
`;
