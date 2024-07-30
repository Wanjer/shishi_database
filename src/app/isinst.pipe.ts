import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isinst'
})
export class IsinstPipe implements PipeTransform {

  transform(value: string){

    if(value.includes('茨城県立歴史館')){
      return 'Ibaraki Prefectural History Museum';
    }
    else if(value.includes('国文学研究資料館')){
      return 'National Institute for Japanese Literature';
    }
    else if(value.includes('国文学研究資料館 日本漢詩文集コレクション')){
      return 'National Institute for Japanese Literature, Nihon Kanshibun shū Collection';
    }
    else if(value.includes(' 福井市立図書館')){
      return 'Fukui Municipal Library';
    }
    else if(value.includes('新潟大学附属図書館 佐野文庫')){
      return 'Sano Bunko, Niigata University Library';
    }
    else if(value.includes('東京芸術大学')){
      return 'Tokyo University of the Arts';
    }
    else if(value.includes('東京藝術大学附属図書館 脇本文庫デジタル')){
      return 'Tokyo University of the Arts - Digital Wakimoto bunko';
    }
    else if(value.includes('金沢市立玉川図書館 蒼龍館文庫')){
      return 'Stadtbibliothek Tawagawa (Kanazawa), Sōryō bunko';
    }
    else if(value.includes('お茶の水女子大学図書館')){
      return 'Ocha-no-mizu University Library';
    }
    else if(value.includes('早稲田大学')){
      return 'Waseda University Library';
    }
    else if(value.includes('名古屋大学附属図書館')){
      return 'Nagoya University Library';
    }
    else if(value.includes('愛媛大学図書館')){
      return 'Ehime University Library';
    }
    else if(value.includes('歴彩館')){
      return 'Kyoto Furitsu Kyotogaku Rekisaikan';
    }
    else if(value.includes('国立公文書館デジタルアーカイブ')){
      return 'National Archives of Japan Digital Archive';
    }
    else if(value.includes('詩仙堂丈山寺')){
      return 'Shisendō Jōzanji';
    }
    else if(value.includes('安城市埋蔵文化財センター')){
      return 'Anjo City Archeological Research Center';
    }
    else if(value.includes('東北大学附属図書館')){
      return 'Tohoku University Library';
    }
    else if(value.includes('小泉吉永')){
      return 'Koizumi Yoshinaga Collection';
    }
    else if(value.includes('大正大学図書館')){
      return 'Taisho University Library';
    }
    else if(value.includes('東洋大学附属図書館 哲学堂文庫')){
      return 'Toyo University Library';
    }
    else if(value.includes('和歌山県立博物館')){
      return 'Wakayama Prefectural Museum';
    }
    else if(value.includes('和歌山市立博物館')){
      return 'Wakayama City Museum';
    }
    else if(value.includes('東京大学総合図書館')){
      return 'Tokyo University Library';
    }
    else if(value.includes('東京国立博物館')){
      return 'Tokyo National Museum';
    }
    else if(value.includes('国立国会図書館')){
      return 'National Diet Library';
    }
    else if(value.includes('龍谷大学図書館')){
      return 'Ryukoku University Library';
    }
    else if(value.includes('新日本古典籍総合データベース')){
      return 'Database of Pre-Modern Japanese Works';
    }
    else if(value.includes(' 北海道大学附属図書館')){
      return 'Hokkaido University Library';
    }
    else if(value.includes('江戸東京博物館')){
      return 'Edo-Tokyo Museum';
    }
    else if(value.includes('熊本市博物館')){
      return 'Kumamoto City Museum';
    }
    else if(value.includes('熊本大学附属図書館')){
      return 'Kumamoto University Library';
    }
    else if(value.includes(' 大阪府立大学学術情報センター')){
      return 'Osaka Prefecture University Library';
    }
    else if(value.includes('函館市中央図書館')){
      return 'Hakone City Central Library';
    }
    else if(value.includes('熊本県立美術館')){
      return 'Kumamoto Prefectural Museum of Art';
    }
    else if(value.includes('奈良女子大学学術情報センター')){
      return 'Nara Women\'s University Library';
    }
    else if(value.includes('同志社大学図書館')){
      return 'Doshisha University Library';
    }
    else if(value.includes('東京海洋大学附属図書館')){
      return 'Tokyo University of Marine Science and Technology Library';
    }
    else if(value.includes('龍谷大学附属図書館')){
      return 'Ryukoku University Library';
    }
    else if(value.includes('東京都立図書館')){
      return 'Tokyo Metropolitan Library';
    }
    else if(value.includes('個人蔵')){
      return 'In Privatbesitz';
    }
    else if(value.includes('関西大学図書館')){
      return 'Kansai University Library';
    }
    else if(value.includes('大阪府立中之島図書館')){
      return 'Osaka Prefectural Nakanoshima Library';
    }
    else if(value.includes('広島県立歴史博物館')){
      return 'Hiroshima Prefectural Museum of History';
    }
    else if(value.includes('神戸大学附属図書館')){
      return 'Kobe University Library';
    }
    else if(value.includes('慶應')){
      return 'Keio University Library';
    }
    else if(value.includes('大阪歴史博物館')){
      return 'Osaka Museum of History';
    }
    else if(value.includes('関西大学なにわ・大阪文化遺産学研究センター')){
      return 'Kansai University Research Center for Naniwa-Osaka Cultural Heritage Studies';
    }
    else if(value.includes('大阪大学附属図書館')){
      return 'Osaka University Library';
    }
    else if(value.includes('広島市竹原 春風館')){
      return 'Shunpukan, Takehara City';
    }
    else if(value.includes('清光山西厳寺')){
      return 'Saigonji (Nagano)';
    }
    else if(value.includes('柏崎ふるさと人物館')){
      return 'Kashiwazaki Furusato Jimbutsu Museum';
    }
    else if(value.includes('スウェーデン王立図書館')){
      return 'National Library of Sweden (Kungliga biblioteket)';
    }
    else if(value.includes('巻菱湖記念時代館')){
      return 'Maki Ryōko Memorial Museum';
    }
    else if(value.includes('東京都台東区 浅草寺')){
      return 'Sensōji, Taitōku, Tokyo';
    }
    else if(value.includes('静岡県立中央図書館')){
      return 'Shizuoka Prefecture Central Library';
    }
    else if(value.includes('京都大学貴重資料デジタルアーカイブ')){
      return 'Kyoto University Rare Materials Digital Archive';
    }
    else if(value.includes('関西学院大学図書館')){
      return 'Kansai Gakuin University Library';
    }
    else if(value.includes('中野三敏')){
      return 'Sammlung Nakano Mitsutoshi';
    }
    else if(value.includes('国文学研究資料館 鵜飼文庫')){
      return 'National Institute for Japanese Literature, Ugai Bunko';
    }
    else if(value.includes('広島県史跡')){
      return 'Hiroshima Prefecture Historic Site';
    }
    else if(value.includes('山陽記念文化財団')){
      return 'Rai Sanyo Commemorative cultural foundation';
    }
    else if(value.includes('日田市')){
      return 'Oita Prefecture Hita City';
    }
    else if(value.includes('奥の細道むすびの地記念館')){
      return 'Basho\'s Oku no Hosomichi Haiku Journey Museum';
    }
    else if(value.includes('大和文華館')){
      return 'The Museum Yamato Bunkakan (Nara)';
    }
    else if(value.includes('岐阜県歴史資料館')){
      return 'Gifu Prefectural Archives';
    }
    else if(value.includes('国文学研究資料館 広瀬青邨文庫')){
      return 'National Institute for Japanese Literature, Hirose Seiton Bunko';
    }
    else if(value.includes('九州大学中央図書館 雅俗文庫')){
      return 'Gazoku bunko der Kyushu University Library (ehemals Sammlung Nakano Mitsutoshi)';
    }
    else if(value.includes('頼山陽旧跡保存会')){
      return 'Association for the Preservation of the Former Rai Sanyo Residence (Kyoto)';
    }
    else if(value.includes('静嘉堂文庫美術館')){
      return 'Seikado Bunko Art Museum';
    }
    else if(value.includes('復刻版')){
      return 'Faksimile-Ausgabe';
    }
    else if(value.includes('国際日本文化研究センター')){
      return 'International Research Center for Japanese Studies';
    }
    else if(value.includes('廣瀬資料館')){
      return 'Hirose Museum (Hita, Oita)';
    }
    else if(value.includes('高知城歴史博物館')){
      return 'Kochi Castle Museum of History';
    }
    else if(value.includes('筑波大学附属図書館')){
      return 'Tsukuba University Library';
    }
    else if(value.includes('華溪寺')){
      return 'Kakeiji (Ogaki, Gifu)';
    }
    else if(value.includes('神戸市立博物館')){
      return 'Kobe City Museum';
    }
    else if(value.includes('大垣市郷土館')){
      return 'Ogaki City Folk Museum';
    }
    else if(value.includes('一橋大学附属図書館')){
      return 'Hitosubashi University Library';
    }
    else{
      return '';
    }
    throw new Error("isinst pipe conversion error");
}

}
