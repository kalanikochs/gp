import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thereAreLinks'
})
export class ThereAreLinksPipe implements PipeTransform {
  transform(value: any): boolean {
    let linksFound = false;

    value.forEach(eachLink => {
      if (!eachLink.link.includes('youtube')) {
        linksFound = true;
      }
    });

    return linksFound;
  }
}
