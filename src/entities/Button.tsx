import styled from "styled-components";

export const Button = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: black;
  background-color: rgb(0, 128, 255);
  padding: 1.2rem 3rem;
  border-radius: 2rem;
  width: fit-content;
  letter-spacing: 0;
  cursor: pointer;
  box-shadow: 0px 0px 1px 5px rgba(0, 128, 255, 0.52);
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 5px 1px 5px rgb(0, 102, 255);
  }
`;
