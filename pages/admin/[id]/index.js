import styled from "styled-components";
import ErrorMessage from "../../../components/common/errorMessage";
import AdminAbout from "../../../components/adminAbout";
import AdminContentPage from "../../../components/common/adminContentPage";
import AdminAddPricing from "../../../components/adminAddPricing";
import AdminEditPricing from "../../../components/adminEditPricing";
import AdminAddContent from "../../../components/adminAddContent";
import AdminEditContent from "../../../components/adminEditContent";
import AdminDeleteContent from "../../../components/adminDeleteContent";
import { getAllWeddings } from "../../api/weddings";
import { getAllCorporate } from "../../api/corporate";
import { getAllPricingPackages } from "../../api/pricing";
import { getAboutMe } from "../../api/about";
import AdminSidebar from "../../../components/AdminSidebar";

const AdminRoute = ({ params, data }) => {
  switch (params.id) {
    case "about":
      return data ? (
        <Container>
          <AdminSidebar />
          <AdminAbout data={data} />
        </Container>
      ) : (
        <ErrorMessage />
      );
    case "weddings":
      return data ? (
        <Container>
          <AdminSidebar />
          <AdminContentPage data={data} page="weddings" />
        </Container>
      ) : (
        <ErrorMessage />
      );
    case "corporate":
      return data ? (
        <Container>
          <AdminSidebar />
          <AdminContentPage data={data} page="corporate" />
        </Container>
      ) : (
        <ErrorMessage />
      );
    case "add-pricing":
      return (
        <Container>
          <AdminSidebar />
          <AdminAddPricing data={data} />
        </Container>
      );
    case "edit-pricing":
      return (
        <Container>
          <AdminSidebar />
          <AdminEditPricing />
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
      { params: { id: "add-pricing" } },
      { params: { id: "edit-pricing" } },
      { params: { id: "add-content" } },
      { params: { id: "edit-content" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  if (params.id === "about") {
    const data = await getAboutMe();
    return {
      props: data ? { data, params } : { data: null, params },
    };
  }
  if (params.id === "weddings" || params.id === "corporate") {
    const data =
      params.id === "weddings"
        ? await getAllWeddings()
        : await getAllCorporate();

    return {
      props: data ? { data, params } : { data: null, params },
    };
  }
  if (params.id === "add-pricing") {
    const data = await getAllPricingPackages();
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
