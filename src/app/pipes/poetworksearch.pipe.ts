import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poetworksearch'
})
export class PoetworksearchPipe implements PipeTransform {

  transform(poet: any, searchText: string): any {

    if (!poet) {
      //console.log('preload'); 
      return [];
    }
    if (!searchText[0]) {
      //console.log('notext'); 
      return poet;
    }
    if (poet) {
      //  const check:any[] = timeline?.map((x:any) => x != timeline.map((x:any) => x.events.map((y:any) => y.summaryGer)));
      //  console.log('check', check);

      var searchArray: Array<string> = [];
      searchArray.push(searchText.toLowerCase());

      //  console.log('searchArrayPoetsWorks', searchArray);

      //search works titles

      const test: any = [];

      searchArray.map(item => (
        poet.map((x: any) => x.timeline.map((y: any) =>
          y.events?.map((z: any) =>
            test.push(
              z.work?.filter((entry: any) =>
                entry?.titleromanized?.toLowerCase().replace(/ū/g, 'u').replace(/ō/g, 'o').replace(/ī/g, 'i').replace(/ē/g, 'e').includes(item)
              )))
        )))
      );

      searchArray.map(item => (
        poet.map((x: any) => x.timeline.map((y: any) =>
          y.events?.map((z: any) =>
            test.push(
              z.work?.filter((entry: any) =>
                entry?.title?.includes(item)
              )))
        )))
      );

      searchArray.map(item => (
        poet.map((x: any) => x.timeline.map((y: any) =>
          y.events?.map((z: any) =>
            test.push(
              z.work?.filter((entry: any) =>
                entry?.titlekana?.includes(item)
              )))
        )))
      );

      const workresults: any = test.filter((item: any) => item !== undefined).flat();

      // entry.titleromanized?.toLowerCase().replace(/ū/g,'u').replace(/ō/g,'o').replace(/ī/g,'i').replace(/ē/g,'e').includes(item)  
      // || entry.title.includes(item)
      // || entry.titlekana.includes(item)

      //  console.log('test', test.filter((item:any) => item !== undefined).flat());
      //  console.log('workresults', workresults);
      return workresults;
    }

    //console.log('nomatch'); 
    return [];
  }

}
