// import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { DisplayHolidays } from "./DisplayHolidays";
function App() {
  return (
    <>
      <Heading>National holidays for your country</Heading>
      <DisplayHolidays></DisplayHolidays>
    </>
  );
}

const Heading = styled.h1`
  padding: 0.8rem;
  text-align: center;
  color: #ff2056;
  background: #0c0a09;
  width: 100%;
`;

export default App;
