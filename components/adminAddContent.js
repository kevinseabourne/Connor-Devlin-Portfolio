import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/common/input";
import { UploadButton } from "../components/common/uploadButton";

const AdminAddContent = (props) => {
  const [partnersInputLength, setPartnersInputLength] = useState([1, 2]);
  const { register, handleSubmit, watch, control, errors } = useForm();

  const watchUpload = watch("upload");
  const uploadState = watchUpload
    ? watchUpload.length >= 1
      ? watchUpload[0].name
      : ""
    : "";

  const schema = {
    name: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    email: {
      required: "An Email is required !",
      pattern: {
        value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        message: "A valid email is required !",
      },
    },
    enquiry: {
      required: "A message is required !",
      minLength: { value: 3, message: "message is too short !" },
    },
    date: {
      required: "A date is required !",
    },
    topic: {
      required: "select a topic !",
    },
  };

  const onAddWeddingSubmit = (data) => {
    console.log(data);
  };

  const increasePartners = () => {
    for (let i of partnersInputLength) {
    }
  };

  return (
    <Container>
      <Title>Add Content</Title>
      <AddWeddingForm onSubmit={handleSubmit(onAddWeddingSubmit)}>
        <UploadButton
          name="upload"
          ref={register(schema.upload)}
          error={errors.upload}
          uploadValue={uploadState}
        />
        {partnersInputLength.map(() => (
          <NameContainer>
            <Input
              name="firstName"
              label="First Name"
              ref={register(schema.name)}
              error={errors.firstName}
            />
            <Input
              name="LastName"
              label="Last Name"
              ref={register(schema.name)}
              error={errors.lastName}
            />
          </NameContainer>
        ))}
      </AddWeddingForm>
    </Container>
  );
};

export default AdminAddContent;

const Container = styled.div`
  width: calc(100% - 280px);
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AddWeddingForm = styled.form``;

const NameContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 70px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;
