import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daterange',
  standalone: true
})
export class DaterangePipe implements PipeTransform {
  transform(value: Array<string>) {

    let daterange_suffixes = [
      {
        keyword: 'before',
        date_de: 'Vor',
        date_ja: '以前'
      },
      {
        keyword: 'after',
        date_de: 'Nach',
        date_ja: '以後'
      },
      {
        keyword: 'circa',
        date_de: 'Ca.',
        date_ja: '前後'
      },
      {
        keyword: 'early',
        date_de: 'Frühes',
        date_ja: '初期'
      },
      {
        keyword: 'middle',
        date_de: 'Mittleres',
        date_ja: '中期'
      },
      {
        keyword: 'late',
        date_de: 'Spätes',
        date_ja: '後期'
      }
    ]

    let centuries = [
      {
        keyword: '1600',
        date_de: '17. Jahrhundert',
        date_ja: '17世紀',
      },
      {
        keyword: '1650',
        date_de: '17. Jahrhundert',
        date_ja: '17世紀',
      },
      {
        keyword: '1700',
        date_de: '18. Jahrhundert',
        date_ja: '18世紀',
      },
      {
        keyword: '1750',
        date_de: '18. Jahrhundert',
        date_ja: '18世紀',
      },
      {
        keyword: '1800',
        date_de: '19. Jahrhundert',
        date_ja: '19世紀',
      },
      {
        keyword: '1850',
        date_de: '19. Jahrhundert',
        date_ja: '19世紀',
      }
    ]

    let intervall = [
      {
        keyword: '1600_to1650',
        date_de: 'Erste Hälfte 17. Jahrhundert',
        date_ja: '17世紀前半',
      },
      {
        keyword: '1650_to1700',
        date_de: 'Zweite Hälfte 17. Jahrhundert',
        date_ja: '17世紀後半',
      },
      {
        keyword: '1700_to1750',
        date_de: 'Erste Hälfte 18. Jahrhundert',
        date_ja: '18世紀前半',
      },
      {
        keyword: '1750_to1800',
        date_de: 'Zweite Hälfte 18. Jahrhundert',
        date_ja: '18世紀後半',
      },
      {
        keyword: '1800_to1850',
        date_de: 'Erste Hälfte 19. Jahrhundert',
        date_ja: '19世紀前半',
      },
      {
        keyword: '1850_to1900',
        date_de: 'Zweite Hälfte 19. Jahrhundert',
        date_ja: '19世紀後半',
      }
    ]

    // 1650-middle
    // todo 1650-middle-to1700-early
    // 1650-middle "bis" 1700-early
    // 
    // Mittleres 17. Jahrhundert bis frühes 18. Jahrhundert

    var datestring = value.toString()
    var date_de: string
    var date_ja: string
    var result = {}

    function suffix_replace(input: string) {
      var year = input.split("-")[0]
      var suffix = input.split("-")[1]
      if(suffix !== undefined){
      var suffix_object = { keyword: "", date_de: "", date_ja: "" }
      // bad: suffix object asserted
      // create copy
      suffix_object = { ...daterange_suffixes.find((sf) => sf.keyword == suffix)! }
      if (suffix_object) {
        if (["early", "middle", "late"].includes(suffix_object.keyword)) {
          var century = centuries.find((ct) => ct.keyword == year)
          if (century) {
            suffix_object.date_de = suffix_object.date_de + " " + century.date_de
            suffix_object.date_ja = century.date_ja + suffix_object.date_ja
          } else {
            console.log("error century conversion", value, year)
          }
          return suffix_object
        } else {
          suffix_object.date_de = suffix_object.date_de + " " + year
          suffix_object.date_ja = year + suffix_object.date_ja
        }
        return suffix_object
      } else {
        return suffix_object
      }
    }else{
      return { date_de: year, date_ja: year }
    }
    }

    if (datestring.includes("-")) {
      // check if intervall
      if (datestring.includes('to')) {
        // check if intervall points to expression
        var intervall_expr = intervall.find((exp) => exp.keyword = datestring)
      if (intervall_expr) {
        return result = { "date_de": intervall_expr.date_de, "date_ja": intervall_expr.date_ja }
      }else{
        var date_one = suffix_replace(datestring.split('-to')[0])
        var date_two = suffix_replace(datestring.split('-to')[1])
        date_de = date_one.date_de + " bis " + date_two.date_de.toLowerCase()
        date_ja = date_one.date_ja + "年より" + date_two.date_ja + "年まで"
        return result = { "date_de": date_de, "date_ja": date_ja }
      }
        // is not an intervall
      } else {
        date_de = suffix_replace(datestring).date_de
        date_ja = suffix_replace(datestring).date_ja
        return result = { "date_de": date_de, "date_ja": date_ja + "年" }
      }
    } else {
      return result = { "date_de": datestring, "date_ja": datestring + "年" }
    }
  }
}
