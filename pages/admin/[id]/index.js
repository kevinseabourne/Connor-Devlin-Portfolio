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
        <React.Fragment>
          <AdminSidebar />
          <AdminAbout />
        </React.Fragment>
      );
    case "weddings":
      return (
        <React.Fragment>
          <AdminSidebar />
          <AdminContentPage data={data} page="weddings" />;
        </React.Fragment>
      );
    case "corporate":
      return (
        <React.Fragment>
          <AdminSidebar />
          <AdminContentPage data={data} page="corporate" />;
        </React.Fragment>
      );
    case "pricing":
      return (
        <React.Fragment>
          <AdminSidebar />
          <AdminPricing />;
        </React.Fragment>
      );
    case "add-content":
      return (
        <React.Fragment>
          <AdminSidebar />
          <AdminAddContent />;
        </React.Fragment>
      );
    case "edit-content":
      return (
        <React.Fragment>
          <AdminSidebar />
          <AdminEditContent />;
        </React.Fragment>
      );
    case "delete-content":
      return (
        <React.Fragment>
          <AdminSidebar />
          <AdminDeleteContent />;
        </React.Fragment>
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
      props: { data, params },
    };
  } else {
    return {
      props: { params },
    };
  }
}

export default AdminRoute;

const Container = styled.div``;
