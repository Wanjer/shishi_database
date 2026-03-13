import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'isinst',
   standalone: true
})
export class IsinstPipe implements PipeTransform {

   transform(value: string) {

      let institutions = [
         {
            nameja: "茨城県立歴史館",
            namede: "Ibaraki Prefectural History Museum"
         },
         {
            nameja: "国文学研究資料館 日本漢詩文集コレクション",
            namede: "National Institute for Japanese Literature, Nihon Kanshibun shū Collection"
         },
         {
            nameja: "国文学研究資料館 広瀬青邨文庫",
            namede: "National Institute for Japanese Literature, Hirose Seiton Bunko"
         },
         {
            nameja: "国文学研究資料館 鵜飼文庫",
            namede: "National Institute for Japanese Literature, Ugai Bunko"
         },
         {
            nameja: "国文学研究資料館",
            namede: "National Institute for Japanese Literature"
         },
         {
            nameja: "宮内庁書陵部",
            namede: "Imperial Household Agency, Archives and Mausolea Department"
         },
         {
            nameja: "福井市立図書館",
            namede: "Fukui Municipal Library"
         },
         {
            nameja: "新潟大学附属図書館 佐野文庫",
            namede: "Sano Bunko, Niigata University Library"
         },
         {
            nameja: "東京芸術大学",
            namede: "Tokyo University of the Arts"
         },
         {
            nameja: "東京藝術大学附属図書館",
            namede: "Tokyo University of the Arts"
         },
         {
            nameja: "東京藝術大学附属図書館 脇本文庫",
            namede: "Tokyo University of the Arts - Wakimoto bunko"
         },
         {
            nameja: "金沢市立玉川図書館 蒼龍館文庫",
            namede: "Stadtbibliothek Tawagawa (Kanazawa), Sōryō bunko"
         },
         {
            nameja: "お茶の水女子大学図書館",
            namede: "Ocha-no-mizu University Library"
         },
         {
            nameja: "早稲田大学図書館",
            namede: "Waseda University Library"
         },
         {
            nameja: "名古屋大学附属図書館",
            namede: "Nagoya University Library"
         },
         {
            nameja: "愛媛大学図書館",
            namede: "Ehime University Library"
         },
         {
            nameja: "歴彩館",
            namede: "Kyoto Furitsu Kyotogaku Rekisaikan"
         },
         {
            nameja: "国立公文書館デジタルアーカイブ",
            namede: "National Archives of Japan Digital Archive"
         },
         {
            nameja: "国立公文書館",
            namede: "National Archives of Japan"
         },
         {
            nameja: "詩仙堂丈山寺",
            namede: "Shisendō Jōzanji"
         },
         {
            nameja: "安城市埋蔵文化財センター",
            namede: "Anjo City Archeological Research Center"
         },
         {
            nameja: "東北大学附属図書館",
            namede: "Tohoku University Library"
         },
         {
            nameja: "小泉吉永",
            namede: "Koizumi Yoshinaga Collection"
         },
         {
            nameja: "大正大学図書館",
            namede: "Taisho University Library"
         },
         {
            nameja: "東洋大学附属図書館 哲学堂文庫",
            namede: "Toyo University Library"
         },
         {
            nameja: "和歌山県立博物館",
            namede: "Wakayama Prefectural Museum"
         },
         {
            nameja: "和歌山市立博物館",
            namede: "Wakayama City Museum"
         },
         {
            nameja: "東京大学総合図書館",
            namede: "Tokyo University Library"
         },
         {
            nameja: "東京国立博物館",
            namede: "Tokyo National Museum"
         },
         {
            nameja: "国立国会図書館",
            namede: "National Diet Library"
         },
         {
            nameja: "龍谷大学図書館",
            namede: "Ryukoku University Library"
         },
         {
            nameja: "新日本古典籍総合データベース",
            namede: "Database of Pre-Modern Japanese Works"
         },
         {
            nameja: "北海道大学附属図書館",
            namede: "Hokkaido University Library"
         },
         {
            nameja: "江戸東京博物館",
            namede: "Edo-Tokyo Museum"
         },
         {
            nameja: "熊本市博物館",
            namede: "Kumamoto City Museum"
         },
         {
            nameja: "熊本大学附属図書館",
            namede: "Kumamoto University Library"
         },
         {
            nameja: "大阪府立大学学術情報センター",
            namede: "Osaka Prefecture University Library"
         },
         {
            nameja: "函館市中央図書館",
            namede: "Hakone City Central Library"
         },
         {
            nameja: "熊本県立美術館",
            namede: "Kumamoto Prefectural Museum of Art"
         },
         {
            nameja: "奈良女子大学学術情報センター",
            namede: "Nara Women\\'s University Library"
         },
         {
            nameja: "同志社大学図書館",
            namede: "Doshisha University Library"
         },
         {
            nameja: "東京海洋大学附属図書館",
            namede: "Tokyo University of Marine Science and Technology Library"
         },
         {
            nameja: "龍谷大学附属図書館",
            namede: "Ryukoku University Library"
         },
         {
            nameja: "東京都立図書館",
            namede: "Tokyo Metropolitan Library"
         },
         {
            nameja: "個人蔵",
            namede: "In Privatbesitz"
         },
         {
            nameja: "関西大学図書館",
            namede: "Kansai University Library"
         },
         {
            nameja: "大阪府立中之島図書館",
            namede: "Osaka Prefectural Nakanoshima Library"
         },
         {
            nameja: "広島県立歴史博物館",
            namede: "Hiroshima Prefectural Museum of History"
         },
         {
            nameja: "神戸大学附属図書館",
            namede: "Kobe University Library"
         },
         {
            nameja: "慶應",
            namede: "Keio University Library"
         },
         {
            nameja: "大阪歴史博物館",
            namede: "Osaka Museum of History"
         },
         {
            nameja: "関西大学なにわ・大阪文化遺産学研究センター",
            namede: "Kansai University Research Center for Naniwa-Osaka Cultural Heritage Studies"
         },
         {
            nameja: "大阪大学附属図書館",
            namede: "Osaka University Library"
         },
         {
            nameja: "広島市竹原 春風館",
            namede: "Shunpukan, Takehara City"
         },
         {
            nameja: "清光山西厳寺",
            namede: "Saigonji (Nagano)"
         },
         {
            nameja: "柏崎ふるさと人物館",
            namede: "Kashiwazaki Furusato Jimbutsu Museum"
         },
         {
            nameja: "スウェーデン王立図書館",
            namede: "National Library of Sweden (Kungliga biblioteket)"
         },
         {
            nameja: "巻菱湖記念時代館",
            namede: "Maki Ryōko Memorial Museum"
         },
         {
            nameja: "東京都台東区 浅草寺",
            namede: "Sensōji, Taitōku, Tokyo"
         },
         {
            nameja: "静岡県立中央図書館",
            namede: "Shizuoka Prefecture Central Library"
         },
         {
            nameja: "京都大学貴重資料デジタルアーカイブ",
            namede: "Kyoto University Rare Materials Digital Archive"
         },
         {
            nameja: "京都大学附属図書館",
            namede: "Kyoto University Library"
         },
         {
            nameja: "関西学院大学図書館",
            namede: "Kansai Gakuin University Library"
         },
         {
            nameja: "中野三敏",
            namede: "Sammlung Nakano Mitsutoshi"
         },
         {
            nameja: "広島県史跡",
            namede: "Hiroshima Prefecture Historic Site"
         },
         {
            nameja: "山陽記念文化財団",
            namede: "Rai Sanyo Commemorative cultural foundation"
         },
         {
            nameja: "日田市",
            namede: "Oita Prefecture Hita City"
         },
         {
            nameja: "奥の細道むすびの地記念館",
            namede: "Basho's Oku no Hosomichi Haiku Journey Museum"
         },
         {
            nameja: "大和文華館",
            namede: "The Museum Yamato Bunkakan (Nara)"
         },
         {
            nameja: "岐阜県歴史資料館",
            namede: "Gifu Prefectural Archives"
         },
         {
            nameja: "九州大学中央図書館 雅俗文庫",
            namede: "Gazoku bunko der Kyushu University Library (ehemals Sammlung Nakano Mitsutoshi)"
         },
         {
            nameja: "頼山陽旧跡保存会",
            namede: "Association for the Preservation of the Former Rai Sanyo Residence (Kyoto)"
         },
         {
            nameja: "静嘉堂文庫美術館",
            namede: "Seikado Bunko Art Museum"
         },
         {
            nameja: "復刻版",
            namede: "Faksimile-Ausgabe"
         },
         {
            nameja: "国際日本文化研究センター",
            namede: "International Research Center for Japanese Studies"
         },
         {
            nameja: "廣瀬資料館",
            namede: "Hirose Museum (Hita, Oita)"
         },
         {
            nameja: "高知城歴史博物館",
            namede: "Kochi Castle Museum of History"
         },
         {
            nameja: "筑波大学附属図書館",
            namede: "Tsukuba University Library"
         },
         {
            nameja: "華溪寺",
            namede: "Kakeiji (Ogaki, Gifu)"
         },
         {
            nameja: "神戸市立博物館",
            namede: "Kobe City Museum"
         },
         {
            nameja: "大垣市郷土館",
            namede: "Ogaki City Folk Museum"
         },
         {
            nameja: "一橋大学附属図書館",
            namede: "Hitosubashi University Library"
         },
         {
            nameja: "徳川美術館",
            namede: "Tokugawa Museum of Art"
         },
         {
            nameja: "文化遺産オンライン",
            namede: "Digital Heritage Online"
         },
         {
            nameja: "堺市博物館",
            namede: "Sakai City Museum"
         },
         {
            nameja: "彦根城博物館",
            namede: "Hikone Castle Museum"
         },
         {
            nameja: "茶道資料館",
            namede: "Chado Research Center"
         },
         {
            nameja: "水瀬神宮",
            namede: "Minase Jingu"
         },
         {
            nameja: "大覚寺",
            namede: "Daikaku-ji"
         },
         {
            nameja: "宝亀院",
            namede: "Hōki-in"
         },
         {
            nameja: "高野山霊宝館",
            namede: "Kōyasan Reihōkan"
         },
         {
            nameja: "厳島神社",
            namede: "Itsukushima Jinja"
         },
         {
            nameja: "京都国立博物館",
            namede: "Kyōto National Museum"
         },
         {
            nameja: "南禅寺",
            namede: "Nanzen-ji"
         },
         {
            nameja: "群馬県立近大美術館",
            namede: "Gunma Prefectural Museum of Art"
         },
         {
            nameja: "香雪美術館",
            namede: "Kosetsu Museum of Art"
         },
         {
            nameja: "妙心寺",
            namede: "Myōshin-ji"
         },
         {
            nameja: "宝厳寺",
            namede: "Hōgen-ji"
         },
         {
            nameja: "東寺",
            namede: "Tōji"
         },
         {
            nameja: "瑞光山 清水寺",
            namede: "Zuikō-ji"
         },
         {
            nameja: "豊国神社",
            namede: "Hōkoku Jinja"
         },
         {
            nameja: "アート情報総合サイト 京都で遊ぼう",
            namede: "Art - Kyōto de asobō"
         },
         {
            nameja: "ウェルビーイング活動・京都",
            namede: "Wellbeing Kyōto"
         },
         {
            nameja: "MOA美術館",
            namede: "MOA Museum of Art"
         },
         {
            nameja: "サントリー美術館",
            namede: "Suntory Museum of Art"
         },
         {
            nameja: "福岡市美術館",
            namede: "Fukuoka Art Museum"
         },
         {
            nameja: "九州国立博物館",
            namede: "Kyūshū National Museum"
         },
         {
            nameja: "南蛮文化館",
            namede: "Museum of Namban Art"
         },
         {
            nameja: "文化庁",
            namede: "Agency for Cultural Affairs"
         },
         {
            nameja: "皇居三の丸尚蔵館",
            namede: "The Museum of Imperial Collections - Sannomaru Shōzōkan"
         },
         {
            nameja: "北野天満宮",
            namede: "Kitano Tenmangū"
         },
         {
            nameja: "和泉市久保惣記念美術館",
            namede: "Kubosō Memorial Museum of Art "
         },
         {
            nameja: "メトロポリタン美術館",
            namede: "Metropolitan Museum of Art"
         },
         {
            nameja: "名古屋城",
            namede: "Nagoya Castle"
         },
         {
            nameja: "龍光院",
            namede: "Ryūkō-in"
         },
         {
            nameja: "瑞龍寺",
            namede: "Zuiryū-ji"
         },
         {
            nameja: "大養寺",
            namede: "Daiyō-ji"
         },
         {
            nameja: "梅沢記念館",
            namede: "Umezawa Memorial Museum"
         },
         {
            nameja: "畠山記念館",
            namede: "Ebara Hatakeyama Memorial Museum"
         },
         {
            nameja: "永青文庫",
            namede: "Eisei Bunko"
         },
         {
            nameja: "本法寺",
            namede: "Honpō-ji"
         },
         {
            nameja: "三井記念美術館",
            namede: "Mitsui Memorial Museum"
         },
         {
            nameja: "広島県立美術館",
            namede: "Hiroshima Prefectural Museum of Art"
         },
         {
            nameja: "北村美術館",
            namede: "Kitamura Museum"
         },
         {
            nameja: "JFR史料館",
            namede: "J. Front Retailing Archives"
         },
         {
            nameja: "イル ジェズー聖堂",
            namede: "Il Gesù"
         },
         {
            nameja: "国立歴史民俗博物館",
            namede: "National Museum of Japanese History"
         },
         {
            nameja: "出光美術館",
            namede: "Idemitsu Museum of Art"
         },
         {
            nameja: "建仁寺",
            namede: "Kennin-ji"
         },
         {
            nameja: "醍醐寺",
            namede: "Daigo-ji"
         },
         {
            nameja: "フリーア美術館",
            namede: "Freer Gallery of Art"
         },
         {
            nameja: "石川県立美術館",
            namede: "Ishikawa Prefectural Museum of Art"
         },
         {
            nameja: "株式会社京都春秋",
            namede: "Kyōto Shunjū"
         },
         {
            nameja: "角屋保存会",
            namede: "Sumiya Preservation Societry"
         },
         {
            nameja: "埼玉県立歴史と民俗の博物館",
            namede: "Saitama Prefectural Museum of History and Folklore"
         },
         {
            nameja: "一乗寺",
            namede: "Ichijō-ji"
         },
         {
            nameja: "アルカンシェール美術財団",
            namede: "Hara Museum"
         },
         {
            nameja: "光明禅寺",
            namede: "Kōmyō Zenji"
         },
         {
            nameja: "正明寺",
            namede: "Shōmyō-ji"
         },
         {
            nameja: "相国寺",
            namede: "Shōkoku-ji"
         },
         {
            nameja: "滋賀県",
            namede: "Shiga Prefecture"
         },
         {
            nameja: "駒澤大学禅文化歴史博物館",
            namede: "Komazawa University Museum of Zen Culture"
         },
         {
            nameja: "サンリツ服部美術館",
            namede: "Sanritz Hattori Museum of Arts"
         },
         {
            nameja: "奈良県 文化財課・文化財保存事務所",
            namede: "Cultural Property Department, Nara Prefecture"
         },
         {
            nameja: "福井県立美術館",
            namede: "Fukui Prefectural Museum of Art"
         },
         {
            nameja: "随心院",
            namede: "Zuishi-in"
         },
         {
            nameja: "大猷院",
            namede: "Daiyū-in"
         },
         {
            nameja: "万福寺",
            namede: "Manpuku-ji"
         },
         {
            nameja: "富山県 高岡市",
            namede: "Takaoka, Toyama Prefecture"
         },
         {
            nameja: "西本願寺",
            namede: "Nishi Hongwan-ji"
         },
         {
            nameja: "Wikimedia Commons",
            namede: "Wikimedia Commons"
         },
         {
            nameja: "大阪城公園",
            namede: "Ōsaka Castle Park"
         },
         {
            nameja: "徴古館",
            namede: "Bikokan"
         },
         {
            nameja: "南禅寺",
            namede: "Nanzen-ji"
         },
         {
            nameja: "養源院",
            namede: "Yōgen-in"
         },
         {
            nameja: "頂妙寺",
            namede: "Chōmyō-ji"
         },
         {
            nameja: "清水寺",
            namede: "Kiyomizu-dera"
         },
         {
            nameja: "東京文化財研究所",
            namede: "Tokyo National Research Institute for Cultural Properties"
         },
         {
            nameja: "大徳寺",
            namede: "Daitoku-ji"
         },
         {
            nameja: "一条恵観山荘",
            namede: "Ichijō Ekan-sō"
         },
         {
            nameja: "専修大学",
            namede: "Senshū University"
         },
         {
            nameja: "金沢ミュージアム",
            namede: "Kanazawa Museum"
         },
         {
            nameja: "金沢市中村記念館",
            namede: "Nakamura Memorial Museum, Kanazawa"
         },
         {
            nameja: "真正極楽寺",
            namede: "Shinshō Gokuraku-ji"
         },
         {
            nameja: "幽玄斎美術館",
            namede: "Yūgensai Museum of Art"
         },
         {
            nameja: "寛永寺",
            namede: "Kan'ei-ji"
         },
         {
            nameja: "善光寺",
            namede: "Zenkō-ji"
         },
         {
            nameja: "林丘寺",
            namede: "Rinkyū-ji"
         },
         {
            nameja: "長雲寺",
            namede: "Chōun-ji"
         },
         {
            nameja: "増上寺",
            namede: "Zōjō-ji"
         },
         {
            nameja: "広島県",
            namede: "Hiroshima Prefecture"
         },
         {
            nameja: "港区立郷土歴史館",
            namede: "Minato City Local History Museum"
         },
         {
            nameja: "鎌倉国宝館所蔵",
            namede: "Kamakura Museum of National Treasures"
         },
         {
            nameja: "世田谷デジタルミュージアム",
            namede: "Setagaya Digital Museum"
         },
         {
            nameja: "佐賀県立九州陶磁文化館",
            namede: "Kyushu Ceramic Museum"
         },
         {
            nameja: "京都市文化観光資源保護財団",
            namede: "Kyōto City Foundation for the Preservation of Cultural and Touristic Assets"
         },
         {
            nameja: "友禅史会",
            namede: "Society for Yūzen History"
         },
         {
            nameja: "東京藝術大学附属図書館",
            namede: "Tōkyō University of the Arts Library"
         },
         {
            nameja: "五百羅漢寺",
            namede: "Gohyaku Rakan-ji"
         },
         {
            nameja: "成田山書道美術館",
            namede: "Naritayama Museum of Calligraphy"
         },
         {
            nameja: "藤田美術館",
            namede: "Fujita Museum of Art"
         },
         {
            nameja: "根津美術館",
            namede: "Nezu Museum of Art"
         },
         {
            nameja: "荏原 畠山美術館",
            namede: "Ebara Hatakeyama Museum of Art"
         },
         {
            nameja: "遠山記念館",
            namede: "Tōyama Memorial Museum"
         },
         {
            nameja: "西大寺",
            namede: "Saidai-ji"
         },
         {
            nameja: "泉屋博古館",
            namede: "Sen'oku Hakukokan"
         },
         {
            nameja: "福岡市博物館",
            namede: "Fukuoka City Museum"
         },
         {
            nameja: "敦井美術館",
            namede: "Atsui Museum of Art"
         },
         {
            nameja: "ホノルル美術館",
            namede: "Honolulu Museum of Art"
         },
         {
            nameja: "黒川古文化研究所",
            namede: "Kurokawa Institute of Ancient Cultures"
         },
         {
            nameja: "林原美術館",
            namede: "Hayashibara Museum of Art"
         },
         {
            nameja: "立本寺",
            namede: "Ryūhon-ji"
         },
         {
            nameja: "福田美術館",
            namede: "Fukuda Museum of Art"
         },
         {
            nameja: "ボストン美術館",
            namede: "MFA Boston"
         },
         {
            nameja: "島根県立美術館",
            namede: "Shimane Prefectural Museum of Art"
         },
         {
            nameja: "大樹寺",
            namede: "Daiju-ji"
         },
         {
            nameja: "東京富士美術館",
            namede: "Tōkyō Fuji Museum of Art"
         },
         {
            nameja: "名古屋市立博物館",
            namede: "Nagoya City Museum"
         },
         {
            nameja: "橿原神宮",
            namede: "Kashihara Jingū"
         },
         {
            nameja: "福富太郎コレクション",
            namede: "Fukutomi Tarō Collection"
         },
         {
            nameja: "琴平町観光協会",
            namede: "Kotohira Tourism Association"
         },
         {
            nameja: "寧樂美術館",
            namede: "Neiraku Museum of Art"
         },
         {
            nameja: "ギターコレクション",
            namede: "Gitter-Yelen Collection"
         },
         {
            nameja: "川端康成記念館",
            namede: "Kawabata Yasunari Memorial Museum"
         },
         {
            nameja: "田原市博物館",
            namede: "Harada City Museum"
         },
         {
            nameja: "無窮会神習文庫",
            namede: "Mukyūkai Shinshū Bunko"
         },
         {
            nameja: "知恩院",
            namede: "Chion-in"
         },
         {
            nameja: "海津天神社",
            namede: "Kaizu Tenjinsha"
         },
         {
            nameja: "元離宮二条城",
            namede: "Former Imperial Villa Nijo-jo Castle"
         },
         {
            nameja: "千葉市立美術館",
            namede: "Chiba Prefectural Museum of Arts"
         },
         {
            nameja: "浅草寺",
            namede: "Sensō-ji"
         },
         {
            nameja: "熊本県",
            namede: "Kumamoto Prefecture"
         },
         {
            nameja: "崋山会",
            namede: "Watanabe Kazan Society"
         },
         {
            nameja: "王子稲荷神社",
            namede: "Ōji Inari Jinja"
         },
         {
            nameja: "裏千家",
            namede: "Urasenke"
         },
         {
            nameja: "e國宝",
            namede: "eMuseum"
         },
         {
            nameja: "花園神社",
            namede: "Hanazono Jinja"
         },
         {
            nameja: "new",
            namede: "new"
         }
      ]

      var institution: any = institutions.find(element => value.includes(element.nameja));

      if (institution) {
         return institution.namede
      } else {
         return value
      }
   }
}