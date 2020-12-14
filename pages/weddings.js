import { getAllWeddings } from "./api/weddings";
import ContentPage from "../components/common/contentPage";
import ErrorMessage from "../components/common/errorMessage";

const Weddings = ({ data }) => {
  return data ? (
    <Container>
      <ContentPage data={data} page="weddings" />
    </Container>
  ) : (
    <ErrorMessage />
  );
};

export async function getStaticProps() {
  const data = await getAllWeddings();
  return {
    props: data ? { data } : { data: null },
  };
}

export default Weddings;
