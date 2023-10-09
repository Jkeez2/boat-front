import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {Boat} from "../boat/models/boat.model";
import {inject} from "@angular/core";
import {UserService} from "../user/user.service";
import {EMPTY, mergeMap, of} from "rxjs";

/**
 * This resolver is used to pre-fetch data when user tries to go on a certain path (ex. boats/details/{id}.
 * It manages incorrect paths, so user is redirected to boats list when he tries to enter a wrong path
 * like boats/details/-89 or boats/details/wrongpath.
 * @param route
 */
export const boatResolver: ResolveFn<Boat> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const cs = inject(UserService);
  const id = route.paramMap.get('boatId')!;

  let userId = Number(localStorage.getItem('currentUser'));

  return cs.getBoat(userId, Number(id)).pipe(mergeMap(boat => {
    if (boat) {
      return of(boat);
    } else {  // id not found
      router.navigate(['/boats']);
      return EMPTY;
    }
  }));
};
