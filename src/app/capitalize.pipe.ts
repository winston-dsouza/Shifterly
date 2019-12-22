import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): any {
    let firstChar =value.substring(0,1);
    let allOtherChars = value.substring(1,value.length);
    let newChar = firstChar.toUpperCase() + allOtherChars.toLowerCase();
    return newChar;
  }

}
