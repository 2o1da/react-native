import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from "react-native";
import Constants from "expo-constants";

import Container from "./components/Container";
import Row from "./components/Row";

import moment from "moment";

import styled from "styled-components/native";
const Label = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export default function App() {
  const [now, setNow] = useState(moment());
  // Hook
  // 1. 처음 화면에 표시될 때
  // 2. 주시하는 대상에 변화가 일어났을 때
  useEffect(() => {
    setInterval(() => {
      setNow(moment());
    }, 1000);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Text>{now.format("ddd / MMM Do / YYYY")}</Text>
        </Row>
        <Row>
          <Label>{now.format("HH")}</Label>
          <Label>{parseInt(now.format("s"), 10) % 2 === 1 ? ":" : " "}</Label>
          <Label>{now.format("MM")}</Label>
          <Label>{parseInt(now.format("s"), 10) % 2 === 1 ? ":" : " "}</Label>
          <Label>{now.format("ss")}</Label>
        </Row>
        <Row>
          <Text>솔</Text>
          <Text>다</Text>
        </Row>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
