import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpoets'
})
export class SearchpoetsPipe implements PipeTransform {

  transform(poet: any, searchText: string): any{

    if (!poet) {
          //console.log('preload'); 
          return [];
        }
    if (!searchText[0]) {
          //console.log('notext'); 
          return poet;
        }
    if(poet){

      var searchArray:Array<string> = [];
      searchArray.push(searchText.toLowerCase());

    //  console.log('poet', poet);
    // console.log('searchArrayPoets', searchArray);

      const resultsname:any[] = 
      searchArray.map(item => (poet.filter((x:any) => 
        
        x.names.commonname.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)
    ||  x.names.commonname.kana?.includes(item)
    ||  x.names.commonname.literal?.includes(item)

    ||  x.names.abbreviated.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)
    ||  x.names.abbreviated.kana?.includes(item)
    ||  x.names.abbreviated.literal?.includes(item)

    ||  x.names.familyname.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)
    ||  x.names.familyname.kana?.includes(item)
    ||  x.names.familyname.literal?.includes(item)

    ||  x.names.clanname.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)
    ||  x.names.clanname.kana?.includes(item)
    ||  x.names.clanname.literal?.includes(item)

    ||  x.names.youthname.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)
    ||  x.names.youthname.kana?.includes(item)
    ||  x.names.youthname.literal?.includes(item)

    ||  x.names.adultname.some((name:any) => name.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item))
    ||  x.names.adultname.some((name:any) => name.kana?.includes(item))
    ||  x.names.adultname.some((name:any) => name.literal?.includes(item))

    ||  x.names.tabooname.some((name:any) => name.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item))
    ||  x.names.tabooname.some((name:any) => name.kana?.includes(item))
    ||  x.names.tabooname.some((name:any) => name.literal?.includes(item))

    ||  x.names.callname.some((name:any) => name.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item))
    ||  x.names.callname.some((name:any) => name.kana?.includes(item))
    ||  x.names.callname.some((name:any) => name.literal?.includes(item))

    ||  x.names.stylename.some((name:any) => name.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item))
    ||  x.names.stylename.some((name:any) => name.kana?.includes(item))
    ||  x.names.stylename.some((name:any) => name.literal?.includes(item))

        )));

   //     console.log('poetresults', resultsname);
          return resultsname.flat();
        }

        //console.log('nomatch'); 
        return [];
}

}
