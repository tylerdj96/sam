import React, { useEffect, useState, useMemo } from "react";
import { View, Image, ActivityIndicator, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import {
  getCharacterList,
  getCharacterRender,
  buildFallbackUri,
  RenderTypes,
} from "../api/clients/profile-client";
import { useBlizzContext } from "../context/useBlizzToken";
import {
  Character,
  CharacterRender,
} from "../api/clients/interfaces/characters";
import { useNavigation } from "@react-navigation/native";

export interface CharacterOption {
  char: Character;
  render: CharacterRender | undefined;
  fallback: string;
}

//fix-me
//this is backwards
const sortChars = (a: CharacterOption, b: CharacterOption) => {
  if (a.char.level < b.char.level) return 1;
  else if (a.char.level > b.char.level) return -1;
  else {
    if (a.char.name < b.char.name) return 1;
    else if (a.char.name < b.char.name) return -1;
    else return 0;
  }
};

export const CharacterList = () => {
  const navigator = useNavigation();
  const { accessToken, loading } = useBlizzContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [charList, setCharList] = useState<CharacterOption[]>();

  useEffect(() => {
    const loadRawCharacters = async () => {
      if (accessToken) {
        const rawCharList = await getCharacterList(accessToken);
        if (rawCharList) return rawCharList.wow_accounts[0].characters;
      }
      return;
    };
    const loadAvatar = async (rawChar: Character) => {
      const render = await getCharacterRender(
        accessToken!,
        rawChar.realm.slug,
        rawChar.name
      );
      return render;
    };

    //really slow
    const loadAvatars = async () => {
      setIsLoading(true);
      const rawChars = await loadRawCharacters();
      if (accessToken && rawChars) {
        const promises = rawChars.map(async (c) => {
          return {
            char: c,
            render: await loadAvatar({ ...c }),
            fallback: buildFallbackUri(c, RenderTypes.Avatar),
          };
        });
        const options = await Promise.all(promises);
        setCharList(options.sort(sortChars));
      }
      setIsLoading(false);
    };

    loadAvatars();
  }, [accessToken]);

  if (loading || isLoading || !charList) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      {charList.map((opt) => (
        <ListItem
          key={`${opt.char.name}${opt.char.realm.name}`}
          title={`${opt.char.name}`}
          titleStyle={{ fontWeight: "bold" }}
          subtitle={`Level ${opt.char.level} ${opt.char.playable_race.name} ${opt.char.playable_class.name}`}
          leftAvatar={{
            // rounded: true,
            source: { uri: opt.render?.avatar_url ?? opt.fallback },
          }}
          // onPress={() => navigator.navigate("Main", { opt })}
          onPress={() => navigator.navigate("Character", { opt })}
          chevron
          bottomDivider
          // style={{
          //   backgroundColor:
          //     opt.char.faction.type === "HORDE" ? "#8C1616" : "#162c57",
          // }}
        />
      ))}
    </ScrollView>
  );
};
