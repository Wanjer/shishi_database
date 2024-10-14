import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isinst'
})
export class IsinstPipe implements PipeTransform {

  transform(value: string){
    let institutions = [
      {
        nameja:"茨城県立歴史館",
        namede:"Ibaraki Prefectural History Museum"
     },
     {
        nameja:"国文学研究資料館 日本漢詩文集コレクション",
        namede:"National Institute for Japanese Literature, Nihon Kanshibun shū Collection"
     },
     {
        nameja:" 福井市立図書館",
        namede:"Fukui Municipal Library"
     },
     {
        nameja:"新潟大学附属図書館 佐野文庫",
        namede:"Sano Bunko, Niigata University Library"
     },
     {
        nameja:"東京芸術大学",
        namede:"Tokyo University of the Arts"
     },
     {
        nameja:"東京藝術大学附属図書館 脇本文庫デジタル",
        namede:"Tokyo University of the Arts - Digital Wakimoto bunko"
     },
     {
        nameja:"金沢市立玉川図書館 蒼龍館文庫",
        namede:"Stadtbibliothek Tawagawa (Kanazawa), Sōryō bunko"
     },
     {
        nameja:"お茶の水女子大学図書館",
        namede:"Ocha-no-mizu University Library"
     },
     {
        nameja:"早稲田大学",
        namede:"Waseda University Library"
     },
     {
        nameja:"名古屋大学附属図書館",
        namede:"Nagoya University Library"
     },
     {
        nameja:"愛媛大学図書館",
        namede:"Ehime University Library"
     },
     {
        nameja:"歴彩館",
        namede:"Kyoto Furitsu Kyotogaku Rekisaikan"
     },
     {
        nameja:"国立公文書館デジタルアーカイブ",
        namede:"National Archives of Japan Digital Archive"
     },
     {
        nameja:"詩仙堂丈山寺",
        namede:"Shisendō Jōzanji"
     },
     {
        nameja:"安城市埋蔵文化財センター",
        namede:"Anjo City Archeological Research Center"
     },
     {
        nameja:"東北大学附属図書館",
        namede:"Tohoku University Library"
     },
     {
        nameja:"小泉吉永",
        namede:"Koizumi Yoshinaga Collection"
     },
     {
        nameja:"大正大学図書館",
        namede:"Taisho University Library"
     },
     {
        nameja:"東洋大学附属図書館 哲学堂文庫",
        namede:"Toyo University Library"
     },
     {
        nameja:"和歌山県立博物館",
        namede:"Wakayama Prefectural Museum"
     },
     {
        nameja:"和歌山市立博物館",
        namede:"Wakayama City Museum"
     },
     {
        nameja:"東京大学総合図書館",
        namede:"Tokyo University Library"
     },
     {
        nameja:"東京国立博物館",
        namede:"Tokyo National Museum"
     },
     {
        nameja:"国立国会図書館",
        namede:"National Diet Library"
     },
     {
        nameja:"龍谷大学図書館",
        namede:"Ryukoku University Library"
     },
     {
        nameja:"新日本古典籍総合データベース",
        namede:"Database of Pre-Modern Japanese Works"
     },
     {
        nameja:" 北海道大学附属図書館",
        namede:"Hokkaido University Library"
     },
     {
        nameja:"江戸東京博物館",
        namede:"Edo-Tokyo Museum"
     },
     {
        nameja:"熊本市博物館",
        namede:"Kumamoto City Museum"
     },
     {
        nameja:"熊本大学附属図書館",
        namede:"Kumamoto University Library"
     },
     {
        nameja:" 大阪府立大学学術情報センター",
        namede:"Osaka Prefecture University Library"
     },
     {
        nameja:"函館市中央図書館",
        namede:"Hakone City Central Library"
     },
     {
        nameja:"熊本県立美術館",
        namede:"Kumamoto Prefectural Museum of Art"
     },
     {
        nameja:"奈良女子大学学術情報センター",
        namede:"Nara Women\\'s University Library"
     },
     {
        nameja:"同志社大学図書館",
        namede:"Doshisha University Library"
     },
     {
        nameja:"東京海洋大学附属図書館",
        namede:"Tokyo University of Marine Science and Technology Library"
     },
     {
        nameja:"龍谷大学附属図書館",
        namede:"Ryukoku University Library"
     },
     {
        nameja:"東京都立図書館",
        namede:"Tokyo Metropolitan Library"
     },
     {
        nameja:"個人蔵",
        namede:"In Privatbesitz"
     },
     {
        nameja:"関西大学図書館",
        namede:"Kansai University Library"
     },
     {
        nameja:"大阪府立中之島図書館",
        namede:"Osaka Prefectural Nakanoshima Library"
     },
     {
        nameja:"広島県立歴史博物館",
        namede:"Hiroshima Prefectural Museum of History"
     },
     {
        nameja:"神戸大学附属図書館",
        namede:"Kobe University Library"
     },
     {
        nameja:"慶應",
        namede:"Keio University Library"
     },
     {
        nameja:"大阪歴史博物館",
        namede:"Osaka Museum of History"
     },
     {
        nameja:"関西大学なにわ・大阪文化遺産学研究センター",
        namede:"Kansai University Research Center for Naniwa-Osaka Cultural Heritage Studies"
     },
     {
        nameja:"大阪大学附属図書館",
        namede:"Osaka University Library"
     },
     {
        nameja:"広島市竹原 春風館",
        namede:"Shunpukan, Takehara City"
     },
     {
        nameja:"清光山西厳寺",
        namede:"Saigonji (Nagano)"
     },
     {
        nameja:"柏崎ふるさと人物館",
        namede:"Kashiwazaki Furusato Jimbutsu Museum"
     },
     {
        nameja:"スウェーデン王立図書館",
        namede:"National Library of Sweden (Kungliga biblioteket)"
     },
     {
        nameja:"巻菱湖記念時代館",
        namede:"Maki Ryōko Memorial Museum"
     },
     {
        nameja:"東京都台東区 浅草寺",
        namede:"Sensōji, Taitōku, Tokyo"
     },
     {
        nameja:"静岡県立中央図書館",
        namede:"Shizuoka Prefecture Central Library"
     },
     {
        nameja:"京都大学貴重資料デジタルアーカイブ",
        namede:"Kyoto University Rare Materials Digital Archive"
     },
     {
        nameja:"関西学院大学図書館",
        namede:"Kansai Gakuin University Library"
     },
     {
        nameja:"中野三敏",
        namede:"Sammlung Nakano Mitsutoshi"
     },
     {
        nameja:"国文学研究資料館 鵜飼文庫",
        namede:"National Institute for Japanese Literature, Ugai Bunko"
     },
     {
        nameja:"広島県史跡",
        namede:"Hiroshima Prefecture Historic Site"
     },
     {
        nameja:"山陽記念文化財団",
        namede:"Rai Sanyo Commemorative cultural foundation"
     },
     {
        nameja:"日田市",
        namede:"Oita Prefecture Hita City"
     },
     {
        nameja:"奥の細道むすびの地記念館",
        namede:"Basho\\'s Oku no Hosomichi Haiku Journey Museum"
     },
     {
        nameja:"大和文華館",
        namede:"The Museum Yamato Bunkakan (Nara)"
     },
     {
        nameja:"岐阜県歴史資料館",
        namede:"Gifu Prefectural Archives"
     },
     {
        nameja:"国文学研究資料館 広瀬青邨文庫",
        namede:"National Institute for Japanese Literature, Hirose Seiton Bunko"
     },
     {
        nameja:"九州大学中央図書館 雅俗文庫",
        namede:"Gazoku bunko der Kyushu University Library (ehemals Sammlung Nakano Mitsutoshi)"
     },
     {
        nameja:"頼山陽旧跡保存会",
        namede:"Association for the Preservation of the Former Rai Sanyo Residence (Kyoto)"
     },
     {
        nameja:"静嘉堂文庫美術館",
        namede:"Seikado Bunko Art Museum"
     },
     {
        nameja:"復刻版",
        namede:"Faksimile-Ausgabe"
     },
     {
        nameja:"国際日本文化研究センター",
        namede:"International Research Center for Japanese Studies"
     },
     {
        nameja:"廣瀬資料館",
        namede:"Hirose Museum (Hita, Oita)"
     },
     {
        nameja:"高知城歴史博物館",
        namede:"Kochi Castle Museum of History"
     },
     {
        nameja:"筑波大学附属図書館",
        namede:"Tsukuba University Library"
     },
     {
        nameja:"華溪寺",
        namede:"Kakeiji (Ogaki, Gifu)"
     },
     {
        nameja:"神戸市立博物館",
        namede:"Kobe City Museum"
     },
     {
        nameja:"大垣市郷土館",
        namede:"Ogaki City Folk Museum"
     },
     {
        nameja:"一橋大学附属図書館",
        namede:"Hitosubashi University Library"
     }

    ]

    var institution:any = institutions.filter(element => value.includes(element.nameja));
    return institution[0]?.namede;
  }
}