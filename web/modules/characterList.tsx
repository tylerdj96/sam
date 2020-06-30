import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ListItem, Overlay } from "react-native-elements";
import {
  getCharacterList,
  getCharacterRender,
  buildFallbackUri,
  RenderTypes
} from "../api/clients/profile-client";
import { useBlizzContext } from "../context/useBlizzToken";
import {
  CharacterSummary,
  CharacterRender,
  Character,
  BaseCharacterSummary
} from "../api/clients/interfaces/characters";
import { useNavigation } from "@react-navigation/native";
import { FullScreenLoading } from "../common/components/loaders";
import { CharacterSearch } from "./character/characterSearch";
import { getRealms } from "../api/clients/dynamic-client";
import { Realm } from "../api/clients/interfaces/realms";

export interface CharacterOption {
  char: BaseCharacterSummary | Character;
  render: CharacterRender | undefined;
  fallback: string;
}

export const CharacterList = ({ showSearch, setShowSearch }: { showSearch: boolean, setShowSearch: (val: boolean) => void }) => {
  const navigator = useNavigation();
  const { accessToken, loading } = useBlizzContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [charList, setCharList] = useState<CharacterOption[]>();
  const [searchValue, setSearchValue] = useState<string>();
  const [realms, setRealms] = useState<Realm[]>();

  useEffect(() => {
    const loadRawCharacters = async () => {
      if (accessToken) {
        const rawCharList = await getCharacterList(accessToken);
        if (rawCharList) return rawCharList.wow_accounts[0].characters;
      }
      return;
    };
    const loadAvatar = async (rawChar: CharacterSummary) => {
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
        const promises = rawChars.map(async char => {
          return {
            char,
            render: await loadAvatar({ ...char }),
            fallback: buildFallbackUri(
              char.playable_race.id,
              char.gender.type,
              RenderTypes.Avatar
            )
          };
        });
        const options = await Promise.all(promises);
        setCharList(options.sort(sortChars));
      }
      setIsLoading(false);
    };

    const loadRealms = async () => {
      if (accessToken) {
        setIsLoading(true);
        const rawRealms = await getRealms(accessToken);
        if (rawRealms)
          setRealms(
            rawRealms.realms
              .sort(compareRealms)
          );
        setIsLoading(false);
      }
    };


    loadRealms();
    loadAvatars();
  }, [accessToken]);

  useEffect(() => {

  }, [accessToken]);

  if (loading || isLoading || !charList) {
    return <FullScreenLoading />;
  }

  return (
    <View>
      <CharacterSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        realms={realms}
      />

      <ScrollView>
        {charList.map(opt => (
          <ListItem
            key={`${opt.char.name}${opt.char.realm.name}`}
            title={`${opt.char.name}`}
            titleStyle={{ fontWeight: "bold" }}
            //fix-me
            subtitle={`Level ${opt.char.level} ${opt.char.playable_class.name}`}
            leftAvatar={{
              source: { uri: opt.render?.avatar_url ?? opt.fallback }
            }}
            onPress={() => navigator.navigate("Character", { opt })}
            chevron
            bottomDivider
          />
        ))}
      </ScrollView>
    </View>
  );
};


//fix-me
//this is backwards
const sortChars = (a: CharacterOption, b: CharacterOption) => {
  if (a.char.level < b.char.level) return 1;
  if (a.char.level > b.char.level) return -1;
  else {
    if (a.char.name < b.char.name) return -1;
    if (a.char.name > b.char.name) return 1;
    else return 0;
  }
};

const compareRealms = (a: Realm, b: Realm) => {
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
};

