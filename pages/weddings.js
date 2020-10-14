import styled from "styled-components";
import { getAllWeddings } from "./api/weddings";
import ContentPage from "../components/common/contentPage";

const Weddings = ({ data }) => {
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
