import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLink'
})
export class IsLinkPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
