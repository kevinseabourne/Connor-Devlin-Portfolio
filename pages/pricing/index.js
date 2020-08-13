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
          <WeddingsContainer>
            <ImageLoader
              maxWidth="700px"
              placeholderSize="66.7%"
              borderRadius="8px"
              hover={true}
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
            />
            <Label>Weddings</Label>
          </WeddingsContainer>
        </Link>
        <Link href="/pricing/[id]" as="pricing/corporate">
          <CorporateContainer>
            <ImageLoader
              maxWidth="700px"
              placeholderSize="66.7%"
              borderRadius="8px"
              hover={true}
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
            />
            <Label>Corporate</Label>
          </CorporateContainer>
        </Link>
      </InnerContainer>
      <BottomWave src={bottomWave} />
    </Container>
  );
};

export default Pricing;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 40px 0px;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

const WeddingsContainer = styled.div`
  max-width: 700px;
  width: 48%;
  position: relative;
  transition: all 0.25s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const CorporateContainer = styled.div`
  max-width: 700px;
  width: 48%;
  position: relative;
  transition: all 0.25s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

const Label = styled.label`
  font-size: 2rem;
  position: absolute;
  bottom: 20px;
  left: 40%;
  right: 50%;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -50px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
