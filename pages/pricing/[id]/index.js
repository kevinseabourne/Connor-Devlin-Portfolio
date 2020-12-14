import styled from "styled-components";
import React, { useEffect } from "react";
import WeddingPricing from "../../../components/weddingPricing";
import CorporatePricing from "../../../components/corporatePricing";
import { getAllPricingPackages, getAddOns } from "../../api/pricing";

const Pricing = ({ params, data }) => {
  return params.id === "weddings" ? (
    <WeddingPricing data={data} />
  ) : (
    <CorporatePricing />
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "weddings" } }, { params: { id: "corporate" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  if (params.id === "weddings") {
    const packages = await getAllPricingPackages();
    const { addOns } = await getAddOns();
    const data = [packages, addOns];
    return {
      props: data ? { data, params } : { data: null, params },
    };
  }
  return {
    props: { params },
  };
}

export default Pricing;
