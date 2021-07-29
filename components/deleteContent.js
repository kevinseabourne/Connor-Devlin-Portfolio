import PropTypes from "prop-types";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import ImageLoader from "./common/imageLoader";
import popSound from ".././public/sounds/music_kalimba_off.mp3";

const DeleteContent = ({ handleDeleteContentPopUp, selectedVideo }) => {
  const [play] = useSound(popSound, { volume: 0.2 });

  const variants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <DeleteIconContainer
        onClick={() => {
          handleDeleteContentPopUp();
          play();
        }}
        variants={variants}
        animate={selectedVideo.id === item.id ? "show" : "hidden"}
        exit={"hidden"}
      >
        <ImageLoader
          maxWidth="30px"
          placeholderSize="100%"
          opacity="0"
          transitionTime="300ms ease"
          hover={true}
          src={"https://chpistel.sirv.com/Connor-Portfolio/clear.png?w=40"}
        />
      </DeleteIconContainer>
    </AnimatePresence>
  );
};

export default DeleteContent;

DeleteContent.propTypes = {
  handleDeleteContentPopUp: PropTypes.func.isRequired,
  selectedVideo: PropTypes.object,
};

const DeleteIconContainer = styled(motion.div)`
  position: absolute;
  width: 30px;
  top: 15px;
  right: 20px;
`;
