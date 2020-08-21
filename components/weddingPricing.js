import styled from "styled-components";
import React, { useState, useEffect } from "react";

const WeddingPricing = (props) => {
  const [packages, setPackages] = useState([
    {
      packageName: "Standard",
      price: "$900",
      description:
        "Shorter way to capture your day. The best moments, with a cheaper price",
      packageItems: [
        "One Videographer",
        "Up to 4 hours of coverage",
        "Highlights Video (4mins)",
        "Recieve a USB drive with all video footage of the day",
        "Pre-wedding consultation with videographer",
      ],
    },
    {
      packageName: "Deluxe",
      price: "$1300",
      description: "The Complete Package. We capture everything on the day",
      packageItems: [
        "One Videographers",
        "Full day of coverage",
        "Highlights Video (10mins)",
        "Sneak Peak Highlight Video (2mins) (recieved 5 - 7 days after wedding)",
        "Recieve a USB drive with all video footage of the day",
        "Pre-wedding consultation with videographer",
      ],
    },
  ]);

  const [questions] = useState([
    {
      question:
        "If i choose the standard package what parts of the wedding can be part of the coverage ?",
      answer:
        "we can cover any part of the wedding from pre ceremony to reception",
    },
    {
      question:
        "If i choose the standard package what parts of the wedding can be part of the coverage ?",
      answer:
        "we can cover any part of the wedding from pre ceremony to reception",
    },
    {
      question:
        "If i choose the standard package what parts of the wedding can be part of the coverage ?",
      answer:
        "we can cover any part of the wedding from pre ceremony to reception",
    },
  ]);

  return (
    <Container>
      <Title>Wedding Pricing Packages</Title>
      <PackagesContainer>
        {packages.map((packageItem) => (
          <Package>
            <InnerPackageContainer>
              <Name>{packageItem.packageName}</Name>
              <Price>{packageItem.price}</Price>
              <Description>{packageItem.description}</Description>
              {packageItem.packageItems.map((item) => (
                <Item>{item}</Item>
              ))}
            </InnerPackageContainer>
            <Button>Contact</Button>
          </Package>
        ))}
        <AddOnsContainer>
          <Name>Add Ons</Name>
          <Description>If you need a little extra</Description>
          <ListItem>
            <ListItemLabel>Additional hour of footage</ListItemLabel>
            <AddOnPrice>$120</AddOnPrice>
          </ListItem>
          <ListItem>
            <ListItemLabel>Vows</ListItemLabel> <AddOnPrice>$150</AddOnPrice>
          </ListItem>
          <ListItem>
            <ListItemLabel>Full Speeches Video</ListItemLabel>
            <AddOnPrice>$250</AddOnPrice>
          </ListItem>
          <ListItem>
            <ListItemLabel>Full Ceremony Video</ListItemLabel>
            <AddOnPrice>$350</AddOnPrice>
          </ListItem>
          <ListItem>
            <ListItemLabel>Drone Footage</ListItemLabel>
            <AddOnPrice>$200</AddOnPrice>
          </ListItem>
          <ListItem>
            <ListItemLabel>Couple Engagement Session</ListItemLabel>
            <AddOnPrice>$150</AddOnPrice>
          </ListItem>
        </AddOnsContainer>
      </PackagesContainer>

      <FAQContainer>
        <FAQTitle>FAQ</FAQTitle>
        <FAQInnerContainer>
          {questions.map((QandA) => (
            <FAQItem>
              <Question>{QandA.question}</Question>
              <Answer>{QandA.answer}</Answer>
            </FAQItem>
          ))}
        </FAQInnerContainer>
      </FAQContainer>
    </Container>
  );
};

export default WeddingPricing;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 20px;
`;

const Title = styled.h1`
  margin: 60px 0px;
`;

const PackagesContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(30px, 360px));
  justify-content: center;
  align-items: flex-start;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 60px;
  grid-auto-flow: row;
  margin-bottom: 150px;
`;

const Package = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #efefef;
  border-radius: 9px;
`;

const InnerPackageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 20px;
  &:hover {
    cursor: default;
  }
`;

const Name = styled.h3`
  margin-top: 20px;
  font-size: 2rem;
  font-weight: 500;
  color: #e78b1b;
`;

const Price = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0px;
  color: #e78b1b;
`;

const Description = styled.p`
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  margin-top: 7px;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  margin-bottom: 0px;
  width: 100%;
  letter-spacing: 0.2px;
  border-bottom: 1px solid #efefef;
`;

const Item = styled.span`
  font-size: 1rem;
  text-align: center;
  padding: 25px 0px;
  border-bottom: 1px solid #efefef;
  width: 100%;
  letter-spacing: 0.2px;
`;

const Button = styled.button`
  width: 100%;
  padding: 25px 10px;
  color: white;
  font-family: inherit;
  letter-spacing: 1.5px;
  background-color: #ea8f1f;
  font-size: 1.2rem;
  border: none;
  letter-spacing: 0.2px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  &:hover {
    cursor: pointer;
  }
`;

const AddOnsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #efefef;
  padding: 0px 20px;
  width: 100%;
  max-width: 360px;
  border-radius: 9px;
  &:hover {
    cursor: default;
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  font-size: 1rem;
  padding: 25px 0px;
  letter-spacing: 0.2px;
`;

const ListItemLabel = styled.label``;

const AddOnPrice = styled.span``;

const FAQContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 120px;
`;

const FAQTitle = styled.h1`
  font-size: 2.3rem;
  margin-bottom: 60px;
`;

const FAQInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30px, 360px));
  justify-content: center;
  align-items: center;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 60px;
`;

const FAQItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  letter-spacing: 0.1px;
`;

const Question = styled.p`
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
`;

const Answer = styled.p`
  font-weight: 200;
  margin: 0px;
  text-align: center;
  color: #5b6b7f;
`;
