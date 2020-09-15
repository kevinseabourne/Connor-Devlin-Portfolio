import styled from "styled-components";
import { getAllWeddings } from "./api/weddings";
import ContentPage from "../components/common/contentPage";

const Weddings = ({ data }) => {
  return (
    <Container>
      <ContentPage data={data} page="weddings" />
    </Container>
  );
};

export async function getStaticProps() {
  const data = await getAllWeddings();
  return {
    props: { data },
  };
}

export default Weddings;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
