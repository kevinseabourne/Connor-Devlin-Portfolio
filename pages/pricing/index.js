import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "../../components/common/imageLoader";
import bottomWave from "../../public/images/wave4.svg";
import { motion } from "framer-motion";

const Pricing = () => {
  const staggerAnimation = {
    hidden: {
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.2,
      },
    },
  };

  const childAnimation = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.99,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const titleAnimation = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const labelAnimation = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const waveAnimation = {
    hidden: {
      opacity: 0,
      y: 22,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <Container variants={staggerAnimation} initial="hidden" animate="show">
      <Title variants={titleAnimation}>Pricing</Title>
      <InnerContainer>
        <Link href="/pricing/[id]" as="/pricing/weddings" passHref>
          <PricingContainer
            variants={childAnimation}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <ImageLoader
              maxWidth="inherit"
              width="100%"
              opacity={0}
              centerImage={true}
              placeholderSize="66.66%"
              borderRadius="19px"
              hover={true}
              alt="weddings"
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Connor-Portfolio/wedding-pricing.jpeg?w=900"
            />
            <Label variants={labelAnimation}>Weddings</Label>
          </PricingContainer>
        </Link>
        <Link href="/pricing/[id]" as="/pricing/corporate" passHref>
          <PricingContainer
            variants={childAnimation}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <ImageLoader
              maxWidth="inherit"
              opacity={0}
              width="100%"
              centerImage={true}
              placeholderSize="66.66%"
              borderRadius="19px"
              hover={true}
              alt="corporate"
              boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
              src="https://chpistel.sirv.com/Connor-Portfolio/corporate-pricing.jpeg?w=900"
            />
            <Label variants={labelAnimation}>Corporate</Label>
          </PricingContainer>
        </Link>
      </InnerContainer>
      <BottomWave src={bottomWave} variants={waveAnimation} />
    </Container>
  );
};

export default Pricing;

const Container = styled(motion.div)`
  height: calc(100vh - 75px);
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 1024px) {
    overflow: auto;
  }
`;

const Title = styled(motion.h1)`
  margin: 50px 0px;
  @media (max-width: 425px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const InnerContainer = styled(motion.div)`
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
  @media (max-width: 768px) {
    margin-bottom: 9%;
  }
  @media (max-width: 425px) {
    margin-bottom: 5%;
  }
`;

const PricingContainer = styled(motion.a)`
  width: 100%;
  max-width: 580px;
  text-align: center;
  position: relative;
  transform: scale(1);
  transition: transform 0.25s ease;
  &:focus:not(:focus-visible) {
    outline: none;
  }
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

const Label = styled(motion.span)`
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

const BottomWave = styled(motion.img)`
  object-position: center;
  object-fit: cover;
  bottom: 30px;
  margin-top: auto;
  width: 100%;
  z-index: -100;
`;
