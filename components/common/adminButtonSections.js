import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LoadingSpinner } from "../loading-spinner";

const AdminButtonsSection = ({
  handleContentOnePageChange,
  handleContentTwoPageChange,
  contentOneStatus,
  contentTwoStatus,
  buttonOneTitle,
  buttonTwoTitle,
  page,
  operation,
}) => {
  const titleAnimation = {
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
      },
    },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  const buttonAnimation = {
    hidden: {
      scale: 0.85,
      color: "rgba(50,172,109,1)",
      backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100.2% )`,
      transition: {
        type: "spring",
      },
    },
    show: {
      scale: 1,
      color: "rgb(255, 255, 255)",
      backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%, rgba(50,172,109,1) 0%, rgba(209,251,155,1) 100.2% )`,
      transition: {
        type: "spring",
      },
    },
  };

  const addPackages = page === "packages" && operation === "Add";

  return (
    <ButtonsContainer layout>
      <Title variants={titleAnimation}>
        Choose a section to {operation} {operation === "Add" ? "to" : ""} ?
      </Title>
      {!addPackages && (
        <ButtonsInnerContainer>
          <WeddingsFormButton
            variants={buttonAnimation}
            animate={
              page === "weddings" || page === "packages" ? "show" : "hidden"
            }
            onClick={handleContentOnePageChange}
            disabled={page === "weddings" || page === "packages" ? true : false}
          >
            {contentOneStatus === "pending" ? (
              <LoadingSpinner size={"28px"} stroke="rgba(50,172,109,1)" />
            ) : (
              buttonOneTitle
            )}
          </WeddingsFormButton>
          <CorporateFormButton
            variants={buttonAnimation}
            animate={
              page === "corporate" || page === "addOns" ? "show" : "hidden"
            }
            onClick={handleContentTwoPageChange}
            disabled={page === "corporate" || page === "addOns" ? true : false}
          >
            {contentTwoStatus === "pending" ? (
              <LoadingSpinner size={"28px"} stroke="rgba(50,172,109,1)" />
            ) : (
              buttonTwoTitle
            )}
          </CorporateFormButton>
        </ButtonsInnerContainer>
      )}
    </ButtonsContainer>
  );
};

export default AdminButtonsSection;

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

const WeddingsFormButton = styled(motion.button)`
  font-size: 1rem;
  min-height: 54px;
  padding: 14px 30px;
  border-radius: 9px;
  margin-right: 5px;
  border: none;
  min-width: 136.16px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 750px) {
    font-size: 0.9rem;
  }
  @media (max-width: 609px) {
    width: 100%;
    margin-bottom: 15px;
  }
  @media (max-width: 390px) {
    margin-right: 0px;
  }
`;

const CorporateFormButton = styled(motion.button)`
  font-size: 1rem;
  min-height: 54px;
  padding: 14px 30px;
  margin-left: 5px;
  border-radius: 9px;
  font-weight: 600;
  border: none;
  min-width: 136.16px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 750px) {
    font-size: 0.9rem;
  }
  @media (max-width: 609px) {
    width: 100%;
  }
`;
