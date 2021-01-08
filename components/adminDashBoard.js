import styled from "styled-components";
import Image from "next/image";

const AdminDashBoard = () => {
  return (
    <Container>
      <Title>Site Analytics</Title>
      <Description>
        Click the link below to view all analytics on your website. page view,
        top viewed pages, etc...
      </Description>
      <AnalyticsLink
        href={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ENDPOINT}
        target="_blank"
      >
        <AnalyticsButtonContainer>
          <Image
            src="https://chpistel.sirv.com/Connor-Portfolio/google-analytics.png?w=27"
            width={27}
            height={27}
            alt="google analytics"
          />
          <ButtonTitle>Google Analytics</ButtonTitle>
        </AnalyticsButtonContainer>
      </AnalyticsLink>
    </Container>
  );
};

export default AdminDashBoard;

const Container = styled.div`
  width: calc(100% - 280px);
  min-height: calc(100vh - 75px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  margin-left: auto;
  flex-direction: column;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Title = styled.h1``;

const Description = styled.p`
  margin-top: 12px;
`;

const AnalyticsLink = styled.a``;

const AnalyticsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: ${({ theme }) => `3px solid ${theme.colors.gradient1}; }`}
  border-radius: 15px;
  padding: 15px 15px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: white;
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
