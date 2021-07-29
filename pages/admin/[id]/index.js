import PropTypes from "prop-types";
import styled from "styled-components";
import AdminAbout from "../../../components/adminAbout";
import ContentPage from "../../../components/common/contentPage";
import AdminAddPricing from "../../../components/adminAddPricing";
import AdminEditPricing from "../../../components/adminEditPricing";
import AdminAddContent from "../../../components/adminAddContent";
import AdminEditContent from "../../../components/adminEditContent";
import { getContent } from "../../api/content";
import { getAllPricingPackages } from "../../api/pricing";
import { getAboutMe } from "../../api/about";
import AdminSidebar from "../../../components/AdminSidebar";

const AdminRoute = ({ params, data }) => {
  const url = params.id;
  return (
    <Container>
      <AdminSidebar />
      {url === "about" && <AdminAbout data={data} />}
      {url === "weddings" && (
        <ContentPage
          data={data}
          selectedData="weddings"
          showAdminContentData={true}
        />
      )}
      {url === "corporate" && (
        <ContentPage
          data={data}
          selectedData="corporate"
          showAdminContentData={true}
        />
      )}
      {url === "add-pricing" && <AdminAddPricing data={data} />}
      {url === "edit-pricing" && <AdminEditPricing />}
      {url === "add-content" && <AdminAddContent />}
      {url === "edit-content" && <AdminEditContent />}
    </Container>
  );
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
    const data = await getContent(params.id);

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

AdminRoute.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  data: PropTypes.any,
};

const Container = styled.div`
  height: 100%;
  min-height: calc(100vh - 75px);
`;
