import styled from "styled-components";
import { getAllWeddings } from "./api/weddings";
import ContentPage from "../components/common/contentPage";
import { toast } from "react-toastify";
import React, { useEffect } from "react";

const Weddings = ({ data }) => {
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
      <ContentPage data={data} page="weddings" />
    </Container>
  ) : (
    <Container></Container>
  );
};

export async function getStaticProps() {
  const data = await getAllWeddings();
  return {
    props: data ? { data } : { data: null },
  };
}

export default Weddings;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
