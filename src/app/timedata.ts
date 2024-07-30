export interface Dichter {
  romanized: string;
  birth: number;
  death: number;
}

export interface Inhalt {
  date: string;
}

export interface Timedata {
  events: Array<Events>;
  year: number;
}

export interface Events {
  date: string;
  category: string;
  description: string;
  descriptionGer: string;
  level: string;
  reference: string;
  source: string;
}

export interface Member {
  member: [];
}
