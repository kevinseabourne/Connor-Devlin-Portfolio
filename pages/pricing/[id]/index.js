import styled from "styled-components";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import WeddingPricing from "../../../components/weddingPricing";
import CorporatePricing from "../../../components/corporatePricing";

const Pricing = ({ query }) => {
  const router = useRouter();
  const routerr = router.query;

  useEffect(() => {
    handleURLQuery();
  }, [query]);

  const handleURLQuery = () => {
    if (query) {
      if (query.id === "weddings" || query.id === "corporate") {
      } else {
        router.push("/404");
      }
    }
  };

  return query.id === "weddings" ? <WeddingPricing /> : <CorporatePricing />;
};

Pricing.getInitialProps = ({ query }) => {
  return { query };
};

export default Pricing;

const Container = styled.div`
  width: 100%;
`;
