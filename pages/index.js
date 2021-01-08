import styled from "styled-components";
import DynamicHead from "../components/dynamicHead";
import Banner from "../components/banner";
import ExampleVideo from "../components/exampleVideo";
import Clients from "../components/clients";
import HomePageContact from "../components/homepage-contact";

export default function Home() {
  return (
    <Container>
      <DynamicHead title="Connor Devlin Media" urlQuery="/" />
      {/* <Banner />
      <ExampleVideo />
      <Clients />
      <HomePageContact /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
