import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bibliopipe'
})
export class BibliopipePipe implements PipeTransform {

  transform(value:string) {
      return value.replace(/\D/g,'');
  }
}
