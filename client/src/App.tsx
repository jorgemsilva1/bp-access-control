import styled from "styled-components";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Form } from "./components";

function App() {
  return (
    <>
      <Container>
        <Form />
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

const Container = styled.section`
  width: 100%;
  padding: 12px 16px;
`;

export default App;
