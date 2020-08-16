import styled from "styled-components";
import ImageLoader from "../components/common/imageLoader";

const Corporate = (props) => {
  return (
    <Container>
      <Title>Corporate Videos</Title>
      <Description></Description>
      <InnerContainer>
        <Item>
          <ImageContainer>
            <ImageLoader
              maxWidth="430px"
              placeholderSize="66.7%"
              hover={true}
              src="https://chpistel.sirv.com/Connor-Portfolio/wedding_photo.png?png.optimize=true"
            />
          </ImageContainer>
          <CompanyTitle>TLG</CompanyTitle>
        </Item>
      </InnerContainer>
    </Container>
  );
};

export default Corporate;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1``;

const Description = styled.p``;

const InnerContainer = styled.div`
  display: grid;
  width: 100%;
`;

const Item = styled.div``;

const ImageContainer = styled.div``;

const CompanyTitle = styled.label``;
