import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./loading-spinner";

const AdminButton = ({ button, handleButtonChange, selectedData, status }) => {
  const [buttonStatus, setButtonStatus] = useState("idle");

  const handleButtonClick = (newDataTitle) => {
    setButtonStatus("pending");
    handleButtonChange(newDataTitle);
  };

  useEffect(() => {
    status === "resolved" && setButtonStatus("idle");
  }, [status]);

  const buttonAnimation = {
    hidden: {
      scale: 0.85,
      color: "rgba(50,172,109,1)",
      backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100.2% )`,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    },
    show: {
      scale: 1,
      color: "rgb(255, 255, 255)",
      backgroundImage: `radial-gradient( circle farthest-corner at 10% 20%, rgba(50,172,109,1) 0%, rgba(209,251,155,1) 100.2% )`,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    },
  };

  const renderLoadingSpinner =
    button.dataTitle !== selectedData &&
    status === "pending" &&
    buttonStatus === "pending";

  const disableButton =
    button.dataTitle === selectedData || status === "pending" ? true : false;

  return (
    <Button
      variants={buttonAnimation}
      animate={button.dataTitle === selectedData ? "show" : "hidden"}
      onClick={() => handleButtonClick(button.dataTitle)}
      disabled={disableButton}
    >
      {renderLoadingSpinner ? (
        <LoadingSpinner size={"28px"} stroke="rgba(50,172,109,1)" />
      ) : (
        button.title
      )}
    </Button>
  );
};

export default AdminButton;

AdminButton.propTypes = {
  button: PropTypes.object.isRequired,
  handleButtonChange: PropTypes.func.isRequired,
  selectedData: PropTypes.string,
  status: PropTypes.string.isRequired,
};

const Button = styled(motion.button)`
  font-size: 1rem;
  min-height: 54px;
  padding: 14px 30px;
  border-radius: 9px;
  margin-right: 5px;
  border: none;
  min-width: 136.16px;
  position: relative;
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
