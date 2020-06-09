import React, { useEffect, useState, useContext } from "react";
import { View, Image } from "react-native";
import styled from "styled-components";
import { useBlizzContext } from "../../context/useBlizzToken";
import {
  CharacterAppearance,
  customEquipmentSlotOrder,
  EquipmentDictionary,
  Character
} from "../../api/clients/interfaces/characters";
import {
  getCharacterAppearance,
  getCharacterEquipment
} from "../../api/clients/profile-client";
import { getItemMedia } from "../../api/clients/static-client";
import { CharacterContext } from "./characterProvider";
import { FullScreenLoading } from "../../common/components/loaders";

export const MainCharRender = () => {
  const { accessToken, loading } = useBlizzContext();
  const { char, render } = useContext(CharacterContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [charAppearance, setCharAppearance] = useState<CharacterAppearance>();
  const [charEquipment, setCharEquipment] = useState<EquipmentDictionary>(
    customEquipmentSlotOrder
  );

  useEffect(() => {
    const loadCharacterData = async () => {
      setIsLoading(true);
      if (accessToken) {
        const p1 = getCharacterAppearance(
          accessToken,
          char.realm.slug,
          char.name
        );
        const p2 = getCharacterEquipment(
          accessToken,
          char.realm.slug,
          char.name
        );
        const [appearance, equipment] = await Promise.all([p1, p2]);
        let equipmentDict = { ...customEquipmentSlotOrder };

        // //need to add items if they are defined to preset dictionary
        // // since blizzard returns equipment out of order
        // // and only if the equipment piece exists

        equipment?.equipped_items.forEach(item => {
          const key = item.slot.type;
          equipmentDict[key] = { ...equipmentDict[key], item };
        });

        //make an api call for each link
        const promises = Object.values(equipmentDict).map(obj => {
          return getItemMedia(accessToken, obj.item?.media.id);
        });
        //await the promise for each item query
        const links = await Promise.all(promises);
        links.forEach((link, index) => {
          const key = Object.keys(charEquipment)[index];
          equipmentDict[key] = { ...equipmentDict[key], link };
        });
        setCharEquipment(equipmentDict);

        setCharAppearance(appearance);
      }
      setIsLoading(false);
    };

    loadCharacterData();
  }, [accessToken]);

  if (loading || isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      <ItemList position="left">
        {Object.values(charEquipment)
          .slice(0, 8)
          .map((item, index) => {
            return (
              <Item
                key={index}
                source={{ uri: item?.link?.assets?.[0].value }}
              />
            );
          })}
      </ItemList>
      <ItemList position="right">
        {Object.values(charEquipment)
          .slice(8, 16)
          .map((item, index) => {
            return (
              <Item
                key={index}
                source={{ uri: item?.link?.assets?.[0].value }}
              />
            );
          })}
      </ItemList>
      <WeaponAndShield>
        {Object.values(charEquipment)
          .slice(16, Object.values(charEquipment).length - 1)
          .map((item, index) => {
            return (
              <WS key={index} source={{ uri: item?.link?.assets?.[0].value }} />
            );
          })}
      </WeaponAndShield>
      <Image
        style={{
          width: "100%",
          position: "absolute",
          height: "100%",
          zIndex: 0
        }}
        source={{
          uri: render?.render_url
          // buildFallbackUri(char.race.id, char.gender.type)
        }}
      />
    </View>
  );
};

const Item = styled(Image)`
  width: 80%;
  align-self: center;
  height: 10%;
  border: 3px #73ad21;
  margin: 6px;
`;

const ItemList = styled(View)<{ position: string }>`
  display: flex;
  position: absolute;
  flex-direction: column;
  height: 80%;
  width: 20%;
  z-index: 1;
  top: 10%;
  align-self: ${props =>
    props.position === "left" ? "flex-start" : "flex-end"};
`;

const WeaponAndShield = styled(View)`
  display: flex;
  position: absolute;
  flex-direction: row;
  z-index: 1;
  height: 20%;
  width: 40%;
  justify-content: center;
  align-items: center;
  align-self: center;
  top: 80%;
`;

const WS = styled(Image)`
  background-color: yellow;
  width: 40%;
  height: 40%;
  margin: 6px;
`;
