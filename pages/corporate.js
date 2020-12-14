import styled from "styled-components";
import ContentPage from "../components/common/contentPage";
import { getAllCorporate } from "./api/corporate";
import ErrorMessage from "../components/common/errorMessage";

const Corporate = ({ data }) => {
  return data ? (
    <Container>
      <ContentPage data={data} page="corporate" />
    </Container>
  ) : (
    <ErrorMessage />
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
