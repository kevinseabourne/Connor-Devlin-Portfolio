import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import playIcon from "../../public/images/playIcon.svg";
import ImageLoader from "./imageLoader";
import VideoOverlay from "./videoOverlay";
import moment from "moment";
import lodash from "lodash";
import { handleWeddingNames } from "./utils/handleWeddingName";
import { LoadingSpinner } from "../loading-spinner";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { getNextWeddings } from "../../pages/api/weddings";
import DeleteContent from "../deleteContent";
import cloneDeep from "lodash/cloneDeep";
import { useInView } from "react-intersection-observer";
import "intersection-observer";

const Videos = ({
  page,
  data,
  handleClick,
  imageLoaded,
  selectedVideo,
  isOpen,
  closeOverlay,
  weddingNames,
  editDeleteContent,
  showAdminContentData,
  handleDeleteContentPopUp,
}) => {
  const [state, setState] = useState([]);
  const [mount, setMount] = useState(false);
  const [status, setStatus] = useState("idle");
  const [positionY, setPositionY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  const [hover, setHover] = useState(false);
  const timeout = useRef(null);

  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px",
  });

  useEffect(() => {
    if (entry) {
      setScrollingDown(positionY > entry.boundingClientRect.y);
      setPositionY(entry.boundingClientRect.y);
    }
  }, [entry]);

  useEffect(() => {
    setStateChange(true);
    timeout.current = setTimeout(() => {
      setStateChange(false);
    }, 1000);
    return () => clearTimeout(timeout.current);
  }, [state]);

  useEffect(() => {
    setState(data);
    setMount(true);
    return () => setMount(false);
  }, [data]);

  const handleShowMore = async () => {
    setStatus("pending");
    let stateClone = cloneDeep(state);
    const lastIndex = state[state.length - 1];
    lastIndex.date = moment(lastIndex.date, "DD-MM-YYYY").toDate();
    const response = await getNextWeddings(lastIndex);

    let newData = [];
    if (response) {
      if (page === "weddings") {
        const updatedWeddingsData = handleWeddingNames(response);
        newData = updatedWeddingsData;
      } else {
        newData = response;
      }

      newData.map((item) => {
        stateClone.push(item);
      });
      setState(stateClone);
    }
    setStatus("resolved");
  };

  const handleHover = (id) => {
    if (!editDeleteContent) {
      const stateClone = cloneDeep(state);
      const updatedState = stateClone.map((item) => {
        if (item.id === id && !item.hover) {
          item.hover = true;
          return item;
        } else {
          item.hover = false;
          return item;
        }
      });
      setState(updatedState);
    }
  };

  const handleOnLoadOutside = () => {
    console.log("hey");
  };

  // Framer Motion Animation

  const container = {
    hidden: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
        staggerDirection: scrollingDown ? -1 : 1,
      },
    },
  };

  const itemA = {
    hidden: { scale: 0.96, opacity: 0, y: 12 },
    show: { scale: 1, opacity: 1, y: 0 },
  };

  const itemB = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const dotAnimation = {
    hidden: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      opacity: 0,
      transform: "scale(0)",
    },
    show: {
      backgroundColor: "rgba(50,172,109,1)",
      opacity: 1,
      transform: "scale(1)",
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

  const parent = {
    hidden: { scale: 1 },
    show: { scale: 1 },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: [0, 1, 0.84, 1, 0.95, 1],
      transition: {
        type: "spring",
        damping: 12,
        mass: 0.2,
        stiffness: 150,
      },
    },
  };

  const buttonAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring" } },
  };

  return (
    <AnimateSharedLayout>
      <Container
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        layout
      >
        <VideoContainer data-testid="videoContainer" ref={ref} layout>
          {state.map((item) => (
            <Item
              key={item.id}
              variants={itemA}
              layoutId={item.id}
              exit="hidden"
              className="item"
            >
              <ImageContainer
                onClick={() => handleClick(item.id)}
                onKeyDown={(e) => {
                  const key = e.key === 27 || e.keyCode === 27;
                  key && handleClick(item.id);
                }}
                data-testid="item"
                variants={parent}
                initial="hidden"
                onPointerEnter={() => handleHover(item.id)}
                onPointerLeave={() => handleHover(item.id)}
              >
                <ImageLoader
                  maxWidth="100%"
                  placeholderSize="56.2%"
                  src={item.coverPhoto}
                  hover={true}
                  borderRadius="19px"
                  opacity="0"
                  scale="0.99"
                  transitionDuration={350}
                  transitionTiming="ease"
                  boxShadow="0px 9px 20px rgba(0,0,0,0.2)"
                  borderRadius={"9px"}
                  handleOnLoadOutside={handleOnLoadOutside}
                  iconSrc={editDeleteContent ? null : null}
                  iconMaxWidth="45px"
                  alt={page === "weddings" ? item.displayNames : item.company}
                  editDeleteContent={editDeleteContent}
                  iconMaxHeight="45px"
                  dataTestId="weddingPhoto"
                  handleOnLoadOutside={handleOnLoadOutside}
                />
                {!editDeleteContent && (
                  <PlayIconContainer
                    variants={child}
                    initial="hidden"
                    animate={item.hover ? { scale: 1.1 } : { scale: 1 }}
                  >
                    <ImageLoader
                      maxWidth="inherit"
                      placeholderSize="100%"
                      hover={true}
                      alt="play Icon"
                      src={playIcon}
                      centerImage={true}
                    />
                  </PlayIconContainer>
                )}

                {editDeleteContent && (
                  <EditDeleteContainer>
                    <SelectedVideoButton>
                      <Dot
                        variants={dotAnimation}
                        animate={
                          selectedVideo.id === item.id ? "show" : "hidden"
                        }
                      />
                    </SelectedVideoButton>
                    <AnimatePresence>
                      <DeleteIconContainer
                        onClick={() => {
                          handleDeleteContentPopUp();
                          // play();
                        }}
                        variants={variants}
                        animate={
                          selectedVideo.id === item.id ? "show" : "hidden"
                        }
                      >
                        <ImageLoader
                          maxWidth="20px"
                          placeholderSize="100%"
                          opacity="0"
                          transitionTime="300ms ease"
                          hover={true}
                          alt="delete"
                          src={
                            "https://chpistel.sirv.com/Connor-Portfolio/clear.png?colorlevel.white=0&w=40"
                          }
                          centerImage={true}
                        />
                      </DeleteIconContainer>
                    </AnimatePresence>
                  </EditDeleteContainer>
                )}
              </ImageContainer>
              {!showAdminContentData && (
                <Names
                  title="contentName"
                  variants={itemB}
                  key={state.indexOf(item)}
                  onClick={() => handleClick(item.id)}
                >
                  {page === "weddings" ? item.displayNames : item.company}
                </Names>
              )}

              {showAdminContentData && (
                <WrappedNames onClick={() => handleClick(item.id)}>
                  {item.displayNames
                    ? item.displayNames.replace("&", "\n")
                    : item.company}
                </WrappedNames>
              )}

              {showAdminContentData && (
                <AdminVideoContent>
                  <EventDate>{item.date}</EventDate>
                  {page === "wedings" && (
                    <Location>{`${item.location.suburb}, ${item.location.state}`}</Location>
                  )}
                  {page === "corporate" && (
                    <Description>{item.description}</Description>
                  )}
                </AdminVideoContent>
              )}
            </Item>
          ))}

          <VideoOverlay
            isOpen={isOpen}
            closeOverlay={closeOverlay}
            src={selectedVideo.video}
            maxWidth={"900px"}
            placeholderSize={"56.25%"}
            alt={page === "weddings" ? weddingNames : selectedVideo.company}
            centerVideo={true}
          />
        </VideoContainer>
        {state.length >= 20 && (
          <ShowMoreButton
            layout
            variants={buttonAnimation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShowMore}
          >
            {status === "pending" ? (
              <LoadingSpinner size={"28px"} />
            ) : (
              "Show More"
            )}
          </ShowMoreButton>
        )}
      </Container>
    </AnimateSharedLayout>
  );
};

export default Videos;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  box-sizing: border-box;
`;

const VideoContainer = styled(motion.ul)`
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
    ${PlayIcon} {
      transform: scale(1);
    }
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const SelectedVideoButton = styled(motion.div)`
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
  ${"" /* z-index: 14; */}
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
  max-width: 30px;
  width: 100%;
  top: 0px;
  right: 0px;
  padding-top: 20px;
  padding-right: 20px;
`;

const Item = styled(motion.li)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled(motion.img)`
  width: 100%;
  max-width: 500px;
`;

const Names = styled(motion.label)`
  font-size: 1.2rem;
  letter-spacing: 0.8px;
  margin-left: auto;
  margin-right: auto;
  white-space: normal;
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

const WrappedNames = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  align-items: center;
  text-align: center;
  @media (max-width: 1500px) {
    font-size: 0.9rem;
  }
`;

const AdminVideoContent = styled.div`
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

const ShowMoreButton = styled(motion.button)`
  margin-top: 10px;
  font-size: 1rem;
  width: 100%;
  max-width: 280px;
  min-width: 280px;
  min-height: 54px;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  margin-bottom: 30px;
  white-space: nowrap;
  color: white;
  position: relative;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
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
