import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from "react-native";
//import { Alert } from "react-native-bootstrap";

import Constants from "expo-constants";
import _ from "lodash";

import styled from "styled-components/native";

const p = 10;

const Row = styled.View`
  flex-direction: row;
  margin_bottom: ${p}px;
`;

const Ball = styled.View`
  width: 50px;
  height: 50px;
  background: ${(props) => {
    if (props.value < 11) {
      return "yellow";
    } else if (props.value < 21) {
      return "blue";
    } else if (props.value < 31) {
      return "red";
    } else if (props.value < 41) {
      return "gray";
    } else {
      return "green";
    }
  }};
  border-radius: 25px;

  justify-content: center;
  align-items: center;

  margin: 7px;
`;

let numbers = [];
_.times(45, (n) => numbers.push(n + 1));
numbers = _.shuffle(numbers);

export default function App() {
  // Hook
  const [num, setNum] = useState(_.shuffle(numbers));

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Kim</Text>
        <Text style={styles.text}>Da</Text>
        <Text style={styles.text}>Sol</Text>
        <StatusBar style="auto" />
      </SafeAreaView>

      <View style={styles.container}>
        <Row>
          <Ball value={num[0]}>
            <Text style={styles.number}>{num[0]}</Text>
          </Ball>
          <Ball value={num[1]}>
            <Text style={styles.number}>{num[1]}</Text>
          </Ball>
          <Ball value={num[2]}>
            <Text style={styles.number}>{num[2]}</Text>
          </Ball>
          <Ball value={num[3]}>
            <Text style={styles.number}>{num[3]}</Text>
          </Ball>
          <Ball value={num[4]}>
            <Text style={styles.number}>{num[4]}</Text>
          </Ball>
          <Ball value={num[5]}>
            <Text style={styles.number}>{num[5]}</Text>
          </Ball>
        </Row>
        <Button
          title="다시 뽑기"
          onPress={() => {
            setNum(_.shuffle(numbers));
          }}
          style={styles.button1}
        ></Button>
      </View>

      <View style={styles.container} />
      <View style={styles.container} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#000000",
    borderWidth: 1,

    height: "100%",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    //flexDirection: "row",

    //justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    // textAlign: "center",

    borderColor: "#000000",
    borderWidth: 1,
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  button1: {
    borderColor: "red",
    backgroundColor: "red",
  },
});
