import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthpipejp'
})
export class MonthpipejpPipe implements PipeTransform {

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
    return month[0]?.monthja;

  }
}


/*
    if(value.includes('01')){
      return '一月';
    }
    else if(value.includes('02')){
      return '二月';
    }
    else if(value.includes('03')){
      return '三月';
    }
    else if(value.includes('04')){
      return '四月';
    }
    else if(value.includes('05')){
      return '五月';
    }
    else if(value.includes('06')){
      return '六月';
    }
    else if(value.includes('07')){
      return '七月';
    }
    else if(value.includes('08')){
      return '八月';
    }
    else if(value.includes('09')){
      return '九月';
    }
    else if(value.includes('10')){
      return '十月';
    }
    else if(value.includes('11')){
      return '十一月';
    }
    else if(value.includes('12')){
      return '十二月';
    }
    else{
      return '';
    }
    throw new Error("monthpipejp conversion error");
  }
*/