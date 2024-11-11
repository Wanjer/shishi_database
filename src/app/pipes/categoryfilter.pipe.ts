import { Pipe, PipeTransform } from '@angular/core';

// solution for category filtering with pipes
// needs string tag to work as pure pipe
// because array changes are not detected
// very slow performance
// implementation in ts component more efficient?

@Pipe({
  name: 'categoryfilter'
})

export class CategoryfilterPipe implements PipeTransform {

  transform(yearobject: any, tag:string): any {

  //  console.log('tag', tag);

 //   if (!selectedtags[0]) {
  //    console.log('nocat'); 
  //    return yearobject;
 //   }

  //  if(!( this.selectedtags.includes(tag)))

  //    console.log('filtering');
  //    console.log('yobefore', yearobject); 

      var selectedtags = tag.split(" ").filter(x => x !== "");
  //    console.log('selectedtags', selectedtags);

      if(selectedtags.length !== 0){
        const results: any[] =
      selectedtags.map((tag:any) =>
        (yearobject.filter((yo: any) =>
          yo.events?.some((ev: any) =>
            ev.category.includes(tag)
          ))
        ));
 //       console.log('results', results);
        return results.flat();

      }else{
        return yearobject;
      }
  //    console.log('no categories'); 


  }
}
