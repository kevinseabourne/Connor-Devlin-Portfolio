import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminAbout from "../../../components/adminAbout";
import AdminContentPage from "../../../components/common/adminContentPage";
import { getAllWeddings } from "../../api/weddings";
import { getAllCorporate } from "../../api/corporate";
// import WeddingPricing from "../../../components/weddingPricing";
// import CorporatePricing from "../../../components/corporatePricing";

const AdminRoute = ({ params, data }) => {
  //   const router = useRouter();
  //   const [routes] = useState(["about", "weddings", "corporate"]);
  //
  //   useEffect(() => {
  //     handleURLQuery();
  //   }, [params]);
  //
  //   const handleURLQuery = () => {
  //     if (params) {
  //       const routeMatch = routes.find((route) => route === params.id);
  //       if (!routeMatch) {
  //         router.push("/404");
  //       }
  //     }
  //   };
  //   const aboutRoute = params.id === "about";
  //   const weddingsRoute = params.id === "weddings";
  //   const corporateRoute = params.id === "corporate";
  //
  //   if (aboutRoute) {
  //     return <AdminAbout />;
  //   } else if (weddingsRoute || corporateRoute) {
  //     return (
  //       <AdminContentPage
  //         data={data}
  //         page={weddingsRoute ? "weddings" : "corporate"}
  //       />
  //     );
  //   } else {
  //     <Container />;
  //   }
  // };
  //
  // export async function getStaticPaths() {
  //   return {
  //     paths: [
  //       { params: { id: "about" } },
  //       { params: { id: "weddings" } },
  //       { params: { id: "corporate" } },
  //     ],
  //     fallback: true,
  //   };
  // }
  //
  // export async function getStaticProps({ params }) {
  //   const data =
  //     params.id === "weddings" ? await getAllWeddings() : await getAllCorporate();
  //   return {
  //     props: { data, params }, // will be passed to the page component as props
  //   };
};

export default AdminRoute;

const Container = styled.div``;
