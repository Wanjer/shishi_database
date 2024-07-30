import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthpipe'
})
export class MonthpipePipe implements PipeTransform {

  transform(value: any) {
    if(value.includes('01')){
      return 'Erster Monat';
    }
    else if(value.includes('02')){
      return 'Zweiter Monat';
    }
    else if(value.includes('03')){
      return 'Dritter Monat';
    }
    else if(value.includes('04')){
      return 'Vierter Monat';
    }
    else if(value.includes('05')){
      return 'Fünfter Monat';
    }
    else if(value.includes('06')){
      return 'Sechster Monat';
    }
    else if(value.includes('07')){
      return 'Siebter Monat';
    }
    else if(value.includes('08')){
      return 'Achter Monat';
    }
    else if(value.includes('09')){
      return 'Neunter Monat';
    }
    else if(value.includes('10')){
      return 'Zehnter Monat';
    }
    else if(value.includes('11')){
      return 'Elfter Monat';
    }
    else if(value.includes('12')){
      return 'Zwölfter Monat';
    }
    else{
      return '';
    }
    throw new Error("monthpipe conversion error");
  }

}
