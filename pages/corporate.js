import styled from "styled-components";
import ContentPage from "../components/common/contentPage";
import { getContent } from "./api/content";

const Corporate = ({ data }) => {
  return (
    <Container>
      <ContentPage data={data} selectedData="corporate" />
    </Container>
  );
};

export async function getStaticProps() {
  const data = await getContent("corporate");
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
