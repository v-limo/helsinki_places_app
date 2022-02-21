export interface Description {
  intro?: string;
  body?: string;
  images?: any[];
}

export interface Location {
  lat?: number;
  lon?: number;
  address: Address;
}

export interface Address {
  street_address?: string;
  postal_code?: string;
  locality?: string;
  neighbourhood?: string;
}

export interface Name {
  fi?: string;
  en?: string;
  sv?: null;
  zh?: null;
}

export interface SourceType {
  id?: number;
  name?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: Name;
  source_type: SourceType;
  info_url?: string;
  modified_at: Date;
  location: Location;
  description: Description;
  tags?: Tag[];
  extra_searchwords?: any[];
  opening_hours_url?: string;
}
