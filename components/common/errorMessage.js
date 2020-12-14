import { toast } from "react-toastify";
import styled from "styled-components";

const ErrorMessage = () => {
  return (
    <Container>
      {toast.error("An error has occurred", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })}
    </Container>
  );
};

export default ErrorMessage;

const Container = styled.main`
  width: 100%;
`;
