import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEra'
})
export class IsEraPipe implements PipeTransform {


// rewrite with dictionary




// for each eraname in eranames
// if(value >= eraname.start && value < eraname.end){
//  return 'eraname.nameja' + (value-(eraname.start-1));}

  transform(value: any): any {

    let eranames = [
  {start: 1596, end: 1615, nameja: '慶長', namede: 'Keichō'},
  {start: 1615, end: 1624, nameja: '元和', namede: 'Genna'},
  {start: 1624, end: 1645, nameja: '寛永', namede: "Kan'ei"},
  {start: 1645, end: 1655, nameja: '正保', namede: "Shōhō"},
  {start: 1655, end: 1658, nameja: '慶安', namede: "Keian"},
  {start: 1658, end: 1661, nameja: '承応', namede: "Jōō"},
  {start: 1661, end: 1673, nameja: '明暦', namede: "Meireki"},
  {start: 1673, end: 1681, nameja: '万治', namede: "Manji"},
  {start: 1681, end: 1684, nameja: '寛文', namede: "Kanbun"},
  {start: 1684, end: 1688, nameja: '延宝', namede: "Enpō"},
  {start: 1688, end: 1704, nameja: '天和', namede: "Tenna"},
  {start: 1704, end: 1711, nameja: '貞享', namede: "Kyōwa"},
  {start: 1711, end: 1716, nameja: '元禄', namede: "Genroku"},
  {start: 1716, end: 1736, nameja: '宝永', namede: "Hōei"},
  {start: 1736, end: 1741, nameja: '正徳', namede: "Shōtoku"},
  {start: 1741, end: 1744, nameja: '享保', namede: "Kyōwa"},
  {start: 1744, end: 1748, nameja: '元文', namede: "Genbun"},
  {start: 1748, end: 1751, nameja: '寛保', namede: "Kanpō"},
  {start: 1751, end: 1764, nameja: '延享', namede: "Enkyō"},
  {start: 1764, end: 1772, nameja: '寛延', namede: "Kan'en"},
  {start: 1772, end: 1781, nameja: '宝暦', namede: "Hōreki"},
  {start: 1781, end: 1789, nameja: '明和', namede: "Meiwa"},
  {start: 1789, end: 1801, nameja: '安永', namede: "An'ei"},
  {start: 1801, end: 1804, nameja: '天明', namede: "Tenmei"},
  {start: 1804, end: 1818, nameja: '寛政', namede: "Kansei"},
  {start: 1818, end: 1831, nameja: '享和', namede: "Kyōwa"},
  {start: 1831, end: 1845, nameja: '文化', namede: "Bunka"},
  {start: 1845, end: 1848, nameja: '文政', namede: "Bunsei"},
  {start: 1848, end: 1855, nameja: '天保', namede: "Tenpō"},
  {start: 1855, end: 1860, nameja: '弘化', namede: "Kōka"},
  {start: 1860, end: 1861, nameja: '嘉永', namede: "Kaei"},
  {start: 1861, end: 1864, nameja: '安政', namede: "Ansei"},
  {start: 1864, end: 1865, nameja: '万延', namede: "Man'en"},
  {start: 1865, end: 1868, nameja: '文久', namede: "Bunkyū"},
  {start: 1865, end: 1868, nameja: '元治', namede: "Genji"},
  {start: 1865, end: 1868, nameja: '慶応', namede: "Keiō"}

];

var eraname:any = eranames.filter(({start, end}) => value >= start && value < end);
// console.log(value, eraname, eraname[0].namede, eraname[0].start, value-(eraname[0].start-1));
return  eraname[0]?.namede + " " + (value-(eraname[0]?.start-1))  + '<br>' + eraname[0]?.nameja;

/*
  eranames.forEach (function(eraname) {
 // if(value >= eraname.start && value < eraname.end){
  if(value > eraname.start){
  return eraname.nameja + (value-(eraname.start-1));}
  console.log(value, value > eraname.start, eraname.start, eraname.end, eraname, eraname.nameja);
  throw new Error("conversion error");
})
*/

/*
    if(value >= 1596 && value < 1615){
      return '慶長' + (value-1595);
    }
    else if(value >= 1615 && value < 1624){
      return '元和' + (value-1614);
    }
    else if(value >= 1624 && value < 1645){
      return '寛永' + (value-1623);
    }
    else if(value >= 1645 && value < 1648){
      return '正保' + (value-1644);
    }
    else if(value >= 1648 && value < 1652){
      return '慶安' + (value-1647);
    }
    else if(value >= 1652 && value < 1655){
      return '承応' + (value-1651);
    }
    else if(value >= 1655 && value < 1658){
      return '明暦' + (value-1654);
    }
    else if(value >= 1658 && value < 1661){
      return '万治' + (value-1657);
    }
    else if(value >= 1661 && value < 1673){
      return '寛文' + (value-1660);
    }
    else if(value >= 1673 && value < 1681){
      return '延宝' + (value-1672);
    }
    else if(value >= 1681 && value < 1684){
      return '天和' + (value-1680);
    }
    else if(value >= 1684 && value < 1688){
      return '貞享' + (value-1683);
    }
    else if(value >= 1688 && value < 1704){
      return '元禄' + (value-1687);
    }
    else if(value >= 1704 && value < 1711){
      return '宝永' + (value-1703);
    }
    else if(value >= 1711 && value < 1716){
      return '正徳' + (value-1710);
    }
    else if(value >= 1716 && value < 1736){
      return '享保' + (value-1715);
    }
    else if(value >= 1736 && value < 1741){
      return '元文' + (value-1735);
    }
    else if(value >= 1741 && value < 1744){
      return '寛保' + (value-1740);
    }
    else if(value >= 1744 && value < 1748){
      return '延享' + (value-1743);
    }
    else if(value >= 1748 && value < 1751){
      return '寛延' + (value-1747);
    }
    else if(value >= 1751 && value < 1764){
      return '宝暦' + (value-1750);
    }
    else if(value >= 1764 && value < 1772){
      return '明和' + (value-1763);
    }
    else if(value >= 1772 && value < 1781){
      return '安永' + (value-1771);
    }
    else if(value >= 1781 && value < 1789){
      return '天明' + (value-1780);
    }
    else if(value >= 1789 && value < 1801){
      return '寛政' + (value-1788);
    }
    else if(value >= 1801 && value < 1804){
      return '享和' + (value-1800);
    }
    else if(value >= 1804 && value < 1818){
      return '文化' + (value-1803);
    }
    else if(value >= 1818 && value < 1831){
      return '文政' + (value-1817);
    }
    else if(value >= 1831 && value < 1845){
      return '天保' + (value-1830);
    }
    else if(value >= 1845 && value < 1848){
      return '弘化' + (value-1844);
    }
    else if(value >= 1848 && value < 1855){
      return '嘉永' + (value-1847);
    }
    else if(value >= 1855 && value < 1860){
      return '安政' + (value-1854);
    }
    else if(value >= 1860 && value < 1861){
      return '万延' + (value-1859);
    }
    else if(value >= 1861 && value < 1864){
      return '文久' + (value-1860);
    }
    else if(value >= 1864 && value < 1865){
      return '元治' + (value-1863);
    }
    else if(value >= 1865 && value < 1868){
      return '慶応' + (value-1864);
    }
    throw new Error("conversion error");

    */
  }

}
