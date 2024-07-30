import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArray'
})
export class JoinArrayPipe implements PipeTransform {
  transform(value:any) {
    if(value instanceof Array){
    return value.join(" ");
  }
    throw new Error("conversion error");
  }
}
