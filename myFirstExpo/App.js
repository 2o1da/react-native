import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import styled from "styled-components/native";

import Constants from "expo-constants";
import _ from "lodash";

import AsyncStorage from "@react-native-async-storage/async-storage";

import produce from "immer";

const obj = { a: 1, b: 2 };
const newObj = Object.assign({}, obj);
newObj.b = "b";

const newObj2 = produce(obj, (draft) => {
  draft.b = "b";
  draft.c = [1, 3, 5];
});

// AsyncStorage.getItem("test")
//   .then((data) => {
//     alert(data);
//   })
//   .catch((err) => alert(err.message));

// AsyncStorage.setItem("test", "test-value")
//   .then(() => {
//     alert("저장 완료");
//   })
//   .catch((err) => {
//     alert(err.message);
//   });

const Container = styled.SafeAreaView`
  flex: 1;
  border: 10px solid red;
`;

const BigText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const Contents = styled.ScrollView`
  flex: 1;
  border: 5px solid blue;

  padding: 10px;
`;

const InputContainer = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput`
  border: 1px solid lightgray;
  flex: 1;
`;
const Button = styled.Button``;

const ToDoItem = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ToDoItemText = styled.Text`
  font-size: 20px;
  flex: 1;
`;
const ToDoItemButton = styled.Button``;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  margin-top: ${Constants.statusBarHeight}px;
`;

const Check = styled.TouchableOpacity`
  margin-right: 5px;
`;

const CheckIcon = styled.Text`
  font-size: 20px;
`;

export default function App() {
  const [list, setList] = useState([
    {
      id: "1",
      todo: "할 일1",
    },
    {
      id: "2",
      todo: "할 일2",
    },
  ]);

  const [inputToDo, setInputToDo] = useState("");

  // Promise : 비동기 다루는 방식
  // async (function) + await
  useEffect(() => {
    const init = async () => {};
    init();
    {
      async () => {};
    }
    AsyncStorage.getItem("list")
      .then((data) => {
        if (data !== null) {
          setList(JSON.parse(data));
        }
      })
      .catch((err) => alert(err.message));
  }, []);

  // store 함수
  const store = (newList) => {
    setList(newList);
    AsyncStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <>
      <Container>
        <BigText>오늘 할 일</BigText>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <Contents>
            {list.map((item) => {
              return (
                <ToDoItem key={item.id}>
                  <Check
                    onPress={() => {
                      store(
                        produce(list, (draft) => {
                          const index = list.indexOf(item);
                          draft[index].done = !list[index].done;
                        })
                      );
                    }}
                  >
                    <CheckIcon>{item.done ? "✅" : "☑"}</CheckIcon>
                  </Check>
                  <ToDoItemText> {item.todo}</ToDoItemText>
                  <ToDoItemButton
                    title="삭제"
                    onPress={() => {
                      alert(`삭제되었습니다. ${item.id}`);
                      const rejectedList = _.reject(list, (element) => element.id === item.id);
                      store(rejectedList);
                    }}
                  ></ToDoItemButton>
                </ToDoItem>
              );
            })}
          </Contents>

          <InputContainer>
            <Input value={inputToDo} onChangeText={(value) => setInputToDo(value)} placeholder="할 일을 입력하세요." />
            <Button
              title="전송"
              onPress={() => {
                if (inputToDo === "") {
                  return;
                }

                const newItem = {
                  id: new Date().getTime().toString(),
                  todo: inputToDo,
                  done: false,
                };
                store([...list, newItem]);
                setInputToDo("");
              }}
            ></Button>
          </InputContainer>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
