import styled from "styled-components";
import { getContent } from "./api/content";
import ContentPage from "../components/common/contentPage";
import ErrorMessage from "../components/common/errorMessage";

const Weddings = ({ data }) => {
  return data ? (
    <Container>
      <ContentPage data={data} selectedData="weddings" />
    </Container>
  ) : (
    <ErrorMessage />
  );
};

export async function getStaticProps() {
  const data = await getContent("weddings");
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
