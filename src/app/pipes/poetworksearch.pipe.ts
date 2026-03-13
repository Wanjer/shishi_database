import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'poetworksearch',
    standalone: true
})
export class PoetworksearchPipe implements PipeTransform {

  transform(poet: any, searchText: string): any {

    if (!poet) {

      return [];
    }
    if (!searchText[0]) {

      return poet;
    }
    if (poet) {

      var searchArray: Array<string> = [];
      searchArray.push(searchText.toLowerCase());

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

      return workresults;
    }

    return [];
  }

}
