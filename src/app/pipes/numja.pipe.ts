import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numja'
})
export class NumjaPipe implements PipeTransform {
  
  // pipe without 十 for notification of years in Gregorian format

  digits:any = {
    '0':'〇',
    '1':'一', 
    '2':'二', 
    '3':'三', 
    '4':'四', 
    '5':'五', 
    '6':'六', 
    '7':'七', 
    '8':'八', 
    '9':'九',
    '10':'十'
          };


  transform(value: any): string {


  return value.replace(/[\b10\b|\b0\b|\b1\b|\b2\b|\b3\b|\b4\b|\b5\b|\b6\b|\b7\b|8\b|\b9\b]/g, (c:any) => this.digits[c]);
  }
}
