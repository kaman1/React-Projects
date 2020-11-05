/** @format */

import React from "react";
import styled from "styled-components";
import { News } from "./components/News.js";
import { Todo } from "./components/Todo.js";
import Weather from "./components/Weather.js";

export function App() {
  return (
    <>
      <Wrapper>
        <h1>Greeting, Christian</h1>
        <Weather />
        <NewsWrapper>
          <div>
            <Title>Latest headlines</Title>
            <News />
          </div>
         
        </NewsWrapper>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: 32px;
  color: #333;
`;

const NewsWrapper = styled.section`
  display: flex;

  @media (max-width: 600px) {
    display: block;
  }
`;

const Title = styled.h3`
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 24px;
`;
