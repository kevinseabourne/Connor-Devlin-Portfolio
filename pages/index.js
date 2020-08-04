import React from "react";
import styled from "styled-components";
import Banner from "../components/banner";
import ExampleVideo from "../components/exampleVideo";
import Clients from "../components/clients";
import HomePageContact from "../components/homepage-contact";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <Container>
      <Banner />
      <ExampleVideo />
      <Clients />
      <HomePageContact />
    </Container>
  );
}

const Container = styled.div``;
