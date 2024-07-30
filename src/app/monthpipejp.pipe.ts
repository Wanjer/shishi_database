import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthpipejp'
})
export class MonthpipejpPipe implements PipeTransform {

  transform(value: any) {
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

}
