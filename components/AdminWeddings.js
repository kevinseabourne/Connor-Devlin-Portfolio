import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/common/input";

const AdminWeddings = (props) => {
  const [partnersInputLength, setPartnersInputLength] = useState([1, 2]);
  const { register, handleSubmit, watch, control, errors } = useForm();

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

  return (
    <Container>
      <AddWeddingForm onSubmit={handleSubmit(onAddWeddingSubmit)}>
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

export default AdminWeddings;

const AddWeddingForm = styled.form``;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
