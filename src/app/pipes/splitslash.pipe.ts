import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitslash',
  standalone: true
})
export class SplitslashPipe implements PipeTransform {

  transform(value: string): any {
    var result = value.split("/")
    return result;
  }

}
