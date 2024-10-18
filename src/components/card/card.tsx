import React from "react";
import { Container } from "./styles";

const Card = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Card;
