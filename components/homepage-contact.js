import styled from "styled-components";
import Link from "next/link";

const HomePageContact = (props) => {
  return (
    <Container>
      <Link href="/contact">
        <ContactButton>CONTACT</ContactButton>
      </Link>
      <CopyRight>Copyright © 2020 Connor Devlin</CopyRight>
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
  flex-direction: column;
`;

const ContactButton = styled.button`
  margin: 135px;
  font-size: 1.1rem;
  display: flex;
  z-index: 1;
  font-weight: 700;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 15px 26px;
  margin-top: 100px;
  margin-bottom: 100px;
  color: ${({ theme }) => theme.colors.fontColor};
  border-radius: 8px;
  border: none;
  justify-content: center;
  opacity: 0.9;
  &:hover {
    cursor: pointer;
    opacity: 1;
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.fontColor};
  }
`;

const CopyRight = styled.span`
  font-size: 1rem;
  margin: auto;
  margin-bottom: 50px;
`;

const Title = styled.h1``;
