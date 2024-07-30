import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isString'
})
export class IsStringPipe implements PipeTransform {

  transform(value:any) {
    //falsche methode zum prüfen ob es sich um string handelt?
    if(value instanceof String){
      return value.split(',')[0];
    }else{
      //to remove brackets (keyvaluepipe) and month/day info in issued-date, only leave year
    return JSON.stringify(value).split(',')[0].replace(/[\["\]]/g,'');
  }

  }

}
