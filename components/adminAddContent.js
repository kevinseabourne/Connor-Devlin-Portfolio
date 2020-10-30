import React, { useState } from "react";
import styled from "styled-components";
import lodash from "lodash";
import { addWedding } from "../pages/api/weddings";
import { addCorporate } from "../pages/api/corporate";
import AdminContentForm from "./common/adminContentForm";
import { bundlePartnersIntoObj } from "./common/utils/bundlePartnersIntoObj";

const AdminAddContent = (props) => {
  const [page, setPage] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleAddWeddingSubmit = async (data) => {
    const updatedData = bundlePartnersIntoObj(data);
    const response = await addWedding(updatedData);

    return response;
  };

  const handleAddCorporateSubmit = async (data) => {
    const dataClone = _.cloneDeep(data);
    const response = await addCorporate(dataClone);

    if (response) {
      setValue("jobDate", "");
      reset();
    }
  };

  const showWeddingForm = () => {
    setPage("weddings");
  };

  const showCorporateForm = () => {
    setPage("corporate");
  };

  return (
    <Container>
      <Title>Choose Which content you would like to add ?</Title>
      <ButtonsContainer>
        <WeddingsFormButton page={page} onClick={showWeddingForm}>
          Weddings
        </WeddingsFormButton>
        <CorporateFormButton page={page} onClick={showCorporateForm}>
          Corporate
        </CorporateFormButton>
      </ButtonsContainer>
      <AdminContentForm
        page={page}
        handleWeddingSubmit={handleAddWeddingSubmit}
        handleCorporateSubmit={handleAddCorporateSubmit}
        operation="Add"
      />
    </Container>
  );
};

export default AdminAddContent;

const Container = styled.div`
  width: calc(100% - 280px);
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 70px;
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
  }
`;

const Title = styled.h1`
  margin: 70px 0px;
  text-align: center;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  @media (max-width: 390px) {
    flex-direction: column;
  }
`;

const WeddingsFormButton = styled.button`
  font-size: 1rem;
  color: ${({ page }) => (page === "weddings" ? "black" : "white")};
  min-height: 54px;
  padding: 14px 30px;
  border-radius: 9px;
  margin-right: 5px;
  border: ${({ page }) =>
    page === "weddings" ? "3px solid black" : "3px solid white"};
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 390px) {
    margin-bottom: 15px;
  }
`;

const CorporateFormButton = styled.button`
  font-size: 1rem;
  color: ${({ page }) => (page === "corporate" ? "black" : "white")};
  min-height: 54px;
  padding: 14px 30px;
  margin-left: 5px;
  border: ${({ page }) =>
    page === "corporate" ? "3px solid black" : "3px solid white"};
  border-radius: 9px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
