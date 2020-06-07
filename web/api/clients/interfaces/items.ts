export interface Self {
  href: string;
}

export interface Links {
  self: Self;
}

export interface Asset {
  key: string;
  value: string;
}

export interface ItemMedia {
  _links: Links;
  assets: Asset[];
  id: number;
}
