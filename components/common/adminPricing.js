import styled, { createGlobalStyle } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import Videos from "./videos";
import {
  getAllPricingPackages,
  getAddOns,
  updateAddOns,
  addPricingPackage,
  deletePricingPackage,
  updatePricingPackages,
} from "../../pages/api/pricing";
import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { handleWeddingNames } from "./utils/handleWeddingName";
import { bundleDualInputValuesIntoObj } from "./utils/bundleDualInputValuesIntoObj";
import { bundleSingleInputValueIntoObj } from "./utils/bundleSingleInputValueIntoObj";
import AdminPricingForm from "../adminPricingForm";
import downWave from "../../public/images/wave3.svg";
import popSound from "../../public/sounds/pop.mp3";
import useSound from "use-sound";
import { updatePricingPackage } from "../../pages/api/pricing";
import { DeletePopupOverlay } from "../deletePopupOverlay";
import AdminButtonsSection from "../common/adminButtonSections";
import WeddingPricingPackages from "../weddingPricingPackages";
import WeddingPricingAddOns from "../weddingPricingAddOns";

const AdminPricing = ({ operation }) => {
  const [packages, setPackages] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [packagesStatus, setPackagesStatus] = useState("idle");
  const [addOnsStatus, setAddOnsStatus] = useState("idle");
  const [page, setPage] = useState(null);

  const timeout = useRef(null);
  const timeoutThird = useRef(null);

  const [play] = useSound(popSound, { volume: 0.2 });

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
      clearTimeout(timeoutThird.current);
    };
  }, []);

  // console.log(deleteIconRef);

  const handleClick = (id) => {
    const packagesClone = _.cloneDeep(packages);

    const selected = packagesClone.find((item) => item.id === id);
    if (_.isEmpty(selectedPackage) || selected.id !== selectedPackage.id) {
      play();
      setSelectedPackage(selected);
    }
  };

  const handlePackagesPageChange = () => {
    showPackagesContent();
  };

  const handleAddOnsPageChange = () => {
    showAddOnsContent();
  };

  const showPackagesContent = async () => {
    setPackagesStatus("pending");
    const response = await getAllPricingPackages();
    setPackages(response);
    setSelectedPackage(response[0]);
    setPage("packages");
    setPackagesStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setPackagesStatus("idle");
    }, 1000);
  };

  const showAddOnsContent = async () => {
    setAddOnsStatus("pending");
    const { addOns } = await getAddOns();
    setAddOns(addOns);
    setPage("addOns");
    setAddOnsStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setAddOnsStatus("idle");
    }, 1000);
  };

  const handleAddPackageSubmit = async (data) => {
    setPackagesStatus("pending");
    const updatedData = bundleSingleInputValueIntoObj(data, "packageDetail");
    await addPricingPackage(updatedData);

    // // get the latest data and update state with it.
    const response = await getAllPricingPackages();
    setPackages(response);
    updateselectedPackage(response);
    setPackagesStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setPackagesStatus("idle");
    }, 1000);
  };

  const handleEditPackageSubmit = async (data) => {
    setPackagesStatus("pending");
    const updatedData = bundleSingleInputValueIntoObj(data, "packageDetail");
    const id = selectedPackage.id;
    await updatePricingPackage(updatedData, id);

    // // get the latest data and update state with it.
    const response = await getAllPricingPackages();
    setPackages(response);
    updateselectedPackage(response);
    setPackagesStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setPackagesStatus("idle");
    }, 1000);
  };

  const handleEditAddOnsSubmit = async (data) => {
    setAddOnsStatus("pending");
    const { addOns } = bundleDualInputValuesIntoObj(
      data,
      "title",
      "price",
      "addOns"
    );
    await updateAddOns(addOns);

    // get the latest data and update state with it.
    const { addOns: addOnsData } = await getAddOns();
    setAddOns(addOnsData);
    setAddOnsStatus("resolved");
    timeoutThird.current = setTimeout(() => {
      setAddOnsStatus("idle");
    }, 1000);
  };

  const handleDeletePricingPackage = async () => {
    const { id } = selectedPackage;
    await deletePricingPackage(id);
    const response = await getAllPricingPackages();
    setPackages(response);
    updateselectedPackage(response);
    // if (state.length === state.indexOf(selectedPackage)) {
    //   setSelectedPackage(updatedPackages[updatedPackages.length]);
    // } else {
    //   setSelectedPackage(state.indexOf(selectedPackage) + 1);
    // }
  };

  const updateselectedPackage = (data) => {
    const dataClone = _.cloneDeep(data);
    const updatedselectedPackage = dataClone.find(
      (item) => item.id === selectedPackage.id
    );
    if (
      updatedselectedPackage &&
      !_.isEqual(selectedPackage, updatedselectedPackage)
    ) {
      setSelectedPackage(updatedselectedPackage);
    }
  };

  const dataResolved =
    packagesStatus !== "pending" &&
    addOnsStatus !== "pending" &&
    operation === "Edit"
      ? true
      : false;

  const addOnsDataResolved = addOnsStatus !== "pending" && page === "addOns";

  const packageDataResolved =
    packagesStatus !== "pending" && page === "packages";

  const defaultValues = dataResolved
    ? page === "packages"
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

  return (
    <AnimateSharedLayout>
      <Container
        variants={variants}
        initial="hidden"
        animate={page ? "show" : "hidden"}
      >
        <AdminButtonsSection
          handleContentOnePageChange={handlePackagesPageChange}
          handleContentTwoPageChange={handleAddOnsPageChange}
          contentOneStatus={packagesStatus}
          contentTwoStatus={addOnsStatus}
          buttonOneTitle={"Packages"}
          buttonTwoTitle={"Add Ons"}
          page={page}
          operation={operation}
        />
        <AnimatePresence>
          {packageDataResolved && (
            <WeddingPricingPackages
              page={page}
              packages={packages}
              showAdminContent={operation === "Edit"}
              selectedItem={selectedPackage}
              handleClick={handleClick}
              handleDeletePricingPackage={handleDeletePricingPackage}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {addOnsDataResolved && <WeddingPricingAddOns addOns={addOns} />}
        </AnimatePresence>
        {page !== null && (
          <AdminPricingForm
            page={page}
            defaultValues={defaultValues}
            dataResolved={dataResolved}
            selectedPackage={selectedPackage}
            handleEditPackageSubmit={handleEditPackageSubmit}
            handleAddPackageSubmit={handleAddPackageSubmit}
            handleEditAddOnsSubmit={handleEditAddOnsSubmit}
            selectedPackage={selectedPackage}
            packagesStatus={packagesStatus}
            addOnsStatus={addOnsStatus}
            operation={operation}
          />
        )}
      </Container>
    </AnimateSharedLayout>
  );
};

export default AdminPricing;

const Container = styled(motion.div)`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
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
