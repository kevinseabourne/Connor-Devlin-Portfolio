import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  getAllPricingPackages,
  getAddOns,
  updateAddOns,
  addPricingPackage,
  deletePricingPackage,
  updatePricingPackages,
} from "../../pages/api/pricing";
import isEqual from "lodash.isequal";
import { errorMessage } from "../common/utils/errorMessage";
import moment from "moment";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { bundleDualInputValuesIntoObj } from "./utils/bundleDualInputValuesIntoObj";
import { bundleSingleInputValuesIntoArray } from "./utils/bundleSingleInputValuesIntoArray";
import { isObjEmpty, isArrayEmpty } from "../common/utils/isEmpty";
import AdminPricingForm from "../adminPricingForm";
import popSound from "../../public/sounds/pop.mp3";
import useSound from "use-sound";
import { updatePricingPackage } from "../../pages/api/pricing";
import AdminButtonsSection from "../common/adminButtonSections";
import WeddingPricingPackages from "../weddingPricingPackages";
import WeddingPricingAddOns from "../weddingPricingAddOns";

const AdminPricing = ({ operation, data }) => {
  const [packages, setPackages] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [sameSelectedData, setSameSelectedData] = useState(false);
  const [buttons] = useState([
    { title: "Packages", dataTitle: "packages" },
    { title: "Add Ons", dataTitle: "addOns" },
  ]);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [status, setStatus] = useState("idle");
  const [packagesAnimationComplete, setPackagesAnimationComplete] = useState(
    true
  );
  const [addOnsAnimationComplete, setAddOnsAnimationComplete] = useState(true);

  const timeout = useRef(null);
  const timeoutThird = useRef(null);

  const [play] = useSound(popSound, { volume: 0.2 });

  useEffect(() => {
    if (operation === "Add" && data) {
      //packages will load automatically when on the add Pricing selectedData as you cannot add more add Ons Only edit addOns.
      // You can add & delete data inside addOns
      setPackages(data);
      setSelectedData("packages");
    }
    return () => {
      clearTimeout(timeout.current);
      clearTimeout(timeoutThird.current);
    };
  }, []);

  const handleClick = (id) => {
    const selected = packages.find((item) => item.id === id);
    if (isObjEmpty(selectedPackage) || selected.id !== selectedPackage.id) {
      play();
      setSelectedPackage(selected);
    }
  };

  const handleGetContent = (dataTitle) => {
    if (dataTitle === "packages") {
      showPackagesContent();
    } else {
      showAddOnsContent();
    }
  };

  const showPackagesContent = async () => {
    status !== "pending" && setStatus("pending");
    const response = await getAllPricingPackages();
    if (response) {
      if (selectedData === "packages") {
        updateselectedPackage(response);
      } else {
        setSelectedPackage(response[0]);
        setSelectedData("packages");
      }
      setPackages(response);
      setStatus("resolved");

      timeoutThird.current = setTimeout(() => {
        setStatus("idle");
      }, 1000);
      return true;
    } else {
      errorMessage();
    }
  };

  const showAddOnsContent = async () => {
    setStatus("pending");
    const { addOns } = await getAddOns();
    setAddOns(addOns);
    setSelectedData("addOns");
    setStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setStatus("idle");
    }, 1000);
  };

  const handleAddPackageSubmit = async (data) => {
    setStatus("pending");
    const updatedData = bundleSingleInputValuesIntoArray(
      data,
      "packageDetail",
      "packageDetails"
    );
    const response = await addPricingPackage(updatedData);

    if (response) {
      showPackagesContent();
      return true;
    } else {
      errorMessage();
    }
  };

  const handleEditPackageSubmit = async (data) => {
    operation === "Edit"
      ? setSameSelectedData(true)
      : setSameSelectedData(false);
    setStatus("pending");
    const updatedData = bundleSingleInputValuesIntoArray(
      data,
      "packageDetail",
      "packageDetails"
    );
    const id = selectedPackage.id;
    const response = await updatePricingPackage(updatedData, id);

    if (response) {
      showPackagesContent();
    } else {
      errorMessage();
    }

    // // get the latest data and update state with it.
  };

  const handleEditAddOnsSubmit = async (data) => {
    operation === "Edit"
      ? setSameSelectedData(true)
      : setSameSelectedData(false);
    setStatus("pending");
    const { addOns } = bundleDualInputValuesIntoObj(
      data,
      "title",
      "price",
      "title",
      "price",
      "addOns"
    );
    const response = await updateAddOns(addOns);
    const { addOns: addOnsData } = await getAddOns();

    if (response && addOnsData) {
      setAddOns(addOnsData);
      setStatus("resolved");
      timeoutThird.current = setTimeout(() => {
        setStatus("idle");
      }, 1000);
    } else {
      errorMessage();
    }
  };

  const handleDeletePricingPackage = async () => {
    const { id } = selectedPackage;
    const response = await deletePricingPackage(id);

    if (response) {
      return true;
    } else {
      errorMessage();
    }
  };

  const handleSelectedPackageOnDelete = () => {
    const selectedPackageIndex = packages.indexOf(selectedPackage);

    const newSelectedPackageIndex =
      selectedPackageIndex === 0
        ? selectedPackageIndex + 1
        : selectedPackageIndex - 1;
    const newSelectedPackage = packages[newSelectedPackageIndex];
    setSelectedPackage(newSelectedPackage);
  };

  const updateselectedPackage = (data) => {
    const updatedselectedPackage = data.find(
      (item) => item.id === selectedPackage.id
    );
    if (
      updatedselectedPackage &&
      !isEqual(selectedPackage, updatedselectedPackage)
    ) {
      setSelectedPackage(updatedselectedPackage);
    }
  };

  const handlePackagesAnimationComplete = () => {
    setPackagesAnimationComplete(true);
    setAddOnsAnimationComplete(false);
  };

  const handleAddOnsAnimationComplete = () => {
    setAddOnsAnimationComplete(true);
    setPackagesAnimationComplete(false);
  };

  const dataResolved =
    status !== "pending" && operation === "Edit" ? true : false;

  const defaultValues = dataResolved
    ? selectedData === "packages"
      ? {
          packageName: selectedPackage.packageName,
          price: selectedPackage.price,
          description: selectedPackage.description,
          packageDetails: selectedPackage.packageDetails,
        }
      : addOns
    : {};

  // Framer Motion Animation //

  const variants = {
    hidden: {
      display: "flex",
      justifyContent: "center",
      transition: {
        type: "spring",
      },
    },
    show: {
      display: "flex",
      justifyContent: "flex-start",
      transition: {
        type: "spring",
        delayChildren: 0.7,
        staggerChildren: 0.8,
      },
    },
  };

  const formRenderCondition = sameSelectedData
    ? sameSelectedData
    : (status !== "pending" && isArrayEmpty(packages)) ||
      (status !== "pending" && isArrayEmpty(addOns));

  return (
    <AnimateSharedLayout>
      <Container
        variants={variants}
        initial="hidden"
        animate={selectedData ? "show" : "hidden"}
        operation={operation}
      >
        {operation !== "Add" && (
          <AdminButtonsSection
            handleButtonChange={handleGetContent}
            buttons={buttons}
            selectedData={selectedData}
            operation={operation}
            status={status}
          />
        )}

        <AnimatePresence onExitComplete={handlePackagesAnimationComplete}>
          {selectedData === "packages" && addOnsAnimationComplete && (
            <WeddingPricingPackages
              selectedData={selectedData}
              packages={packages}
              status={status}
              showAdminContent={operation === "Edit" ? true : false}
              selectedItem={selectedPackage}
              handleClick={handleClick}
              operation={operation}
              showPackagesContent={showPackagesContent}
              handleSelectedPackageOnDelete={handleSelectedPackageOnDelete}
              handleDeletePricingPackage={handleDeletePricingPackage}
            />
          )}
        </AnimatePresence>
        <AnimatePresence onExitComplete={handleAddOnsAnimationComplete}>
          {selectedData === "addOns" &&
            operation === "Edit" &&
            packagesAnimationComplete && (
              <WeddingPricingAddOns addOns={addOns} />
            )}
        </AnimatePresence>
        {formRenderCondition && (
          <AdminPricingForm
            selectedData={selectedData}
            defaultValues={defaultValues}
            dataResolved={dataResolved}
            selectedPackage={selectedPackage}
            handleEditPackageSubmit={handleEditPackageSubmit}
            handleAddPackageSubmit={handleAddPackageSubmit}
            handleEditAddOnsSubmit={handleEditAddOnsSubmit}
            selectedPackage={selectedPackage}
            status={status}
            operation={operation}
          />
        )}
      </Container>
    </AnimateSharedLayout>
  );
};

export default AdminPricing;

AdminPricing.propTypes = {
  operation: PropTypes.string.isRequired,
  data: PropTypes.any,
};

const Container = styled(motion.div)`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  padding-top: ${({ operation }) => (operation === "Add" ? "120px" : "0px")};
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
