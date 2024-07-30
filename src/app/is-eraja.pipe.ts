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

    decimals:any = {
    '11':'十一', 
    '12':'十二', 
    '13':'十三', 
    '14':'十四', 
    '15':'十五', 
    '16':'十六', 
    '17':'十七', 
    '18':'十八', 
    '19':'十九',
    '20':'二十',
    '21':'二十一',
    '22':'二十二',
    '23':'二十三',
    '24':'二十四',
    '25':'二十五',
          };      

    transform(value: any): string {

        return value.replace(/[\b10\b|\b0\b|\b1\b|\b2\b|\b3\b|\b4\b|\b5\b|\b6\b|\b7\b|8\b|\b9\b]/g, (c:any) => this.digits[c]);

   /*   else if(value >= 2){
        return value.replace(/[10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25]/g, (c:any) => this.decimals[c]);
        }*/
    }
         
}
