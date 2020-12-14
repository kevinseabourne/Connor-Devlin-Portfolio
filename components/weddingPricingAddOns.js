import styled from "styled-components";
import { motion } from "framer-motion";

const WeddingPricingAddOns = ({ addOns }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: 15,
      y: 0,
      transition: {
        damping: 12,
      },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.8,
        damping: 12,
      },
    },
  };
  return (
    <AddOnsContainer
      layout
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Name>Add Ons</Name>
      <Description>If you need a little extra</Description>
      {addOns.map((addOn) => (
        <ListItem key={addOns.indexOf(addOn)}>
          <ListItemLabel>{addOn.title}</ListItemLabel>
          <AddOnPrice>{`$${addOn.price}`}</AddOnPrice>
        </ListItem>
      ))}
    </AddOnsContainer>
  );
};

export default WeddingPricingAddOns;

const AddOnsContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border: 1px solid #efefef;
  padding: 0px 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: 540px;
  margin: 30px;
  margin-right: 0px;
  border-radius: 9px;
  &:hover {
    cursor: default;
  }
  @media (max-width: 1241px) {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  @media (max-width: 852px) {
    max-width: 362px;
  }
`;

const Name = styled.h3`
  margin-top: 20px;
  font-size: 2rem;
  font-weight: 500;
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

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  font-size: 1rem;
  padding: 25px 0px;
  width: 100%;
  letter-spacing: 0.2px;
`;

const ListItemLabel = styled.label``;

const AddOnPrice = styled.span`
  padding-left: 20px;
`;
