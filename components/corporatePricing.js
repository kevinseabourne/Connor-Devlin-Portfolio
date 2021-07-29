import PropTypes from "prop-types";
import ContactForm from "../components/common/contactForm";
import styled from "styled-components";
import { motion } from "framer-motion";

const CorporatePricing = ({ data }) => {
  const containerAnimation = {
    hidden: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <Container variants={containerAnimation} initial="hidden" animate="show">
      <ContactForm data={data} />
    </Container>
  );
};

export default CorporatePricing;

CorporatePricing.propTypes = {
  data: PropTypes.any,
};

const Container = styled(motion.div)`
  height: 100%;
  min-height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  @media (min-width: 1023px) and (max-height: 810px) {
    height: 100%;
  }
`;
