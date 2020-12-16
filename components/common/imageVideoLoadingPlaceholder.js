import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const ImageVideoLoadingPlaceholder = ({
  duration,
  maxWidth,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  borderRadius,
  contentLoaded,
  placeholderSize,
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
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        borderRadius={borderRadius}
      >
        <Placeholder
          borderRadius={borderRadius}
          placeholderSize={placeholderSize}
        />
        <PlaceholderAnimation
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

export default ImageVideoLoadingPlaceholder;

const PlaceHolderContainer = styled(motion.div)`
  width: 100%;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "0px")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "0px")};
  position: relative;
  background: transparent;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 10px 40px -10px rgba(0, 64, 128, 0.2);
`;

const Placeholder = styled(motion.div)`
  width: 100%;
  margin: auto;
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
`;

const PlaceholderAnimation = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    0.25turn,
    transparent 0%,
    #d1d5db 25%,
    transparent 50%
  );
  position: absolute;
  top: 0;
  left: 0;
  vertical-align: middle;
  overflow: hidden;
  width: 100%;
  height: 100%;
  ${"" /* filter: blur(5px); */}
`;
