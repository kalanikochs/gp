import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isVideo'
})
export class IsVideoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
