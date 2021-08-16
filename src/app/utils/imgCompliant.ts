import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

export class ImgCompliant {
  static isImgCompliant(control: AbstractControl) {
    if (control.value) {
      let aux = false;
      const files = control.value._files.map(file => file.name.split('.')[1]);
      files.forEach(file => {
        if (!environment.supportedImages.includes(file)) {
          aux = true;
        }
      });
      if (aux) {
        return { img_noCompliant: true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
