import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'glossar',
  standalone: true
})
export class GlossarPipe implements PipeTransform {

  // zur Konversion von bereits romanisierten Fachbegriffen

  transform(value: string) {

    let glossar = [
      {
        "ja": "方丈",
        "kana": "",
        "romanized": "Hōjō",
        "de": "Abtsräume",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "本坊",
        "kana": "",
        "romanized": "Honbō",
        "de": "Abtszimmer",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "拝殿",
        "kana": "",
        "romanized": "Haiden",
        "de": "Gebetshalle ",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://en.wikipedia.org/wiki/Haiden_(Shinto)",
        "url_jaanus": ""
      },
      {
        "ja": "幣殿",
        "kana": "",
        "romanized": "Heiden",
        "de": "Opferhalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://en.wikipedia.org/wiki/Heiden_(Shinto)",
        "url_jaanus": ""
      },
      {
        "ja": "本殿",
        "kana": "",
        "romanized": "Honden",
        "de": "Haupthalle (Heiligtum, sanctuary)",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "法堂",
        "kana": "",
        "romanized": "Hōdō",
        "de": "Haupthalle, Dharmahalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "外殿",
        "kana": "",
        "romanized": "Gaiden",
        "de": "Äußeres Heiligtum",
        "en": "outer sanctuary",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "内殿",
        "kana": "",
        "romanized": "Naiden",
        "de": "Inneres Heiligtum",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "宸殿",
        "kana": "",
        "romanized": "Shinden ",
        "de": "Kaiserliche Halle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "宸殿は門跡寺院特有のもので、主要な法要はここで行う。有縁の天皇及び歴代門主の御尊牌を祀る。",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "天守",
        "kana": "",
        "romanized": "Tenshu ",
        "de": "Donjon",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "礼堂 ",
        "kana": "",
        "romanized": "Raidō ",
        "de": "Gebetshalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "多宝塔",
        "kana": "",
        "romanized": "Tahōtō",
        "de": "Zweistöckige Pagode",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://en.wikipedia.org/wiki/Tah%C5%8Dt%C5%8D",
        "url_jaanus": ""
      },
      {
        "ja": "講堂",
        "kana": "",
        "romanized": "Kōdō",
        "de": "Predigthalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "開山堂",
        "kana": "",
        "romanized": "Kaisandō ",
        "de": "Gründerhalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "御影堂",
        "kana": "",
        "romanized": "Mieidō ",
        "de": "Gründerhalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "祖堂",
        "kana": "",
        "romanized": "Sodō",
        "de": "Gründerhalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "祖師堂",
        "kana": "",
        "romanized": "Soshidō",
        "de": "Gründerhalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "梵鐘",
        "kana": "",
        "romanized": "Bonshō ",
        "de": "Tempelglocke",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "客殿",
        "kana": "",
        "romanized": "Kyakuden",
        "de": "Gasthalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "書院",
        "kana": "",
        "romanized": "Shoin",
        "de": "Salon",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "/ früher Studienhalle, dann Empfangsraum, Salon (drawing room) (shoin zukuri https://en.wikipedia.org/wiki/Shoin /)",
        "url_wiki": "https://en.wikipedia.org/wiki/Shoin-zukuri",
        "url_jaanus": ""
      },
      {
        "ja": "御殿",
        "kana": "",
        "romanized": "Goten",
        "de": "Palast",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "遠侍",
        "kana": "",
        "romanized": "Tōsaburai",
        "de": "Wachhaus",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "車寄",
        "kana": "",
        "romanized": "Kurumayose",
        "de": "Wagenpforte",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "大雄宝殿",
        "kana": "",
        "romanized": "Daiyū hōden",
        "de": "Buddhahalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "仏殿",
        "kana": "",
        "romanized": "Butsuden",
        "de": "Buddhahalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "大師堂",
        "kana": "",
        "romanized": "Taishidō",
        "de": "Halle des großen Meisters",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://ja.wikipedia.org/wiki/%E5%A4%A7%E5%B8%AB%E5%A0%82",
        "url_jaanus": ""
      },
      {
        "ja": "楼門",
        "kana": "",
        "romanized": "Rōmon",
        "de": "Turmtor",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "",
        "url_jaanus": ""
      },
      {
        "ja": "本堂",
        "kana": "",
        "romanized": "Hondō",
        "de": "Haupthalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://en.wikipedia.org/wiki/Main_Hall_(Japanese_Buddhism)",
        "url_jaanus": ""
      },
      {
        "ja": "金堂",
        "kana": "",
        "romanized": "Kondō",
        "de": "Haupthalle",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://en.wikipedia.org/wiki/Main_Hall_(Japanese_Buddhism)",
        "url_jaanus": ""
      },
      {
        "ja": "茶室",
        "kana": "",
        "romanized": "Chashitsu",
        "de": "Teeraum",
        "en": "",
        "category": "art, architecture",
        "alternative_terms": "",
        "description": "",
        "url_wiki": "https://en.wikipedia.org/wiki/Chashitsu",
        "url_jaanus": ""
      }
    ]

    if(value !== undefined){

    glossar.forEach((glossar_entry) => {

      if(value.includes(glossar_entry.romanized)){
        value = value.replace(glossar_entry.romanized, glossar_entry.de)
      }
    
    }) 
  }

  return value

  }
}