import React, { useState, useEffect } from "react";
import { View } from "react-native";

import Container from "../components/Container";
import Contents from "../components/Contents";

import styled from "styled-components";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Text = styled.Text`
  font-size: 20px;
  line-height: 28px;
`;
function Detail({ navigation, route }) {
  const [text, setText] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: route.params.date });

    AsyncStorage.getItem("list").then((data) => {
      const list = JSON.parse(data);
      const diary = list.find((element) => element.date === route.params.date);
      setText(diary.text);
    });
  }, []);

  return (
    <Container>
      <Contents>
        <Text>{route.params.text}</Text>
      </Contents>
    </Container>
  );
}

export default Detail;
