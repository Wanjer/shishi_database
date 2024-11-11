import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

// solution using pipe for adding events from arbitrary file outside timeline
// not implemented

@Pipe({
  name: 'addpoetevent'
})
export class AddpoeteventPipe implements PipeTransform {

  transform(yearobject:any, poetarray:any): any{
  
 // console.log('poetspipe', poetarray);
 //   poets.subscribe((poets:any) => console.log('po', poets));

    if (!yearobject) {
       //   console.log('nopoets');
          return yearobject;
        }
    if(yearobject){

     // console.log('to', yearobject)
          console.log('outer');

          poetarray.map((poet:any) => poet.timeline.map((poetyearobject: any) => 
          {
             // console.log('pyo', poetyearobject);
          //  console.log('pyoyear', poetyearobject.year);
          //  console.log('yoyear', yearobject.year);

            if (yearobject.year === poetyearobject.year) {
             // poetyearobject.events.map((ev: any) => yearobject.events.push(ev));
             // console.log('yo_pushed', yearobject.year, yearobject)
              console.log('appended');
              return yearobject;
            }else{
    //          console.log('ended');
              return yearobject;
            }
          }
        ))

        //  console.log('ended', yearobject);
          return yearobject;
        }
}
}
