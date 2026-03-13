import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitFirst',
    standalone: true
})
export class splitFirst implements PipeTransform {

  transform(value:any) {

    if(!value || value === ''){
      return false;
    }
    else if(value instanceof String){
      return value.split(',');
    }else{
      //to remove brackets (keyvaluepipe) and month/day info in issued-date, only leave year
    return JSON.stringify(value).split(',')[0].replace(/[\["\]]/g,'');
  }

  }

}
