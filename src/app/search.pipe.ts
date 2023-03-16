import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, input: string) {
    console.log(input, 'input');
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        return el.title.toLowerCase().indexOf(input) > -1;
      });
    }
    if (input == undefined || input == '') return value;
  }
}
