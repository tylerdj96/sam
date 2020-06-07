import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { useBlizzContext } from "../../context/useBlizzToken";
import {
  CharacterAppearance,
  CharacterEquipment,
  EquippedItem,
  CustomEquipmentSlotOrder,
} from "../../api/clients/interfaces/characters";
import {
  getCharacterAppearance,
  getPvpBracketStats,
  ArenaBrackets,
  buildFallbackUri,
  getCharacterEquipment,
} from "../../api/clients/profile-client";
import { getItemMedia } from "../../api/clients/static-client";
import { ItemMedia } from "../../api/clients/interfaces/items";
import { CharacterContext } from "./characterProvider";

const equipmentSorter = (a: EquippedItem, b: EquippedItem) => {
  if (
    CustomEquipmentSlotOrder[a.slot.type] <
    CustomEquipmentSlotOrder[b.slot.type]
  )
    return -1;
  if (
    CustomEquipmentSlotOrder[a.slot.type] >
    CustomEquipmentSlotOrder[b.slot.type]
  )
    return 1;
  return 0;
};

export const MainCharRender = () => {
  const { accessToken, loading } = useBlizzContext();
  const { char, render } = useContext(CharacterContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [charAppearance, setCharAppearance] = useState<CharacterAppearance>();
  const [charEquipment, setCharEquipment] = useState<CharacterEquipment>();
  const [equipmentMediaLinks, setEquipmentMediaLinks] = useState<
    (ItemMedia | undefined)[]
  >();

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
        setCharAppearance(appearance);
        setCharEquipment(equipment);
      }
      setIsLoading(false);
    };

    loadCharacterData();
  }, [accessToken]);

  useEffect(() => {
    const loadItemMedia = async () => {
      setIsLoading(true);
      if (accessToken && charEquipment) {
        const promises = charEquipment.equipped_items.map((item) => {
          return getItemMedia(accessToken, item.media.id);
        });
        const links = await Promise.all(promises);
        setEquipmentMediaLinks(links);
      }
      setIsLoading(false);
    };
    loadItemMedia();
  }, [accessToken, charEquipment]);

  if (loading || isLoading || !equipmentMediaLinks) {
    console.log({ loading, isLoading });
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      <ItemList position="left">
        {equipmentMediaLinks.slice(0, 8).map((link, index) => {
          return <Item key={index} source={{ uri: link?.assets?.[0].value }} />;
        })}
      </ItemList>
      <ItemList position="right">
        {equipmentMediaLinks.slice(8, 16).map((link, index) => {
          return <Item key={index} source={{ uri: link?.assets?.[0].value }} />;
        })}
      </ItemList>
      <WeaponAndShield>
        {equipmentMediaLinks
          .slice(16, equipmentMediaLinks.length - 1)
          .map((link, index) => {
            return <WS key={index} source={{ uri: link?.assets?.[0].value }} />;
          })}
      </WeaponAndShield>
      <Image
        style={{
          width: "100%",
          position: "absolute",
          height: "100%",
          zIndex: 0,
        }}
        source={{ uri: render?.render_url ?? buildFallbackUri(char) }}
      />
    </View>
  );
};

const equipmentParser = (equipment: EquippedItem[]) => {
  let curr = CustomEquipmentSlotOrder.HEAD;
  let newList = [];
  for (let i = 0; i < equipment.length; i++) {
    if (!equipment[i].slot.type) {
      equipment[i].slot.type = curr;
    }
  }
  console.log(curr);
};

const Item = styled(Image)`
  width: 80%;
  align-self: center;
  height: 10%;
  border: 3px solid #73ad21;
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
  align-self: ${(props) =>
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
