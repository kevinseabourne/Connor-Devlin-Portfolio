import styled from "styled-components";

const HomePageContact = (props) => {
  return (
    <Container>
      <ContactButton>CONTACT</ContactButton>
    </Container>
  );
};

export default HomePageContact;

const Container = styled.div`
  width: 100%;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactButton = styled.button`
  margin: 90px;
  font-size: 1.1rem;
  display: flex;
  background-color: #cbc3ba;
  padding: 12px 20px;
  color: rgb(30, 30, 30, 0.7);
  border-radius: 8px;
  border: none;
  justify-content: center;
`;

const Title = styled.h1``;
