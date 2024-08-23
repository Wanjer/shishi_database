import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthpipe'
})
export class MonthpipePipe implements PipeTransform {

  transform(value: any) {
    
    let months = [
      {monthnumerical:'01', monthde: 'Erster Monat', monthja: '一月'},
      {monthnumerical:'02', monthde: 'Zweiter Monat', monthja: '二月'},
      {monthnumerical:'03', monthde: 'Dritter Monat', monthja: '三月'},
      {monthnumerical:'04', monthde: 'Vierter Monat', monthja: '四月'},
      {monthnumerical:'05', monthde: 'Fünfter Monat', monthja: '五月'},
      {monthnumerical:'06', monthde: 'Sechster Monat', monthja: '六月'},
      {monthnumerical:'07', monthde: 'Siebter Monat', monthja: '七月'},
      {monthnumerical:'08', monthde: 'Achter Monat', monthja: '八月'},
      {monthnumerical:'09', monthde: 'Neunter Monat', monthja: '九月'},
      {monthnumerical:'10', monthde: 'Zehnter Monat', monthja: '十月'},
      {monthnumerical:'11', monthde: 'Elfter Monat', monthja: '十一月'},
      {monthnumerical:'12', monthde: 'Zwölfter Monat', monthja: '十二月'}
    ]

    var month:any = months.filter(element => value.includes(element.monthnumerical));
    return month[0]?.monthde;
    
  }
}
