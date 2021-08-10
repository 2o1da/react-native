import React, { useState } from "react";
import { Text } from "react-native";

import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";ㅇ

import styled from "styled-components";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Label = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #666666;
  padding: 10px;
  font-size: 20px;
  margin-bottom: 10px;
`;

function Form({ navigation }) {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

  const store = async () => {
    if (date === "") return;
    if (text === "") return;

    let list = await AsyncStorage.getItem("list");
    if (list === null) {
      list = [];
    } else {
      list = JSON.parse(list);
    }

    list.push({ date, text });
    await AsyncStorage.setItem("list", JSON.stringify(list));
    navigation.goBack();
  };

  return (
    <Container>
      <Text>폼 페이지</Text>
      <Contents>
        <Label>날짜</Label>
        <Input placeholder={"YYYY-MM-DD"} value={date} onChangeText={(value) => setDate(value)} />
        <Label>내용</Label>
        <Input multiline={true} style={{ height: 300 }} value={text} onChangeText={(value) => setText(value)} />
      </Contents>
      <Button onPress={store}>저장</Button>
    </Container>
  );
}

export default Form;
