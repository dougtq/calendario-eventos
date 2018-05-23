import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'descricao'
})
export class DescriptionLengthPipe implements PipeTransform {
  public transform(text: string, truncarEm = 40, iniciaEm = 0): string {
    if (!text) {
      return '';
    } else {
      if (text.length < truncarEm) {
        return text;
      } else {
        return text.substr(iniciaEm, truncarEm - 1) + '...';
      }
    }

  }
}
