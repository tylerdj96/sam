export interface Self {
  href: string;
}

export interface Links {
  self: Self;
}

export interface Key {
  href: string;
}

export interface Key2 {
  href: string;
}

export interface Realm {
  key: Key2;
  name: string;
  id: number;
  slug: string;
}

export interface Character {
  key: Key;
  name: string;
  id: number;
  realm: Realm;
}

export interface Faction {
  type: string;
  name: string;
}

export interface Bracket {
  id: number;
  type: string;
}

export interface Key3 {
  href: string;
}

export interface Season {
  key: Key3;
  id: number;
}

export interface Key4 {
  href: string;
}

export interface Tier {
  key: Key4;
  id: number;
}

export interface SeasonMatchStatistics {
  played: number;
  won: number;
  lost: number;
}

export interface WeeklyMatchStatistics {
  played: number;
  won: number;
  lost: number;
}

export interface PvpBracketStatistics {
  _links: Links;
  character: Character;
  faction: Faction;
  bracket: Bracket;
  rating: number;
  season: Season;
  tier: Tier;
  season_match_statistics: SeasonMatchStatistics;
  weekly_match_statistics: WeeklyMatchStatistics;
}
