import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'islatin',
    standalone: true
})
export class IslatinPipe implements PipeTransform {

  transform(value: string){
    if(value !== undefined && value.length && /[a-zäöüß]/i.test(value)){
      // alternatives
      // set of ascii characters and german umlaut as regex /[^\u0000-\u007f][^\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]/.test(JSON.stringify(value))
      // .match(/[a-z][öäü?]/i) match returns empty array equivalent to false
      return true;
    }else{
      return false;
      }
  }
}
