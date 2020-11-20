import React, { useState } from "react";
import styled from "styled-components";
import lodash from "lodash";
import { addWedding } from "../pages/api/weddings";
import { addCorporate } from "../pages/api/corporate";
import AdminContentForm from "./common/adminContentForm";
import { bundlePartnersIntoObj } from "./common/utils/bundlePartnersIntoObj";
import AdminButtonsSection from "./common/adminButtonSections";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const AdminAddContent = (props) => {
  const [page, setPage] = useState(null);
  const [weddingsStatus, setWeddingsStatus] = useState("idle");
  const [corporateStatus, setCorporateStatus] = useState("idle");

  const handleAddWeddingSubmit = async (data) => {
    setWeddingsStatus("pending");
    const updatedData = bundlePartnersIntoObj(data);
    const response = await addWedding(updatedData);
    setWeddingsStatus("resolved");
    return response;
  };

  const handleAddCorporateSubmit = async (data) => {
    setCorporateStatus("pending");
    const dataClone = _.cloneDeep(data);
    const response = await addCorporate(dataClone);
    // if vimeo id is not valid it will fail, need an error message for that

    if (response) {
      setValue("jobDate", "");
      reset();
      setCorporateStatus("resolved");
    }
  };

  const showWeddingForm = () => {
    setPage("weddings");
  };

  const showCorporateForm = () => {
    setPage("corporate");
  };

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
        delayChildren: 0.1,
        staggerChildren: 0.7,
      },
    },
  };

  return (
    <AnimateSharedLayout>
      <Container
        variants={variants}
        initial="hidden"
        animate={page ? "show" : "hidden"}
        layout
      >
        <AdminButtonsSection
          handleWeddingPageChange={showWeddingForm}
          handleCorporatePageChange={showCorporateForm}
          weddingsStatus={weddingsStatus}
          corporateStatus={corporateStatus}
          page={page}
          operation="Add"
        />
        {page && (
          <AdminContentForm
            page={page}
            handleWeddingSubmit={handleAddWeddingSubmit}
            handleCorporateSubmit={handleAddCorporateSubmit}
            operation="Add"
          />
        )}
      </Container>
    </AnimateSharedLayout>
  );
};

export default AdminAddContent;

const Container = styled(motion.div)`
  min-height: calc(100vh - 75px);
  width: calc(100% - 280px);
  margin-left: auto;
  display: flex;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
    box-sizing: border-box;
  }
`;
