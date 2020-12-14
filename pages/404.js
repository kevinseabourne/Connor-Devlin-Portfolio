import styled from "styled-components";

export default function Custom404() {
  return (
    <Container>
      <Message>404 Page not Found</Message>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`;
