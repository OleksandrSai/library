import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    if(value) {
      return value.charAt(0) + "."
    }
    else{
      return "?.";
    }
  }

}
