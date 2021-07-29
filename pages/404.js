import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container>
      <Message>Page not Found</Message>
      <Link href="/">
        <ButtonContainer>
          <Image
            src="/images/left-arrow.svg"
            width={27}
            height={27}
            alt="left arrow icon"
          />
          <ButtonTitle>Return Home</ButtonTitle>
        </ButtonContainer>
      </Link>
    </Container>
  );
}

const Container = styled.main`
  min-height: calc(100vh - 75px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gradient1};
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
`;

const Message = styled.h1`
  margin-bottom: 5px;
`;

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: inherit;
  border: ${({ theme }) => `3px solid ${theme.colors.gradient1}; }`}
  border-radius: 15px;
  padding: 15px 15px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: white;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ButtonTitle = styled.span`
  color: ${({ theme }) => theme.colors.gradient1};
  font-size: 1.02rem;
  letter-spacing: 0px;
  margin-left: 18px;
  white-space: nowrap;
`;
