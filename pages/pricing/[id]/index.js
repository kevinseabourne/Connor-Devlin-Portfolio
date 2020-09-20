import styled from "styled-components";
import React, { useEffect } from "react";
import WeddingPricing from "../../../components/weddingPricing";
import CorporatePricing from "../../../components/corporatePricing";

const Pricing = ({ params }) => {
  return params.id === "weddings" ? <WeddingPricing /> : <CorporatePricing />;
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "weddings" } }, { params: { id: "corporate" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: { params },
  };
}

export default Pricing;
