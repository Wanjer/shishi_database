import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpoets'
})
export class SearchpoetsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
