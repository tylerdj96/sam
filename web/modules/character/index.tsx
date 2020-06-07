import "react-native-gesture-handler";
import React, { useContext, createContext } from "react";
import { useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CharacterOption } from "../characterList";
import { MainCharRender } from "./mainCharRender";
import { buildFallbackUri } from "../../api/clients/profile-client";
import { View, ActivityIndicator } from "react-native";
import { PvpInfo } from "./pvpInfo";
import {
  CharacterRender,
  Character,
} from "../../api/clients/interfaces/characters";
import { CharacterProvider } from "./characterProvider";

function isCharOpt(value: any): value is CharacterOption {
  return "char" in value && "render" in value && "fallback" in value;
}

export const CharNavigator = () => {
  const { Navigator, Screen } = createDrawerNavigator();

  const { params } = useRoute() as any;
  const option = isCharOpt(params.opt)
    ? (params.opt as CharacterOption)
    : undefined;

  if (!option) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <CharacterProvider
      option={{
        char: option.char,
        render: option.render,
        fallback: option.fallback,
      }}
    >
      <Navigator drawerPosition="right" initialRouteName="Main">
        <Screen name="Main" component={MainCharRender} />
        {/* {() => (
            <MainCharRender
              uri={option?.render?.render_url ?? buildFallbackUri(option.char)}
            />
          )}
        </Screen> */}
        {/* <Screen name="PvP">{() => <PvpInfo char={option.char} />}</Screen> */}
        <Screen name="PvP" component={PvpInfo} />
      </Navigator>
    </CharacterProvider>
  );
};
