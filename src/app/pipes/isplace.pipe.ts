import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isplace',
    standalone: true
})
export class IsplacePipe implements PipeTransform {

// prettier with dictionary
// placenames = [{nameja:'和泉郷', namede:'Mikawa no kuni, Izumi gō'}]
// for each placename of placenames
// if(value.includes(placename.nameja){
//  return placename.namede;}

  transform(value: string) {

let places = [
  {nameja:'和泉郷', namede: 'Mikawa no kuni, Izumi gō'},
  {nameja:'一乗寺村', namede: 'Kyōto, Ichijōjimura'},
   { nameja:'深草', namede: 'Fukakusa, Kyōto'},
   { nameja:'明石', namede: 'Akashi (Harima)'},
   { nameja:'京都', namede: 'Kyōto'},
   { nameja:'神田', namede: 'Kanda, Edo'},
   { nameja:'鶴崎', namede: 'Tsurusaki'},
   { nameja:'熊本', namede: 'Kumamoto'},
   { nameja:'江戸', namede: 'Edo'},
   { nameja:'和歌山', namede: 'Wakayama'},
   { nameja:'水戸藩', namede: 'Mito-Han'},
   { nameja:'新潟', namede: 'Niigata'},
   { nameja:'神辺', namede: 'Kannabe, Hiroshima'},
   { nameja:'大阪', namede: 'Ōsaka'},
   { nameja:'八幡町', namede: 'Yawatamachi, Ōmi'},
   { nameja:'白雲山寺', namede: 'Hakuunsan-ji, Kyo8to'},
   { nameja:'日田', namede: 'Hita, Bungo'},
   { nameja:'池田', namede: 'Ikeda, Izumi'},
   { nameja:'堺', namede: 'Sakai, Izumi'},
   { nameja:'曾根村', namede: 'Sone, Mino'},
   { nameja:'広島', namede: 'Hiroshima'},
   { nameja:'浅草', namede: 'Asakusa, Edo'},
   { nameja:'下谷', namede: 'Shitaya, Edo'},
]

var place:any = places.filter(element => value.includes(element.nameja));
return place[0]?.namede;

  }
}