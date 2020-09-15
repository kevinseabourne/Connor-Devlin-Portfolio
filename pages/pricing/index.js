import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "../../components/common/imageLoader";
import bottomWave from "../../public/images/wave4.svg";

const Pricing = (props) => {
  return (
    <Container>
      <Title>Pricing</Title>
      <InnerContainer>
        <Link href="/pricing/[id]" as="/pricing/weddings">
          <PricingContainer>
            <ImageLoader
              maxWidth="inherit"
              width="inherit"
              placeholderSize="66.66%"
              borderRadius="19px"
              blur="5px"
              opacity="0"
              scale="0.99"
              transitionTime="0.4s ease"
              delay={120}
              hover={true}
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Connor-Portfolio/wedding-pricing.jpeg?w=900"
            />
            <Label>Weddings</Label>
          </PricingContainer>
        </Link>
        <Link href="/pricing/[id]" as="pricing/corporate">
          <PricingContainer>
            <ImageLoader
              maxWidth="inherit"
              width="inherit"
              placeholderSize="66.66%"
              borderRadius="19px"
              blur="5px"
              opacity="0"
              scale="0.99"
              transitionTime="0.4s ease"
              hover={true}
              delay={240}
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Connor-Portfolio/corporate-pricing.jpeg?w=900"
            />
            <Label>Corporate</Label>
          </PricingContainer>
        </Link>
      </InnerContainer>
      <BottomWave src={bottomWave} />
    </Container>
  );
};

export default Pricing;

const Container = styled.div`
  height: calc(100vh - 75px);
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 50px 0px;
  @media (max-width: 425px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0px 9%;
  margin-bottom: 2%;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  @media (max-width: 768px) {
    margin-bottom: 9%;
  }
  @media (max-width: 425px) {
    margin-bottom: 5%;
  }
`;

const PricingContainer = styled.div`
  max-width: 850px;
  width: 100%;
  text-align: center;
  position: relative;
  transform: scale(1);
  transition: transform 0.25s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
  &:first-child {
    margin-right: 3%;
  }
  &:last-child {
    margin-left: 3%;
  }
  @media (max-width: 1024px) {
    max-width: 580px;
    &:first-child {
      margin-bottom: 7%;
      margin-right: 0px;
    }
    &:last-child {
      margin-top: 7%;
      margin-left: 0px;
    }
  }
  @media (max-width: 425px) {
    max-width: 580px;
    &:first-child {
      margin-bottom: 9%;
      margin-right: 0px;
    }
    &:last-child {
      margin-top: 9%;
      margin-left: 0px;
    }
  }
`;

const Label = styled.div`
  color: white;
  font-size: 2rem;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%);
  @media (max-width: 425px) {
    font-size: 1.3rem;
  }
`;

const BottomWave = styled.img`
  object-position: center;
  object-fit: cover;
  margin-top: auto;
  bottom: -20px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
