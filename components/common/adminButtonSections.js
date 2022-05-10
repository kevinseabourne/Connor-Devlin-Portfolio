import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import AdminButton from "../adminButton";

const AdminButtonsSection = ({
  handleButtonChange,
  buttons,
  selectedData,
  operation,
  status,
}) => {
  const mountAnimation = {
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
      },
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.5,
        type: "spring",
      },
    },
  };

  return (
    <ButtonsContainer
      variants={mountAnimation}
      initial="hidden"
      animate="show"
      layout
    >
      <Title variants={mountAnimation}>
        Choose a section to {operation} {operation === "Add" ? "to" : ""} ?
      </Title>
      <ButtonsInnerContainer variants={mountAnimation}>
        {buttons.map((button) => (
          <AdminButton
            key={button.dataTitle}
            button={button}
            handleButtonChange={handleButtonChange}
            selectedData={selectedData}
            status={status}
          />
        ))}
      </ButtonsInnerContainer>
    </ButtonsContainer>
  );
};

export default AdminButtonsSection;

AdminButtonsSection.propTypes = {
  handleButtonChange: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataTitle: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedData: PropTypes.string,
  operation: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const ButtonsContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 20px;
  box-sizing: border-box;
  @media (max-width: 609px) {
    padding: 30px 20px;
  }
`;

const Title = styled(motion.h1)`
  margin: 0px 20px;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 750px) {
    font-size: 1.4rem;
  }
  @media (max-width: 609px) {
    font-size: 1rem;
  }
`;

const ButtonsInnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 609px) {
    padding: 0px 20px;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
  }
`;
