import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const TextLoadingPlaceholder = ({
  duration,
  maxWidth,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  borderRadius,
  contentLoaded,
}) => {
  const containerAnimation = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <PlaceHolderContainer
        variants={containerAnimation}
        animate={contentLoaded ? "hidden" : "show"}
        exit="hidden"
        maxWidth={maxWidth}
        height={height}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        borderRadius={borderRadius}
        data-testid="text-loading-skeleton"
      >
        <Placeholder
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            type: "spring",
            repeat: Infinity,
            duration: duration ? duration : 1.5,
          }}
        />
      </PlaceHolderContainer>
    </AnimatePresence>
  );
};

export default TextLoadingPlaceholder;

TextLoadingPlaceholder.propTypes = {
  duration: PropTypes.number,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  borderRadius: PropTypes.string,
  contentLoaded: PropTypes.bool,
};

const PlaceHolderContainer = styled(motion.div)`
  width: 100%;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  height: ${({ height }) => (height ? height : "100%")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "0px")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "0px")};
  position: relative;
  z-index: 3;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 10px 40px -10px rgba(0, 64, 128, 0.2);
`;

const Placeholder = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    0.25turn,
    transparent 0%,
    #f3f4f6 25%,
    transparent 50%
  );
  position: absolute;
  vertical-align: middle;
  overflow: hidden;
  width: 100%;
  height: 100%;
  ${"" /* filter: blur(5px); */}
  ${"" /* #d1d5db */}
`;
