import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../../user/models/user.model";

/**
 * Pipe used to transform a User object into her fullname.
 */
@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: User): string {
    return `${value.firstName}, ${value.lastName}`;
  }

}
