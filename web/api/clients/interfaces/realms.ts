export interface Self {
  href: string;
}

export interface Links {
  self: Self;
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

export interface RealmList {
  _links: Links;
  realms: Realm[];
}
