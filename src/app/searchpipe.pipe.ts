import { Pipe, PipeTransform } from '@angular/core';

//searches both german and japanese summary and description

@Pipe({
  name: 'searchpipe',
  pure: false
})
export class SearchpipePipe implements PipeTransform {

  transform(timeline: any, searchText: string): any{

    if (!timeline) {
          //console.log('preload'); 
          return [];
        }
    if (!searchText) {
          //console.log('notext'); 
          return timeline;
        }
    if(timeline){
        //  const check:any[] = timeline?.map((x:any) => x != timeline.map((x:any) => x.events.map((y:any) => y.summaryGer)));
        //  console.log('check', check);

          const summaries:any[] = timeline.filter((x:any) => x.events?.some((y:any) => y.summaryGer?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(searchText.toLowerCase()) || y.descriptionGer?.replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').toLowerCase().includes(searchText.toLowerCase())|| y.summary?.toLowerCase().includes(searchText.toLowerCase())|| y.description?.toLowerCase().includes(searchText.toLowerCase())));

      //    console.log('summaries', summaries, 'searchtext', searchText);

          //console.log('match'); 
          return summaries;
        }

        //console.log('nomatch'); 
        return [];
}
}
