
// tool to generate interfaces
// https://transform.tools/json-to-typescript

// for definition of imports from database
// import { object } from "@angular/fire/database";

export interface Dichter {
  // id:string,
  // generated in ts for timeline
  id_name:{type:string, literal:string, kana:string, romanized:string},
  names: [
    {type:string, literal:string, kana:string, romanized:string}
  ];
  nametypes:Array<string>
  romanized: string;
  birth: number;
  death: number;
  placebirth: string;
  placedeath: string;
  travels: Array<Travel>;
  timeline: Array<Timedata>;
}

export interface Travel {
  summary_ja: string;
  summary_de: string;
  start: string;
  end: string;
  stations: string;
}

export interface Timedata {
  events: Array<Event>;
  year: number;
}

export interface Event {
  event_year: string;
  category: Array<string>;
  summary_ja: string;
  summary_de: string;
  expansion_ja: string;
  expansion_de: string;
  source: string;
  work: Array<Works>;
  id: string;
}

export interface Works {
  title: string;
  titlekana: string;
  titleromanized: string;
  digitised: Array<Digitised>;
}

export interface Digitised {
  digitisedLink: string;
  digitised_summary_ja: string;
  digitised_summary_de: string;
  digitisedArchive: Array<string>;
  digitisedImage: Array<string>;
}

export interface Member {
  member: [];
}

export interface Inhalt {
  date: string;
}

export type Bibliography_Schema = Biblio[]

export interface Biblio  {
  // id: string
  type: string
  language: string
  source: string
  author: Author[]
  editor: Editor[]
  issued: Issued
  title: string
  publisher: string
  "collection-title"?: string
  volume?: string
  "container-title"?: string
  page?: string
  URL: string
  keyword?: string
}

export interface Author {
  family?: string
  given?: string
  literal?: string
}

export interface Editor {
  family?: string
  given?: string
  literal?: string
}

export interface Issued {
  "date-parts": string[][]
}
