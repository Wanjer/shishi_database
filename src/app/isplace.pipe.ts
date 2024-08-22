import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isplace'
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
   { nameja:'京都', namede: 'Kyōto'},
   { nameja:'神田', namede: 'Kanda, Edo'},
   { nameja:'豊後国鶴崎 (熊本藩領) ', namede: 'Tsuruzaki, Bungo (Kumamoto-Han)'},
   { nameja:'熊本', namede: 'Kumamoto'},
   { nameja:'江戸', namede: 'Edo'},
   { nameja:'和歌山', namede: 'Wakayama'},
   { nameja:'水戸藩', namede: 'Mito-Han'},
   { nameja:'新潟', namede: 'Niigata'},
   { nameja:'神辺', namede: 'Kannabe, Hiroshima'},
   { nameja:'大阪', namede: 'Ōsaka'},
   { nameja:'近江 八幡町', namede: 'Yawatamachi, Ōmi'},
   { nameja:'京都 白雲山寺', namede: 'Hakuunsan-ji, Kyo8to'},
   { nameja:'豊後国 日田', namede: 'Hita, Bungo'},
   { nameja:'和泉国 池田', namede: 'Ikeda, Izumi'},
   { nameja:'和泉国 堺', namede: 'Sakai, Izumi'},
   { nameja:'美濃国 曾根村', namede: 'Sone, Mino'},
   { nameja:'広島', namede: 'Hiroshima'},
   { nameja:'浅草', namede: 'Asakusa, Edo'},
   { nameja:'下谷', namede: 'Shitaya, Edo'},
]

var place:any = places.filter(element => value.includes(element.nameja));
return place.nameja;

  }
}

    /*
    if(value.includes('和泉郷')){
      return 'Mikawa no kuni, Izumi gō';
    }
    else if(value.includes('一乗寺村')){
      return 'Kyōto, Ichijōjimura';
    }
    else if(value.includes('深草')){
      return 'Fukakusa, Kyōto';
    }
    else if(value.includes('京都')){
      return 'Kyōto';
    }
    else if(value.includes('神田')){
      return 'Kanda, Edo';
    }
    else if(value.includes('豊後国鶴崎 (熊本藩領) ')){
      return 'Tsuruzaki, Bungo (Kumamoto-Han)';
    }
    else if(value.includes('熊本')){
      return 'Kumamoto';
    }
    else if(value.includes('江戸')){
      return 'Edo';
    }
    else if(value.includes('和歌山')){
      return 'Wakayama';
    }
    else if(value.includes('水戸藩')){
      return 'Mito-Han';
    }
    else if(value.includes('新潟')){
      return 'Niigata';
    }
    else if(value.includes('神辺')){
      return 'Kannabe, Hiroshima';
    }
    else if(value.includes('大阪')){
      return 'Ōsaka';
    }
    else if(value.includes('近江 八幡町')){
      return 'Yawatamachi, Ōmi';
    }
    else if(value.includes('京都 白雲山寺')){
      return 'Hakuunsan-ji, Kyo8to';
    }
    else if(value.includes('豊後国 日田')){
      return 'Hita, Bungo';
    }
    else if(value.includes('和泉国 池田')){
      return 'Ikeda, Izumi';
    }
    else if(value.includes('和泉国 堺')){
      return 'Sakai, Izumi';
    }
    else if(value.includes('美濃国 曾根村')){
      return 'Sone, Mino';
    }
    else if(value.includes('広島')){
      return 'Hiroshima';
    }
    else if(value.includes('浅草')){
      return 'Asakusa, Edo';
    }
    else if(value.includes('下谷')){
      return 'Shitaya, Edo';
    }
    else if(value.includes('')){
      return '';
    }
    else{
      return '';
    }
    throw new Error("monthpipe conversion error");
  }
  */