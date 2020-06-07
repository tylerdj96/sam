import React, { useState, useEffect } from "react";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBlizzContext } from "../../context/useBlizzToken";
import { CharacterOption } from "../characterList";
import {
  getCharacterList,
  getPvpBracketStats,
  ArenaBrackets,
} from "../../api/clients/profile-client";
import { Character } from "../../api/clients/interfaces/characters";
import { PvpBracketStatistics } from "../../api/clients/interfaces/pvp";

export const PvpInfo = ({ char }: { char: Character }) => {
  const { accessToken, loading } = useBlizzContext();
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
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Rating: {twos.rating}</Text>
      <Text>Wins: {twos.season_match_statistics.won}</Text>
      <Text>Losses: {twos.season_match_statistics.lost}</Text>
      <Text>
        Percentage:{" "}
        {(twos.season_match_statistics.won /
          twos.season_match_statistics.played) *
          100}
        %
      </Text>
      <Text>Rating: {threes.rating}</Text>
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
