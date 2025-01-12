import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class SlicePipe implements PipeTransform {

  transform(value: string, length: number = 20): string {
    if (typeof value !== 'string') {
      return value;
    }
    if (value.length > length) {
      return value.substring(0, length) + '...';
    }
    return value; 
  }

}
