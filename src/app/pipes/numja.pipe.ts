import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numja',
    standalone: true
})
export class NumjaPipe implements PipeTransform {
  transform(value: string): string {

     let daterange_suffixes = [
      {
        keyword: 'before',
        trnsl_de: 'Vor',
        trnsl_ja: '以前'
      },
      {
        keyword: 'after',
        trnsl_de: 'Nach',
        trnsl_ja: '以後',
      },
      {
        keyword: 'circa',
        trnsl_de: 'Um',
        trnsl_ja: '前後',
      },
      {
        keyword: 'to',
        trnsl_de: 'Zwischen_und',
        trnsl_ja: 'より_まで',
      },
      {
        keyword: 'early',
        trnsl_de: 'Frühes',
        trnsl_ja: '初期',
      },
      {
        keyword: 'middle',
        trnsl_de: 'Mittleres',
        trnsl_ja: '中期',
      },
      {
        keyword: 'late',
        trnsl_de: 'Spätes',
        trnsl_ja: '後期',
      }
    ]

    let centuries = [
        {
        keyword: '1200-to1300',
        trnsl_de: '13. Jahrhundert',
        trnsl_ja: '13世紀',
      },
      {
        keyword: '1600-to1700',
        trnsl_de: '17. Jahrhundert',
        trnsl_ja: '17世紀',
      },
      {
        keyword: '1600-to1650',
        trnsl_de: 'Erste Hälfte des 17. Jahrhundert',
        trnsl_ja: '17世紀前半',
      },
      {
        keyword: '1650-to1700',
        trnsl_de: 'Zweite Hälfte des 17. Jahrhundert',
        trnsl_ja: '17世紀前半',
      },
      {
        keyword: '1700-to1800',
        trnsl_de: '18. Jahrhundert',
        trnsl_ja: '18世紀',
      },
      {
        keyword: '1700-to1750',
        trnsl_de: 'Erste Hälfte des 18. Jahrhundert',
        trnsl_ja: '17世紀前半',
      },
      {
        keyword: '1750-to1800',
        trnsl_de: 'Zweite Hälfte des 18. Jahrhundert',
        trnsl_ja: '17世紀前半',
      },
      {
        keyword: '1800-to1900',
        trnsl_de: '19. Jahrhundert',
        trnsl_ja: '19世紀',
      },
      {
        keyword: '1800-to1850',
        trnsl_de: 'Erste Hälfte des 19. Jahrhundert',
        trnsl_ja: '17世紀前半',
      },
      {
        keyword: '1850-to1900',
        trnsl_de: 'Zweite Hälfte des 19. Jahrhundert',
        trnsl_ja: '17世紀前半',
      },
    ]

    let digits:any = {
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
    // '10':'十'
          };

    var result:string

    if(value == '' && daterange_suffixes.some(suffix => value.includes(suffix.keyword))){
    
    var year = value.split('-')[0]
    var suffix = daterange_suffixes.filter((sf) => sf.keyword.includes(value))[0]

    if(suffix.keyword == 'before' || 'after' || 'circa'){
          result = suffix.trnsl_de + year
    }else if(suffix.keyword == 'to'){
          result = suffix.trnsl_de.split('_')[0] + year + suffix.trnsl_de.split('_')[1] + value.split('-to')[1]
    }else if(suffix.keyword == 'early' || 'middle' || 'late'){
          result = suffix.trnsl_de + centuries.filter((ct) => ct.keyword == value.split('-')[0])[0].trnsl_de
    }else{
           result = value
           console.log('error daterange conversion')
    }
    }else{
      result = value
    }
  return result.replace(/[\b0\b|\b1\b|\b2\b|\b3\b|\b4\b|\b5\b|\b6\b|\b7\b|8\b|\b9\b]/g, (c) => digits[c]);
  
  }
}
