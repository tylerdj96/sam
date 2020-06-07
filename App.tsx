import "react-native-gesture-handler";
import React from "react";
import Home from "./web/modules/home";
import { CharacterList } from "./web/modules/characterList";
import { BlizzApiProvider } from "./web/context/useBlizzToken";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainCharRender } from "./web/modules/character/mainCharRender";
import { CharNavigator } from "./web/modules/character";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <BlizzApiProvider>
      <NavigationContainer>
        <Navigator initialRouteName="Character List">
          {/* <Screen name="Home" component={Home} /> */}
          <Screen name="Character List" component={CharacterList} />
          {/* <Screen name="Main" component={MainCharRender} /> */}
          <Screen
            // options={{ headerShown: false }}
            name="Character"
            component={CharNavigator}
          />
        </Navigator>
      </NavigationContainer>
    </BlizzApiProvider>
  );
}
