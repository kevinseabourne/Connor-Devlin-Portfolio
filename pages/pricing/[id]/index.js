import styled from "styled-components";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Pricing = (props) => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
    // if (id !== "weddings" || id !== "corporate") {
    //   router.push("/404");
    // }
  }, []);

  return <Container>{id}</Container>;
};

export default Pricing;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;
