import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthpipe',
    standalone: true
})
export class MonthpipePipe implements PipeTransform {

  transform(value: any) {

    // check against empty entries already in template

    var year = ""
    var year_ja = ""
    var month = ""
    var day = ""

    // number instead of string / single number (poet data) should be fixed in data (jq), only for test purposes

      value = value.toString()

      if(value.length && value.includes('-')){
      // to convert dates both in format YYYY-MM-DD and MM-DD
      if(value.split('-').length === 3){
       year = value.split('-')[0]
       year_ja = year + '年'
       month = value.split('-')[1].padStart(2,'0')
       day = value.split('-')[2].padStart(2,'0')
      }else if(value.split('-').length === 2){
       month = value.split('-')[0].padStart(2,'0')
       day = value.split('-')[1].padStart(2,'0')
       }else{
        month = value.padStart(2, '0')
       }
    }else if(value.includes('年')){
        month = value.split('月')[0].split('年')[1].padStart(2,'0')
        day = value.split('月')[1].replace('日','').padStart(2,'0')
    }else{
      month = value.padStart(2, '0')
    }

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
      {monthnumerical:'12', monthde: 'Zwölfter Monat', monthja: '十二月'},
      {monthnumerical:'01閏', monthde: 'Schaltmonat nach dem ersten Monat', monthja: '閏一月'},
      {monthnumerical:'02閏', monthde: 'Schaltmonat nach dem zweiten Monat', monthja: '閏二月'},
      {monthnumerical:'03閏', monthde: 'Schaltmonat nach dem dritten Monat', monthja: '閏三月'},
      {monthnumerical:'04閏', monthde: 'Schaltmonat nach dem vierten Monat', monthja: '閏四月'},
      {monthnumerical:'05閏', monthde: 'Schaltmonat nach dem fünften Monat', monthja: '閏五月'},
      {monthnumerical:'06閏', monthde: 'Schaltmonat nach dem sechsten Monat', monthja: '閏六月'},
      {monthnumerical:'07閏', monthde: 'Schaltmonat nach dem siebten Monat', monthja: '閏七月'},
      {monthnumerical:'08閏', monthde: 'Schaltmonat nach dem achten Monat', monthja: '閏八月'},
      {monthnumerical:'09閏', monthde: 'Schaltmonat nach dem neunten Monat', monthja: '閏九月'},
      {monthnumerical:'10閏', monthde: 'Schaltmonat nach dem zehnten Monat', monthja: '閏十月'},
      {monthnumerical:'11閏', monthde: 'Schaltmonat nach dem elften Monat', monthja: '閏十一月'},
      {monthnumerical:'12閏', monthde: 'Schaltmonat nach dem zwölften Monat', monthja: '閏十二月'}
    ]

    let days = [
      {daynumerical:'01', dayde: 'Erster Tag', dayja: '一日'},
      {daynumerical:'02', dayde: 'Zweiter Tag', dayja: '二日'},
      {daynumerical:'03', dayde: 'Dritter Tag', dayja: '三日'},
      {daynumerical:'04', dayde: 'Vierter Tag', dayja: '四日'},
      {daynumerical:'05', dayde: 'Fünfter Tag', dayja: '五日'},
      {daynumerical:'06', dayde: 'Sechster Tag', dayja: '六日'},
      {daynumerical:'07', dayde: 'Siebter Tag', dayja: '七日'},
      {daynumerical:'08', dayde: 'Achter Tag', dayja: '八日'},
      {daynumerical:'09', dayde: 'Neunter Tag', dayja: '九日'},
      {daynumerical:'10', dayde: 'Zehnter Tag', dayja: '十日'},
      {daynumerical:'11', dayde: 'Elfter Tag', dayja: '十一日'},
      {daynumerical:'12', dayde: 'Zwölfter Tag', dayja: '十二日'},
      {daynumerical:'13', dayde: 'Dreizehnter Tag', dayja: '十三日'},
      {daynumerical:'14', dayde: 'Vierzehnter Tag', dayja: '十四日'},
      {daynumerical:'15', dayde: 'Fünfzehnter Tag', dayja: '十五日'},
      {daynumerical:'16', dayde: 'Sechzehnter Tag', dayja: '十六日'},
      {daynumerical:'17', dayde: 'Siebzehnter Tag', dayja: '十七日'},
      {daynumerical:'18', dayde: 'Achtzehnter Tag', dayja: '十八日'},
      {daynumerical:'19', dayde: 'Neunzehnter Tag', dayja: '十九日'},
      {daynumerical:'20', dayde: 'Zwanzigster Tag', dayja: '二〇日'},
      {daynumerical:'21', dayde: 'Einundzwanzigster Tag', dayja: '二一日'},
      {daynumerical:'22', dayde: 'Zweiundzwanzigster Tag', dayja: '二二日'},
      {daynumerical:'23', dayde: 'Dreiundzwanzigster Tag', dayja: '二三日'},
      {daynumerical:'24', dayde: 'Vierundzwanzigster Tag', dayja: '二四日'},
      {daynumerical:'25', dayde: 'Fünfundzwanzigster Tag', dayja: '二五日'},
      {daynumerical:'26', dayde: 'Sechsundzwanzigster Tag', dayja: '二六日'},
      {daynumerical:'27', dayde: 'Siebenundzwanzigster Tag', dayja: '二七日'},
      {daynumerical:'28', dayde: 'Achtundzwanzigster Tag', dayja: '二八日'},
      {daynumerical:'29', dayde: 'Neunundzwanzigster Tag', dayja: '二九日'},
      {daynumerical:'30', dayde: 'Dreißigster Tag', dayja: '三〇日'},
      {daynumerical:'31', dayde: 'Einundreißigster Tag', dayja: '三一日'}

    ]

     var date_de = ""
      var date_ja = ""

    var month_de = ""
    var month_ja = ""

    var day_de = ""
    var day_ja = ""

    months.filter((element) => { if(element.monthnumerical === month){ 
      month_de = element.monthde, 
      month_ja = element.monthja 
    } });
    
    // check if date contains only month
    if(day !== ""){
      days.filter((element) => { if(element.daynumerical === day){
      // dayde unused
        day_de = ((element.daynumerical.replace(/^0+/, '')) + '. Tag'), 
        day_ja = element.dayja 
      } })

      date_ja = month_ja + day_ja

      if(month_de.includes('Schaltmonat')){
        date_de = day_de + ' des ' + (month_de.replace("Schaltmonat", "Schaltmonats"))
      }else{
      date_de = day_de + ' des ' + month_de.replace("ter", "ten").replace("Monat", "Monats")
      }
    }else{
      date_de = month_de
      date_ja = month_ja
    }

    var result = { "date_de": date_de, "date_ja": date_ja, "year": year, "year_ja": year_ja }

    return result
  }
}
