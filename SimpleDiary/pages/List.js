import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";

import styled from "styled-components";

import AsyncStorage from "@react-native-async-storage/async-storage";

import _ from "lodash";

const ListItem = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 0px;
  border-bottom-color: #aaaaaa;
  border-bottom-width: 1px;
`;

const Label = styled.Text`
  font-size: 20px;
`;

function List({ navigation }) {
  const [list, setList] = useState([]);
  const [d] = useState("");
  const load = async () => {
    const data = await AsyncStorage.getItem("list");
    if (data !== null) {
      setList(JSON.parse(data));
    }
  };

  //   useEffect(() => {
  //     AsyncStorage.getItem("list").then((data) => {
  //       if (data !== null) {
  //         setList(JSON.parse(data));
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      //   AsyncStorage.getItem("list").then((data) => {
      //     if (data !== null) {
      //       setList(JSON.parse(data));
      //     }
      //   });
      load();
    });
    load();
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Text>리스트 페이지</Text>
      <Contents>
        {_.sortBy(list, "date").map((item) => {
          return (
            <ListItem key={item.date} onPress={() => navigation.navigate("Details", { date: item.date, text: item.text })}>
              <Label>{item.date}</Label>
            </ListItem>
          );
        })}
      </Contents>
      <Button
        onPress={() => {
          navigation.navigate("Forms");
        }}
      >
        새 일기 작성
      </Button>
    </Container>
  );
}

export default List;
