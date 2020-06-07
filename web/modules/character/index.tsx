import "react-native-gesture-handler";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CharacterOption } from "../characterList";
import { MainCharRender } from "./mainCharRender";
import { buildFallbackUri } from "../../api/clients/profile-client";
import { View, ActivityIndicator } from "react-native";
import { PvpInfo } from "./pvpInfo";

function isCharOpt(value: any): value is CharacterOption {
  return "char" in value && "render" in value && "fallback" in value;
}

export const CharNavigator = () => {
  const { Navigator, Screen } = createDrawerNavigator();
  const { params } = useRoute() as any;
  const opt = isCharOpt(params.opt)
    ? (params.opt as CharacterOption)
    : undefined;

  if (!opt) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <Navigator drawerPosition="right" initialRouteName="Main">
      <Screen name="Main">
        {() => (
          <MainCharRender
            uri={opt?.render?.render_url ?? buildFallbackUri(opt.char)}
          />
        )}
      </Screen>
      <Screen name="PvP">{() => <PvpInfo char={opt.char} />}</Screen>
    </Navigator>
  );
};
