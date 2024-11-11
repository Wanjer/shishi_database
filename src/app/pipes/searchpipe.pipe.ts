import { Pipe, PipeTransform } from '@angular/core';

//searches both german and japanese summary and description
// now implemented in ts file

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(yearobject: any, searchText: string): any{

    if (!yearobject) {
          //console.log('preload'); 
          return [];
        }
    if (!searchText) {
          //console.log('notext'); 
          return yearobject;
        }
    // do not immediately trigger search
    if(searchText.length > 3){

   //   setTimeout(() => {

        //  const check:any[] = timeline?.map((x:any) => x != timeline.map((x:any) => x.events.map((y:any) => y.summaryGer)));
        //  console.log('check', check);

      searchText.toLowerCase();
      var searchArray:Array<string> = [];
      searchArray.push(searchText);

      // console.log('searchArray', searchArray);

          const results:any[] = searchArray.map(item => (yearobject.filter((x:any) => 
            x.events?.some((y:any) => 
            y.summary_de?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item) 
         || y.summary_ja?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item) 
         || y.expansion_de?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item) 
         || y.expansion_ja?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item) 
        ))
        ));

        //  console.log('results', results);
          return results.flat();
      //  }, 20)

      }

        //console.log('nomatch'); 
        return yearobject;
}
}
