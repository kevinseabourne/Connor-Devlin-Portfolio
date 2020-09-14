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
              hover={true}
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
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
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
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
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0px 9%;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const PricingContainer = styled.div`
  max-width: 800px;
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
    max-width: 500px;
    &:first-child {
      margin-bottom: 30px;
      margin-right: 0px;
    }
    &:last-child {
      margin-top: 30px;
      margin-left: 0px;
    }
  }
`;

const Label = styled.div`
  font-size: 2rem;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%);
`;

const BottomWave = styled.img`
  margin-top: auto;
  object-position: center;
  object-fit: cover;
  bottom: 0px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
