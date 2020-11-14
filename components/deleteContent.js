import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { deleteWedding } from ".././pages/api/weddings";
import { deleteCorporate } from ".././pages/api/corporate";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./loading-spinner";
import useSound from "use-sound";
import popSound from ".././public/sounds/pop_char.mp3";

const DeleteContent = ({
  page,
  selectedVideo,
  resetValues,
  handleDeleteWeddingSubmit,
  handleDeleteCorporateSubmit,
}) => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const timeout = useRef(null);
  const timeoutsecond = useRef(null);
  const popUpRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timeout.current);
      clearTimeout(timeoutsecond.current);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { register, handleSubmit, reset } = useForm({});
  const [play] = useSound(popSound, { volume: 0.2 });

  const schema = {
    deleteCheckbox: {
      required: "tick the box to delete the content",
    },
  };

  const handleDeleteContent = (data) => {
    setStatus("pending");
    // if (page === "weddings") {
    //   deleteWedding(selectedVideo);
    //   resetValues();
    // handleDeleteWeddingSubmit()

    // } else {
    //   deleteCorporate(selectedVideo);
    //   resetValues();
    // handleDeleteCorporateSubmit()
    // }

    // fix weird error with the value of deleteCheckbox

    timeout.current = setTimeout(() => {
      setStatus("resolved");
      timeoutsecond.current = setTimeout(() => {
        reset({ deleteCheckbox: false });
        setPopUpOpen(false);
        setStatus("idle");
      }, 1000);
    }, 1500);
  };

  const handleClickOutside = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setPopUpOpen(false);
    }
  };

  const overlayAnimation = {
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.9, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
  };

  const popUpAnimation = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <Container>
      <GlobalStyle popUpOpen={popUpOpen} />
      <AnimatePresence>
        {popUpOpen && (
          <Overlay
            variants={overlayAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            key={popUpOpen}
          >
            <DeleteContentPopUp ref={popUpRef} variants={popUpAnimation}>
              <Title>Are you sure you want to delete this content ?</Title>
              <Form onSubmit={handleSubmit(handleDeleteContent)}>
                <Checkbox
                  type="checkbox"
                  ref={register(schema.deleteCheckbox)}
                  name="deleteCheckbox"
                  onClick={play}
                />
                <DeleteButton type="submit">
                  {status === "pending" ? (
                    <LoadingSpinner size="28px" />
                  ) : status === "resolved" ? (
                    "Success"
                  ) : (
                    "Delete"
                  )}
                </DeleteButton>
              </Form>
            </DeleteContentPopUp>
          </Overlay>
        )}
      </AnimatePresence>
      <DeleteButton onClick={() => setPopUpOpen(true)}>Delete</DeleteButton>
    </Container>
  );
};

export default DeleteContent;

const GlobalStyle = createGlobalStyle`
 body {
   overflow: ${({ popUpOpen }) => (popUpOpen ? "hidden" : "scroll")};
  }
`;

const Container = styled.div``;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(15, 15, 15, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  transition: all 0.3s ease;
`;

const DeleteContentPopUp = styled(motion.div)`
  max-width: 550px;
  width: 100%;
  height: 300px;
  margin-left: 280px;
  z-index: 2;
  background-image: radial-gradient(
    circle at 10% 20%,
    rgb(50, 172, 109) 0%,
    rgb(209, 251, 155) 100.2%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  @media (max-width: 1250px) {
    margin-left: 200px;
  }
  @media (max-width: 1024px) {
    margin: 0px;
  }
`;

const Title = styled(motion.h3)`
  margin-bottom: 15px;
`;

const Form = styled(motion.form)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Checkbox = styled(motion.input)`
  margin-right: 20px;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled(motion.button)`
  font-size: 16px;
  min-height: 54px;
  min-width: 214.23px;
  max-width: 214.23px;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  color: white;
  position: relative;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  transition: all 0.2s ease 0s;
  background-image: radial-gradient(
    circle at 10% 20%,
    rgb(255, 197, 118) 0%,
    rgb(254, 106, 103) 47.7%,
    rgb(240, 23, 23) 92.3%
  );
  cursor: pointer;
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
