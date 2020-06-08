import { ItemMedia } from "./items";

export interface Self {
  href: string;
}

export interface User {
  href: string;
}

export interface Profile {
  href: string;
}

export interface Links {
  self: Self;
  user: User;
  profile: Profile;
}

export interface Character2 {
  href: string;
}

export interface ProtectedCharacter {
  href: string;
}

export interface Key {
  href: string;
}

export interface Realm {
  key: Key;
  name: string;
  id: number;
  slug: string;
}

export interface Key2 {
  href: string;
}

export interface PlayableClass {
  key: Key2;
  name: string;
  id: number;
}

export interface Key3 {
  href: string;
}

export interface PlayableRace {
  key: Key3;
  name: string;
  id: number;
}

export interface Gender {
  type: string;
  name: string;
}

export interface Faction {
  type: string;
  name: string;
}

export interface Character {
  character: Character2;
  protected_character: ProtectedCharacter;
  name: string;
  id: number;
  realm: Realm;
  playable_class: PlayableClass;
  playable_race: PlayableRace;
  gender: Gender;
  faction: Faction;
  level: number;
}

export interface WowAccount {
  id: number;
  characters: Character[];
}

export interface Collections {
  href: string;
}

export interface CharacterList {
  _links: Links;
  id: number;
  wow_accounts: WowAccount[];
  collections: Collections;
}

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

export interface CharacterRender {
  _links: Links;
  character: Character;
  avatar_url: string;
  bust_url: string;
  render_url: string;
}

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

export interface Key3 {
  href: string;
}

export interface PlayableRace {
  key: Key3;
  name: string;
  id: number;
}

export interface Key4 {
  href: string;
}

export interface PlayableClass {
  key: Key4;
  name: string;
  id: number;
}

export interface Key5 {
  href: string;
}

export interface ActiveSpec {
  key: Key5;
  name: string;
  id: number;
}

export interface Gender {
  type: string;
  name: string;
}

export interface Faction {
  type: string;
  name: string;
}

export interface Key6 {
  href: string;
}

export interface Media {
  key: Key6;
  id: number;
}

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Color {
  id: number;
  rgba: Rgba;
}

export interface Emblem {
  id: number;
  media: Media;
  color: Color;
}

export interface Key7 {
  href: string;
}

export interface Media2 {
  key: Key7;
  id: number;
}

export interface Rgba2 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Color2 {
  id: number;
  rgba: Rgba2;
}

export interface Border {
  id: number;
  media: Media2;
  color: Color2;
}

export interface Color3 {
  id: number;
}

export interface Background {
  color: Color3;
}

export interface GuildCrest {
  emblem: Emblem;
  border: Border;
  background: Background;
}

export interface Appearance {
  face_variation: number;
  skin_color: number;
  hair_variation: number;
  hair_color: number;
  feature_variation: number;
  custom_display_options: number[];
}

//this is a mapping from the slot numbers
// to the mapping that shows in the character pane and on armory
// enum CustomEquipmentSlotOrder {
//   Head = "HEAD",
//   Neck = "NECK",
//   Shoulder = "SHOULDER",
//   Back = "BACK",
//   Chest = "CHEST",
//   Shirt = "SHIRT",
//   Tabard = "TABARD",
//   Wrist = "WRIST",
//   Gloves = "GLOVES",
//   Belt = "BELT",
//   Legs = "LEGS",
//   Feet = "FEET",
//   Finger1 = "FINGER_1",
//   Finger2 = "FINGER_2",
//   Trinket1 = "TRINKET_1",
//   Trinket2 = "TRINKET_2",
//   MainHand = "MAIN_HAND",
//   OffHand = "OFF_HAND",
// }
//this is custom generated
// export enum CustomEquipmentSlotOrder {
//   "HEAD" = 0,
//   "NECK" = 1,
//   "SHOULDER" = 2,
//   "BACK" = 3,
//   "CHEST" = 4,
//   "SHIRT" = 5,
//   "TABARD" = 6,
//   "WRIST" = 7,
//   "GLOVES" = 8,
//   "BELT" = 9,
//   "LEGS" = 10,
//   "FEET" = 11,
//   "FINGER_1" = 12,
//   "FINGER_2" = 13,
//   "TRINKET_1" = 14,
//   "TRINKET_2" = 15,
//   "MAIN_HAND" = 16,
//   "OFF_HAND" = 17,
// }

// export enum CustomEquipmentSlotOrder {
//   "HEAD",
//   "NECK",
//   "SHOULDER",
//   "BACK",
//   "CHEST",
//   "SHIRT",
//   "TABARD",
//   "WRIST",
//   "HANDS",
//   "WAIST",
//   "LEGS",
//   "FEET",
//   "FINGER_1",
//   "FINGER_2",
//   "TRINKET_1",
//   "TRINKET_2",
//   "MAIN_HAND",
//   "OFF_HAND",
// }

export interface EquipmentDictionary {
  [key: string]: {
    order: number;
    item: EquippedItem | undefined;
    link: ItemMedia | undefined;
  };
}

export const customEquipmentSlotOrder: EquipmentDictionary = {
  HEAD: { order: 0, item: undefined, link: undefined },
  NECK: { order: 1, item: undefined, link: undefined },
  SHOULDER: { order: 2, item: undefined, link: undefined },
  BACK: { order: 3, item: undefined, link: undefined },
  CHEST: { order: 4, item: undefined, link: undefined },
  SHIRT: { order: 5, item: undefined, link: undefined },
  TABARD: { order: 6, item: undefined, link: undefined },
  WRIST: { order: 7, item: undefined, link: undefined },
  HANDS: { order: 8, item: undefined, link: undefined },
  WAIST: { order: 9, item: undefined, link: undefined },
  LEGS: { order: 10, item: undefined, link: undefined },
  FEET: { order: 11, item: undefined, link: undefined },
  FINGER_1: { order: 12, item: undefined, link: undefined },
  FINGER_2: { order: 13, item: undefined, link: undefined },
  TRINKET_1: { order: 14, item: undefined, link: undefined },
  TRINKET_2: { order: 15, item: undefined, link: undefined },
  MAIN_HAND: { order: 16, item: undefined, link: undefined },
  OFF_HAND: { order: 17, item: undefined, link: undefined },
};

export interface Slot {
  type: string;
  name: string;
}

export interface Item {
  id: number;
  slot: Slot;
  enchant: number;
  item_appearance_modifier_id: number;
  internal_slot_id: number;
  subclass: number;
}

export interface CharacterAppearance {
  _links: Links;
  character: Character;
  playable_race: PlayableRace;
  playable_class: PlayableClass;
  active_spec: ActiveSpec;
  gender: Gender;
  faction: Faction;
  guild_crest: GuildCrest;
  appearance: Appearance;
  items: Item[];
}

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

export interface Key3 {
  href: string;
}

export interface Item {
  key: Key3;
  id: number;
}

export interface Quality {
  type: string;
  name: string;
}

export interface Key4 {
  href: string;
}

export interface Spell {
  key: Key4;
  name: string;
  id: number;
}

export interface SpellTooltip {
  spell: Spell;
  description: string;
  cast_time: string;
}

export interface SelectedPower {
  id: number;
  tier: number;
  spell_tooltip: SpellTooltip;
  is_display_hidden: boolean;
}

export interface Key5 {
  href: string;
}

export interface Spell2 {
  key: Key5;
  name: string;
  id: number;
}

export interface MainSpellTooltip {
  spell: Spell2;
  description: string;
  cast_time: string;
  range: string;
  cooldown: string;
}

export interface Key6 {
  href: string;
}

export interface Spell3 {
  key: Key6;
  name: string;
  id: number;
}

export interface PassiveSpellTooltip {
  spell: Spell3;
  description: string;
  cast_time: string;
  range: string;
}

export interface Key7 {
  href: string;
}

export interface Essence {
  key: Key7;
  name: string;
  id: number;
}

export interface Key8 {
  href: string;
}

export interface Media {
  key: Key8;
  id: number;
}

export interface SelectedEssence {
  slot: number;
  rank: number;
  main_spell_tooltip: MainSpellTooltip;
  passive_spell_tooltip: PassiveSpellTooltip;
  essence: Essence;
  media: Media;
}

export interface Level {
  value: number;
  display_string: string;
}

export interface AzeriteDetails {
  selected_powers: SelectedPower[];
  selected_powers_string: string;
  percentage_to_next_level?: number;
  selected_essences: SelectedEssence[];
  level: Level;
}

export interface Key9 {
  href: string;
}

export interface Media2 {
  key: Key9;
  id: number;
}

export interface Key10 {
  href: string;
}

export interface ItemClass {
  key: Key10;
  name: string;
  id: number;
}

export interface Key11 {
  href: string;
}

export interface ItemSubclass {
  key: Key11;
  name: string;
  id: number;
}

export interface InventoryType {
  type: string;
  name: string;
}

export interface Binding {
  type: string;
  name: string;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Display {
  display_string: string;
  color: Color;
}

export interface Armor {
  value: number;
  display: Display;
}

export interface Type {
  type: string;
  name: string;
}

export interface Color2 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Display2 {
  display_string: string;
  color: Color2;
}

export interface Stat {
  type: Type;
  value: number;
  display: Display2;
  is_negated?: boolean;
  is_equip_bonus?: boolean;
}

export interface Level2 {
  value: number;
  display_string: string;
}

export interface Value {
  type: string;
  name: string;
}

export interface Faction {
  value: Value;
  display_string: string;
}

export interface Requirements {
  level: Level2;
  faction: Faction;
}

export interface Level3 {
  value: number;
  display_string: string;
}

export interface Key12 {
  href: string;
}

export interface Item2 {
  key: Key12;
  name: string;
  id: number;
}

export interface Transmog {
  item: Item2;
  display_string: string;
  item_modified_appearance_id: number;
}

export interface Durability {
  value: number;
  display_string: string;
}

export interface Color3 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface NameDescription {
  display_string: string;
  color: Color3;
}

export interface Key13 {
  href: string;
}

export interface Spell5 {
  key: Key13;
  name: string;
  id: number;
}

export interface DisplayColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Spell4 {
  spell: Spell5;
  description: string;
  display_color: DisplayColor;
}

export interface DisplayStrings {
  header: string;
  gold: string;
  silver: string;
  copper: string;
}

export interface SellPrice {
  value: number;
  display_strings: DisplayStrings;
}

export interface SocketType {
  type: string;
  name: string;
}

export interface Key14 {
  href: string;
}

export interface Item3 {
  key: Key14;
  name: string;
  id: number;
}

export interface Key15 {
  href: string;
}

export interface Media3 {
  key: Key15;
  id: number;
}

export interface Socket {
  socket_type: SocketType;
  item: Item3;
  display_string: string;
  media: Media3;
}

export interface Key16 {
  href: string;
}

export interface SourceItem {
  key: Key16;
  name: string;
  id: number;
}

export interface EnchantmentSlot {
  id: number;
  type: string;
}

export interface Enchantment {
  display_string: string;
  source_item: SourceItem;
  enchantment_id: number;
  enchantment_slot: EnchantmentSlot;
}

export interface DamageClass {
  type: string;
  name: string;
}

export interface Damage {
  min_value: number;
  max_value: number;
  display_string: string;
  damage_class: DamageClass;
}

export interface AttackSpeed {
  value: number;
  display_string: string;
}

export interface Dps {
  value: number;
  display_string: string;
}

export interface Weapon {
  damage: Damage;
  attack_speed: AttackSpeed;
  dps: Dps;
}

export interface EquippedItem {
  item: Item;
  slot: Slot;
  quantity: number;
  context: number;
  bonus_list: number[];
  quality: Quality;
  name: string;
  modified_appearance_id: number;
  azerite_details: AzeriteDetails;
  media: Media2;
  item_class: ItemClass;
  item_subclass: ItemSubclass;
  inventory_type: InventoryType;
  binding: Binding;
  armor: Armor;
  stats: Stat[];
  requirements: Requirements;
  level: Level3;
  transmog: Transmog;
  durability: Durability;
  name_description: NameDescription;
  unique_equipped: string;
  spells: Spell4[];
  description: string;
  is_subclass_hidden?: boolean;
  sell_price: SellPrice;
  sockets: Socket[];
  is_corrupted?: boolean;
  enchantments: Enchantment[];
  weapon: Weapon;
}

export interface CharacterEquipment {
  _links: Links;
  character: Character;
  equipped_items: EquippedItem[];
}
