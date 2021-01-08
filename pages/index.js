import styled from "styled-components";
import { AnimateSharedLayout } from "framer-motion";
import DynamicHead from "../components/dynamicHead";
import Banner from "../components/banner";
import ExampleVideo from "../components/exampleVideo";
import Clients from "../components/clients";
import HomePageContact from "../components/homepage-contact";

export default function Home() {
  return (
    <AnimateSharedLayout>
      <Container>
        <DynamicHead title="Connor Devlin Media" urlQuery="/" />
        <Banner />
        <ExampleVideo />
        <Clients />
        <HomePageContact />
      </Container>
    </AnimateSharedLayout>
  );
}

const Container = styled.div`
  width: 100%;
`;
