import styled from "styled-components";
import bottomWave from "../public/images/top-wave.svg";
import { useForm } from "react-hook-form";
import { DayPicker } from "../components/common/dayPicker";
import { Input } from "../components/common/input";
import { TextArea } from "../components/common/textArea";

const Contact = (props) => {
  const { register, handleSubmit, watch, control, errors } = useForm();

  const schema = {
    name: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g,
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
    message: {
      required: "A message is required !",
      minLength: { value: 3, message: "message is too short !" },
    },
    date: {
      required: "A date is required !",
    },
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Title>Contact</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Name"
          ref={register(schema.name)}
          error={errors.name}
        />
        <Input
          name="email"
          label="Email"
          ref={register(schema.email)}
          error={errors.email}
        />

        <DayPicker
          control={control}
          ref={register}
          label="Date"
          name="dayPicker"
          validation={schema.date}
          error={errors.dayPicker}
        />

        <TextArea
          name="message"
          label="Message"
          ref={register(schema.message)}
          error={errors.message}
        />
        <SubmitButton type="submit">Send</SubmitButton>
      </Form>
      <BottomWave src={bottomWave} />
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 0px 20px;
  @media (min-width: 1023px) and (max-height: 810px) {
    height: 100%;
  }
`;

const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  font-size: 1rem;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.2s ease;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
    outline: 0;
  }
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -90px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
