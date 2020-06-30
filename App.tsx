import "react-native-gesture-handler";
import React, { useState } from "react";
import { CharacterList } from "./web/modules/characterList";
import { BlizzApiProvider } from "./web/context/useBlizzToken";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CharNavigator } from "./web/modules/character";
import { FontAwesome } from "@expo/vector-icons";
const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  return (
    <BlizzApiProvider>
      <NavigationContainer>
        <Navigator initialRouteName="Character List">
          <Screen
            name="Character List"
            options={{
              headerRight: () => (
                <FontAwesome
                  name="search"
                  size={24}
                  color="black"
                  style={{ paddingRight: 24 }}
                  onPress={() => setShowSearch(!showSearch)}
                />
              ),
            }}
          >
            {() => (
              <CharacterList
                showSearch={showSearch}
                setShowSearch={setShowSearch}
              />
            )}
          </Screen>
          <Screen name="Character" component={CharNavigator} />
        </Navigator>
      </NavigationContainer>
    </BlizzApiProvider>
  );
}
