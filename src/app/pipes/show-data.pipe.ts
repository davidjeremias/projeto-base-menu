import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'showData'
})
export class ShowDataPipe implements PipeTransform {

  transform(value: Date, hh?: string): any {
    let adicional;
    if(hh){adicional += '[às] HH:mm'}
    if (hh) {
      return moment(value).format('DD/MM/YYYY [às] HH:mm');
    } else {
      return moment(value).format('DD/MM/YYYY');
    }
  }

}
