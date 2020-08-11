import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "../../components/common/imageLoader";

const Pricing = (props) => {
  return (
    <Container>
      <Link href="/pricing/[id]" as="/pricing/weddings">
        <WeddingsContainer>
          <ImageLoader
            maxWidth="700px"
            placeholderSize="66.7%"
            borderRadius="8px"
            boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
            src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
          />
          <Title>Weddings</Title>
        </WeddingsContainer>
      </Link>
      <Link href="/pricing/[id]" as="pricing/corporate">
        <CorporateContainer>
          <ImageLoader
            maxWidth="700px"
            placeholderSize="66.7%"
            borderRadius="8px"
            boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
            src="https://chpistel.sirv.com/Images/kal-visuals-lYn248p4rUg-unsplash.jpg?"
          />
          <Title>Corporate</Title>
        </CorporateContainer>
      </Link>
    </Container>
  );
};

export default Pricing;

const Container = styled.div`
  width: 100%;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

const WeddingsContainer = styled.div`
  max-width: 700px;
  width: 100%;
  position: relative;
`;

const CorporateContainer = styled.div`
  max-width: 700px;
  width: 100%;
  position: relative;
`;

const Title = styled.label`
  font-size: 2rem;
  position: absolute;
  bottom: 20px;
  left: 40%;
  right: 50%;
`;
