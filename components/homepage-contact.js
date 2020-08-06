import styled from "styled-components";
import Link from "next/link";

const HomePageContact = (props) => {
  return (
    <Container>
      <Link href="/contact">
        <ContactButton>CONTACT</ContactButton>
      </Link>
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
  z-index: 1;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 15px 26px;
  color: ${({ theme }) => theme.colors.fontColor};
  border-radius: 8px;
  border: none;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1``;
