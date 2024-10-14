import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEraja'
})
export class IsErajaPipe implements PipeTransform {

  digits:any = {
    '1':'一', 
    '2':'二', 
    '3':'三', 
    '4':'四', 
    '5':'五', 
    '6':'六', 
    '7':'七', 
    '8':'八', 
    '9':'九',
    '10':'十',
          };

    transform(value: any): string {

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
      let eraja:string = (value-(eraname[0]?.start-1)).toString()
//    console.log(value, eraname, eraname[0].nameja, eraname[0].start, eraja);
      return eraname[0]?.nameja + eraja.replace(/[\b10\b|\b0\b|\b1\b|\b2\b|\b3\b|\b4\b|\b5\b|\b6\b|\b7\b|8\b|\b9\b]/g, (c:any) => this.digits[c]);

    }
         
}
