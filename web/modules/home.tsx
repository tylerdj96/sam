import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useBlizzContext } from "../context/useBlizzToken";
import { Input, Button } from "react-native-elements";
import { getRealms } from "../api/clients/static-client";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

interface RealmOption {
  label: string;
  value: string;
}

const compareRealms = (a: RealmOption, b: RealmOption) => {
  return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
};

export default function Home() {
  const { accessToken, loading } = useBlizzContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [realms, setRealms] = useState<RealmOption[]>();
  const navigation = useNavigation();

  useEffect(() => {
    const loadRealms = async () => {
      if (accessToken) {
        setIsLoading(true);
        const rawRealms = await getRealms(accessToken);
        if (rawRealms)
          setRealms(
            rawRealms.realms
              .map((realm) => {
                return { label: realm.name, value: realm.slug };
              })
              .sort(compareRealms)
          );
        setIsLoading(false);
      }
    };

    loadRealms();
  }, [accessToken]);

  if (loading || isLoading || !realms) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={realms}
      />
      <Input placeholder="Character name" />
      <Button
        title="Go"
        onPress={() => {
          navigation.navigate("Character List");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
