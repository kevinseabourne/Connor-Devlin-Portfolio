import styled from "styled-components";
import AdminAbout from "../../../components/adminAbout";
import AdminContentPage from "../../../components/common/adminContentPage";
import AdminPricing from "../../../components/adminPricing";
import AdminAddContent from "../../../components/adminAddContent";
import AdminEditContent from "../../../components/adminEditContent";
import AdminDeleteContent from "../../../components/adminDeleteContent";
import { getAllWeddings } from "../../api/weddings";
import { getAllCorporate } from "../../api/corporate";
import AdminSidebar from "../../../components/AdminSidebar";

const AdminRoute = ({ params, data }) => {
  switch (params.id) {
    case "about":
      return (
        <Container>
          <AdminSidebar />
          <AdminAbout />
        </Container>
      );
    case "weddings":
      return (
        <Container>
          <AdminSidebar />
          <AdminContentPage data={data} page="weddings" />
        </Container>
      );
    case "corporate":
      return (
        <Container>
          <AdminSidebar />
          <AdminContentPage data={data} page="corporate" />
        </Container>
      );
    case "pricing":
      return (
        <Container>
          <AdminSidebar />
          <AdminPricing />
        </Container>
      );
    case "add-content":
      return (
        <Container>
          <AdminSidebar />
          <AdminAddContent />
        </Container>
      );
    case "edit-content":
      return (
        <Container>
          <AdminSidebar />
          <AdminEditContent />
        </Container>
      );
    case "delete-content":
      return (
        <Container>
          <AdminSidebar />
          <AdminDeleteContent />
        </Container>
      );
    default:
      return <Container />;
  }
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "about" } },
      { params: { id: "weddings" } },
      { params: { id: "corporate" } },
      { params: { id: "pricing" } },
      { params: { id: "add-content" } },
      { params: { id: "edit-content" } },
      { params: { id: "delete-content" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  if (params.id === "weddings" || params.id === "corporate") {
    const data =
      params.id === "weddings"
        ? await getAllWeddings()
        : await getAllCorporate();

    return {
      props: data ? { data, params } : { data: null, params },
    };
  } else {
    return {
      props: { params },
    };
  }
}

export default AdminRoute;

const Container = styled.div`
  height: 100%;
  min-height: calc(100vh - 75px);
`;
