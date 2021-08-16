import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thereAreVideos'
})
export class ThereAreVideosPipe implements PipeTransform {

  transform(value: any): boolean {
    let videosFound = false;

    value.forEach(eachLink => {
      if (eachLink.link.includes('youtube')) {
        videosFound = true;
      }
    });

    return videosFound;
  }

}
