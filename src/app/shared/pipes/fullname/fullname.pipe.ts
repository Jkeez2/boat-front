import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../../user/user.model";

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: User): string {
    return `${value.firstName}, ${value.lastName}`;
  }

}
