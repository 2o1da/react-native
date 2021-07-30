import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import List from "./pages/List";
import Detail from "./pages/Detail";
import Form from "./pages/Form";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Lists" component={List} options={{ title: "일기 목록" }} />
        <Stack.Screen name="Details" component={Detail} />
        <Stack.Screen name="Forms" component={Form} options={{ title: "일기 작성" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
