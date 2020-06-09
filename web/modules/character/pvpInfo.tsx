import React, { useState, useEffect, useContext } from "react";
import { View, Image, Text } from "react-native";
import { useBlizzContext } from "../../context/useBlizzToken";
import {
  getPvpBracketStats,
  ArenaBrackets
} from "../../api/clients/profile-client";
import { PvpBracketStatistics } from "../../api/clients/interfaces/pvp";
import { CharacterContext } from "./characterProvider";
import { FullScreenLoading } from "../../common/components/loaders";

export const PvpInfo = () => {
  const { accessToken, loading } = useBlizzContext();
  const { char } = useContext(CharacterContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [twos, setTwos] = useState<PvpBracketStatistics>();
  const [threes, setThrees] = useState<PvpBracketStatistics>();

  useEffect(() => {
    const loadArenaInfo = async () => {
      setIsLoading(true);
      if (accessToken) {
        const p1 = await getPvpBracketStats(
          accessToken,
          char.realm.slug,
          char.name,
          ArenaBrackets.twos
        );
        const p2 = await getPvpBracketStats(
          accessToken,
          char.realm.slug,
          char.name,
          ArenaBrackets.threes
        );
        if (p1) setTwos(p1);
        if (p2) setThrees(p2);
      }
      setIsLoading(false);
    };

    loadArenaInfo();
  }, [accessToken]);

  if (loading || isLoading || !twos || !threes) {
    return <FullScreenLoading />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>2v2</Text>
      <Image
        source={determine_icon(twos.rating)}
        style={{ width: 150, height: 150 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>{twos.rating}</Text>
      <Text>Wins: {twos.season_match_statistics.won}</Text>
      <Text>Losses: {twos.season_match_statistics.lost}</Text>
      <Text>
        Percentage:{" "}
        {(twos.season_match_statistics.won /
          twos.season_match_statistics.played) *
          100}
        %
      </Text>
      <Text style={{ fontSize: 24, marginTop: 48 }}>3v3</Text>
      <Image
        source={determine_icon(twos.rating)}
        style={{ width: 150, height: 150 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>{threes.rating}</Text>
      <Text>Wins: {threes.season_match_statistics.won}</Text>
      <Text>Losses: {threes.season_match_statistics.lost}</Text>
      <Text>
        Percentage:{" "}
        {(threes.season_match_statistics.won /
          threes.season_match_statistics.played) *
          100}
        %
      </Text>
    </View>
  );
};

const determine_icon = (rating: number) => {
  if (rating == 0) {
    return require(`./assets/UI_RankedPvP_01.png`);
  } else if (rating >= 1 && rating <= 1400) {
    return require(`./assets/UI_RankedPvP_02.png`);
  } else if (rating > 1375 && rating <= 1600) {
    return require(`./assets/UI_RankedPvP_03.png`);
  } else if (rating > 1575 && rating <= 1800) {
    return require(`./assets/UI_RankedPvP_04.png`);
  } else if (rating > 1775 && rating <= 2100) {
    return require(`./assets/UI_RankedPvP_05.png`);
  } else if (rating > 2075 && rating <= 2400) {
    return require(`./assets/UI_RankedPvP_06.png`);
  } else if (rating > 2375) {
    return require(`./assets/UI_RankedPvP_07.png`);
  }
};
