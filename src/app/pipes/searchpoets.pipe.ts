import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchpoets',
    standalone: true
})
export class SearchpoetsPipe implements PipeTransform {

  transform(poet: any, searchText: string): any{

    if (!poet) {

          return [];
        }

    if (!searchText[0]) {

          return poet;
        }

    if(poet){

      var searchArray:Array<string> = [];
      searchArray.push(searchText.toLowerCase());

      const resultsname:any[] = 
      searchArray.map(item => (poet.filter((x:any) => 

        x.id_name.romanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)
    ||  x.id_name.kana?.includes(item)
    ||  x.id_name.literal?.includes(item)

      // todo search across all names / aliases

        )));

          return resultsname.flat();
        }

        return [];
}

}
