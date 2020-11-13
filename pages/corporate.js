import React, { useEffect } from "react";
import styled from "styled-components";
import ContentPage from "../components/common/contentPage";
import { getAllCorporate } from "./api/corporate";
import { toast } from "react-toastify";

const Corporate = ({ data }) => {
  useEffect(() => {
    !data &&
      toast.error("An error has occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  }, []);

  return data ? (
    <Container>
      <ContentPage data={data} page="corporate" />
    </Container>
  ) : (
    <Container />
  );
};

export async function getStaticProps() {
  const data = await getAllCorporate();
  return {
    props: data ? { data } : { data: null },
  };
}

export default Corporate;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
