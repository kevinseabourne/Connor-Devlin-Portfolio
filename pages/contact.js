import styled from "styled-components";
import ImageLoader from "../components/common/imageLoader";
import bottomWave from "../public/images/top-wave.svg";
import { useForm } from "react-hook-form";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contact = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();

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
  };

  const onSubmit = () => {};

  return (
    <Container>
      <Title>Contact</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>Name</Label>
          <NameInput
            name="name"
            ref={register(schema.name)}
            placeholder="Name"
          />
          <TransitionGroup component={null}>
            {errors.name && (
              <CSSTransition
                in={errors.name}
                classNames="errorAnimation"
                timeout={250}
                unmountOnExit
              >
                <ErrorContainer>
                  <ImageLoader
                    maxWidth="18px"
                    placeholderSize="100%"
                    borderRadius="8px"
                    boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
                    src="https://chpistel.sirv.com/Connor-Portfolio/error.png?w=24&png.optimize=true"
                  />
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                </ErrorContainer>
              </CSSTransition>
            )}
          </TransitionGroup>
        </InputContainer>
        <InputContainer>
          <Label>Email</Label>
          <EmailInput
            name="email"
            ref={register(schema.email)}
            placeholder="Email"
          />
          <TransitionGroup component={null}>
            {errors.email && (
              <CSSTransition
                in={errors.email}
                classNames="errorAnimation"
                timeout={250}
                unmountOnExit
              >
                <ErrorContainer>
                  <ImageLoader
                    maxWidth="18px"
                    placeholderSize="100%"
                    alt="cross"
                    src="https://chpistel.sirv.com/Connor-Portfolio/error.png?w=24&png.optimize=true"
                  />
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                </ErrorContainer>
              </CSSTransition>
            )}
          </TransitionGroup>
        </InputContainer>
        <InputContainer>
          <Label>Message</Label>
          <MessageInput
            name="message"
            ref={register(schema.message)}
            placeholder="Message"
          />
          <TransitionGroup component={null}>
            {errors.message && (
              <CSSTransition
                in={errors.name}
                classNames="errorAnimation"
                timeout={250}
                unmountOnExit
              >
                <ErrorContainer>
                  <ImageLoader
                    maxWidth="18px"
                    placeholderSize="100%"
                    borderRadius="8px"
                    boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
                    src="https://chpistel.sirv.com/Connor-Portfolio/error.png?w=24&png.optimize=true"
                  />
                  <ErrorMessage>{errors.message.message}</ErrorMessage>
                </ErrorContainer>
              </CSSTransition>
            )}
          </TransitionGroup>
        </InputContainer>
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 3px;
  margin-left: 9px;
`;

const ErrorContainer = styled.div`
  margin-top: 12px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  border: 1.2px solid red;
  border-radius: 9px;
  padding-top: 6px;
  padding-bottom: 6px;
  flex-direction: row;

  &.errorAnimation-enter {
    transform: scale(0.4);
    opacity: 0;
  }
  &.errorAnimation-enter-active {
    transform: scale(1);
    transition: all 0.25s ease-in-out;
    opacity: 1;
  }
  &.errorAnimation-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.errorAnimation-exit-active {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.25s ease-in-out;
  }
`;

const ErrorMessage = styled.label`
  margin-top: 3px;
  margin-left: 8px;
  font-size: 1rem;
  color: red;
`;

const NameInput = styled.input`
  padding: 14px 14px 14px 12px;
  font-size: 1rem;
  border-radius: 9px;
  outline: none;
  box-sizing: border-box;
  font-weight: 500;
  font-family: inherit;
  width: 100%;
  color: ${({ theme }) => theme.colors.fontColor};
  border: 1.2px solid ${({ theme }) => theme.colors.fontColor};
`;

const EmailInput = styled.input`
  padding: 14px 14px 14px 12px;
  font-size: 1rem;
  border-radius: 9px;
  outline: none;
  box-sizing: border-box;
  font-weight: 500;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.fontColor};
  border: 1.2px solid ${({ theme }) => theme.colors.fontColor};
  width: 100%;
  transition: all 0.3s ease-in-out;
`;

const MessageInput = styled.textarea`
  padding: 14px 14px 120px 12px;
  border: 1.2px solid ${({ theme }) => theme.colors.fontColor};
  transition: all 0.2s;
  border-radius: 9px;
  box-sizing: border-box;
  outline: none;
  cursor: text;
  font-family: inherit;
  letter-spacing: 0.6px;
  line-height: inherit;
  height: 100%;
  width: 100%;
  min-height: 42px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.fontColor};
  resize: none;
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
