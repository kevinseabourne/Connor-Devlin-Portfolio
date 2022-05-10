import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ImageLoader from "../components/common/imageLoader";
import DeletePopUp from "./common/deletePopUp";
import { usePrevious } from "./common/utils/hooks";
import { isArrayEmpty } from "./common/utils/isEmpty";
import styled from "styled-components";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

const WeddingPricingPackages = ({
  packages,
  status,
  operation,
  handleClick,
  selectedData,
  showAdminContent,
  selectedItem,
  showPackagesContent,
  handleSelectedPackageOnDelete,
  handleDeletePricingPackage,
}) => {
  const [stateChange, setStateChange] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const prevDeletePopup = usePrevious(popUpOpen);
  const deleteIconRef = useRef(new Array());
  const timeout = useRef(null);

  useEffect(() => {
    setStateChange(true);
    timeout.current = setTimeout(() => {
      setStateChange(false);
    }, 1000);
    return () => clearTimeout(timeout.current);
  }, [selectedData]);

  useEffect(() => {
    // keyboard accessibility
    // return focus back to mapped element after opening then closing an overlay onKeyDown
    if (selectedItem && !popUpOpen && prevDeletePopup) {
      // filter out null values
      deleteIconRef.current = deleteIconRef.current.filter((i) => i);
      // everytime a package is selected the deleteIcon of the
      // selected package is added to the end of the ref array
      const index = deleteIconRef.current.length - 1;
      deleteIconRef.current[index].focus();
    }
  }, [popUpOpen, prevDeletePopup, selectedItem]);

  const toggleDeletePopUp = () => {
    // you cannot delete all pricing packages
    setPopUpOpen(!popUpOpen);
  };

  const closeDeletePopUp = () => {
    setPopUpOpen(false);
  };

  const parent = {
    hidden: {
      transition: {
        staggerChildren: 0.4,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        delayChildren: stateChange ? 0.7 : 0,
        staggerChildren: 0.4,
        staggerDirection: 1,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      x: 15,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        damping: 12,
      },
    },
  };

  const buttonAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.2,
      },
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 800,
        mass: 0.5,
      },
    },
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

  return isArrayEmpty(packages) ? (
    <AnimateSharedLayout>
      <PackagesContainer
        initial="hidden"
        animate="show"
        variants={parent}
        exit="hidden"
        layout
      >
        {packages.map((packageItem, index) => (
          <Package
            key={index} // would have used 'id' as the key but. A test had a weird error and using index instead got rid of it.
            variants={child}
            layoutId={packageItem.id}
            onClick={() => handleClick(packageItem.id)}
            operation={operation}
            data-testid="pricing package"
          >
            <InnerPackageContainer>
              <Name data-testid="package name">{packageItem.packageName}</Name>
              <Price data-testid="package price">${packageItem.price}</Price>
              <Description data-testid="package description">
                {packageItem.description}
              </Description>
              <PackageDetailsContainer data-testid="package details">
                {packageItem.packageDetails.map((item, index) => (
                  <Item key={index}>{item}</Item>
                ))}
              </PackageDetailsContainer>
            </InnerPackageContainer>
            <Button
              disabled={showAdminContent ? true : false}
              data-testid={`contact-button-${index}`}
            >
              Contact
            </Button>

            {showAdminContent && (
              <SelectedPackageButton
                role="button"
                tabIndex="0"
                aria-label="select package button"
                title="select package"
                onKeyDown={(e) => {
                  const key = e.key === 13 || e.keyCode === 13;
                  key && handleClick(packageItem.id);
                }}
              >
                <Dot
                  variants={dotAnimation}
                  animate={
                    selectedItem.id === packageItem.id ? "show" : "hidden"
                  }
                />
              </SelectedPackageButton>
            )}

            <AnimatePresence>
              {showAdminContent && selectedItem.id === packageItem.id && (
                <DeleteIconContainer
                  ref={(element) => deleteIconRef.current.push(element)}
                  aria-label="delete package button"
                  role="button"
                  tabIndex="0"
                  title="delete package"
                  variants={buttonAnimation}
                  onKeyDown={(e) => {
                    const key = e.key === 13 || e.keyCode === 13;
                    key && toggleDeletePopUp();
                  }}
                  disabled={
                    status !== "pending" && packages.length > 1 ? false : true
                  }
                  onClick={toggleDeletePopUp}
                  animate={
                    selectedItem.id === packageItem.id ? "show" : "hidden"
                  }
                  exit="hidden"
                >
                  <ImageLoader
                    maxWidth="inherit"
                    placeholderSize="100%"
                    hover={true}
                    alt="delete"
                    src={
                      "https://chpistel.sirv.com/Connor-Portfolio/error.png?w=60"
                    }
                  />
                </DeleteIconContainer>
              )}
            </AnimatePresence>
          </Package>
        ))}
      </PackagesContainer>

      {showAdminContent && (
        <DeletePopUp
          popUpOpen={popUpOpen}
          togglePopUp={toggleDeletePopUp}
          closePopUp={closeDeletePopUp}
          handleDelete={handleDeletePricingPackage}
          showData={showPackagesContent}
          changeSeletedItemOnDelete={handleSelectedPackageOnDelete}
        />
      )}
    </AnimateSharedLayout>
  ) : (
    ""
  );
};

export default WeddingPricingPackages;

WeddingPricingPackages.propTypes = {
  packages: PropTypes.array,
  status: PropTypes.string,
  operation: PropTypes.string,
  handleClick: PropTypes.func,
  selectedData: PropTypes.string,
  showAdminContent: PropTypes.bool,
  selectedItem: PropTypes.object,
  showPackagesContent: PropTypes.func,
  handleSelectedPackageOnDelete: PropTypes.func,
  handleDeletePricingPackage: PropTypes.func,
};

const PackagesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 362px));
  justify-content: center;
  align-items: flex-start;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: calc(100vw * 0.03) 2%;
  width: 100%;
  margin-bottom: 14px;
  @media (max-width: 1493px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 362px));
  }
  @media (max-width: 786px) {
    grid-gap: 30px 3%;
  }
`;

const Package = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 360px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: ${({ operation }) => (operation === "Add" ? "none" : "auto")};
  background-color: white;
  border: 1px solid #efefef;
  border-radius: 9px;
  position: relative;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  &:first-child {
    margin-left: 0px;
  }
  &:hover {
  }
  @media (max-width: 852px) {
    margin: 0px;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }
`;

const InnerPackageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0px 20px;
  &:hover {
    cursor: default;
  }
`;

const Name = styled.h3`
  margin-top: 20px;
  font-size: 2rem;
  font-weight: 500;
  color: #e78b1b;
`;

const Price = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0px;
  color: #e78b1b;
`;

const Description = styled.p`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  margin-top: 7px;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  margin-bottom: 0px;
  width: 100%;
  letter-spacing: 0.2px;
  border-bottom: 1px solid #efefef;
`;

const PackageDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Item = styled.span`
  font-size: 1rem;
  text-align: center;
  padding: 25px 0px;
  border-bottom: 1px solid #efefef;
  width: 100%;
  letter-spacing: 0.2px;
`;

const Button = styled.button`
  width: 100%;
  padding: 25px 10px;
  color: white;
  font-family: inherit;
  letter-spacing: 1.5px;
  background-color: #ea8f1f;
  font-size: 1.2rem;
  border: none;
  letter-spacing: 0.2px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const SelectedPackageButton = styled(motion.div)`
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
  &:focus:not(:focus-visible) {
    outline: none;
  }
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
  top: -10px;
  right: -10px;
  max-width: 42px;
  width: 100%;
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
