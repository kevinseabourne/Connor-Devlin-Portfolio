import styled from "styled-components";

const HomePageContact = (props) => {
  return (
    <Container>
      <ContactForm>
        <Title>Contact</Title>
      </ContactForm>
    </Container>
  );
};

export default HomePageContact;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactForm = styled.form`
  max-width: 900px;
  width: 100%;
  height: 700px;
  background-color: grey;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1``;
