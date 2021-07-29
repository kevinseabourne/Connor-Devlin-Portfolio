import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import topWave from "../public/images/top-wave.svg";
import downWave from "../public/images/wave3.svg";
import ContactForm from "./common/contactForm";
import WeddingPricingPackages from "./weddingPricingPackages";
import WeddingPricingAddOns from "./weddingPricingAddOns";

const WeddingPricing = ({ data }) => {
  const contactRef = useRef(null);
  const [questions] = useState([
    {
      question:
        "If I choose the standard package what parts of the wedding can be part of the coverage ?",
      answer:
        "we can cover any part of the wedding from pre ceremony to reception.",
    },
    {
      question: "What is the highlights video ?",
      answer:
        "All the best moments from your wedding day edited together beautifully in your very own personalised wedding movie.",
    },
    {
      question: "How long will the highlights video take for me to recieve ?",
      answer:
        "Depending on the length of the video it can take a couple of week to at most 2 - 3 months. Don't worry you will be given an estimated time of arrival.",
    },
    {
      question: "How do I book a package ?",
      answer:
        "Contact me in the form below, select the package you will like and I will be in touch with you.",
    },
    {
      question:
        "I need a last minute wedding videographer is there any point in getting in touch with you ? and do you charger extra for last minute bookings ?",
      answer:
        "I am usually booked in advance but feel free to contact me. Rest assured, There's absolutely no extra cost for last minute bookings.",
    },
    {
      question: "Do you travel to regional Australia or overseas ?",
      answer: "Absolutely! I can travel anywhere over Australia or overseas",
    },
  ]);

  const handleClick = () => {
    window.scrollTo({
      top: contactRef.current.offsetTop - 180,
      left: 0,
    });
  };

  const packages = data[0];
  const addOns = data[1];

  return (
    <Container>
      <Title>Wedding Pricing Packages</Title>
      <PackagesContainer>
        <WeddingPricingPackages handleClick={handleClick} packages={packages} />
        <WeddingPricingAddOns addOns={addOns} />
      </PackagesContainer>
      <BottomWave src={topWave} />
      <FAQContainer>
        <FAQTitle>FAQ</FAQTitle>
        <FAQInnerContainer>
          {questions.map((QandA, index) => (
            <FAQItem key={index}>
              <Question>{QandA.question}</Question>
              <Answer>{QandA.answer}</Answer>
            </FAQItem>
          ))}
        </FAQInnerContainer>
      </FAQContainer>
      <Wave src={downWave} />
      <ContactContainer ref={contactRef}>
        <ContactForm data={packages} />
      </ContactContainer>
    </Container>
  );
};

export default WeddingPricing;

WeddingPricing.propTypes = {
  data: PropTypes.any,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 60px 0px;
  text-align: center;
`;

const PackagesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0px;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 852px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const BottomWave = styled.img`
  bottom: -25px;
  left: 0px;
  margin-bottom: -14px;
  width: 100%;
  z-index: -100;
`;

const FAQContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-bottom: 60px;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const FAQTitle = styled.h1`
  font-size: 2.7rem;
  margin-top: 15px;
  margin-bottom: 30px;
  @media (max-width: 784px) {
    font-size: 2.2rem;
    margin-top: 45px;
  }
`;

const FAQInnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30px, 360px));
  justify-content: center;
  align-items: flex-start;
  grid-auto-flow: row;
  grid-column-end: auto;
  padding: 0 20px;
  grid-gap: 120px;
  @media (max-width: 1370px) {
    grid-template-columns: repeat(2, minmax(30px, 360px));
  }
  @media (max-width: 784px) {
    grid-template-columns: repeat(1, minmax(30px, 360px));
    grid-gap: 60px 120px;
  }
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
  color: #6c6c6c;
  max-width: 80%;
`;

const Wave = styled.img`
  margin-top: -3px;
  top: -20px;
  left: -1px;
  width: 100%;
  object-fit: cover;
`;

const ContactContainer = styled.div`
  width: 100%;
`;
