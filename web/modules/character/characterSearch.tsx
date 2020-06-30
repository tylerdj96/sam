import React, { useState, useMemo } from "react";
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CharacterOption } from "../characterList";
import { SearchBar, ListItem, Button, Overlay } from "react-native-elements";
import {
  getCharacter,
  getCharacterRender,
  buildFallbackUri,
  RenderTypes,
} from "../../api/clients/profile-client";
import { useBlizzContext } from "../../context/useBlizzToken";
import styled from "styled-components";
import { Realm } from "../../api/clients/interfaces/realms";
import { ScrollView } from "react-native-gesture-handler";

interface SearchBarProps {
  searchValue: string | undefined;
  setSearchValue: (val: string) => void;
  showSearch: boolean;
  setShowSearch: (val: boolean) => void;
  realms: Realm[] | undefined;
}

export const CharacterSearch = ({
  searchValue,
  setSearchValue,
  showSearch,
  setShowSearch,
  realms,
}: SearchBarProps) => {
  const navigator = useNavigation();
  const { accessToken } = useBlizzContext();
  const [currRealmName, setCurrRealmName] = useState<string>("");
  const [currSlug, setCurrSlug] = useState<string>();
  const [showList, setShowList] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const mappedRealms = useMemo(() => {
    if (realms)
      return realms
        .filter((realm) => realm.name.includes(currRealmName))
        .map((realm) => {
          return (
            <ListItem
              key={realm.slug}
              title={realm.name}
              onPress={() => {
                setCurrSlug(realm.slug);
                setCurrRealmName(realm.name);
                setShowList(false);
              }}
            />
          );
        });
  }, [realms, currRealmName]);

  const loadCharacter = async () => {
    if (accessToken && searchValue && currSlug) {
      try {
        const p1 = getCharacter(accessToken, currSlug, searchValue);
        const p2 = getCharacterRender(accessToken, currSlug, searchValue);
        const [char, render] = await Promise.all([p1, p2]);
        let charObject: CharacterOption | undefined;
        if (char)
          charObject = {
            char,
            render,
            fallback: buildFallbackUri(
              char.race.id,
              char.gender.type,
              RenderTypes.Avatar
            ),
          };
        return charObject;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const navigate = async () => {
    const opt = await loadCharacter();
    // console.log(opt);
    if (opt) {
      setShowSearch(false);
      navigator.navigate("Character", { opt });
    } else setShowErrors(true);
  };

  return (
    <Overlay
      isVisible={showSearch}
      onBackdropPress={() => setShowSearch(false)}
      overlayStyle={
        showList
          ? { width: "80%", height: "50%", top: "-15%", borderRadius: 10 }
          : { width: "80%", height: "28%", borderRadius: 10 }
      }
    >
      <View style={{ display: "flex", width: "100%", height: "100%" }}>
        <SearchBar
          placeholder="Character name..."
          onChangeText={setSearchValue}
          value={searchValue}
          platform="ios"
        />
        <SearchBar
          placeholder="Realm"
          onChangeText={setCurrRealmName}
          value={currRealmName}
          platform="ios"
          onFocus={() => setShowList(true)}
          onSubmitEditing={() => setShowList(false)}
        />
        {showList && <Picker>{mappedRealms}</Picker>}
        {showErrors && (
          <Text
            style={{
              alignSelf: "center",
              color: "red",
              textTransform: "uppercase",
              fontWeight: "bold",
              margin: 8,
            }}
          >
            Character not found
          </Text>
        )}
        <Button title="Search" raised={true} onPress={navigate} />
      </View>
    </Overlay>
  );
};

const Picker = styled(ScrollView)`
  width: 100%;
  height: 60%;
`;
