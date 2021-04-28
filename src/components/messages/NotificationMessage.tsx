import styled from "styled-components";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message: React.FC = () => (
  <StyledToaster>
    <ToastContainer
      position="bottom-center"
      transition={Slide}
      hideProgressBar
      autoClose={4000}
    />
  </StyledToaster>
);

const StyledToaster = styled.div`
  .Toastify__toast {
    border-radius: 2px;
    text-align: center;
  }
  .Toastify__toast--error {
    background-color: #d64933;
  }

  .Toastify__toast--success {
    background-color: #589d7c;
  }
`;

export default Message;
