import {ActivatedRouteSnapshot, ResolveFn, Router} from '@angular/router';
import {Boat} from "../boat/boat.model";
import {inject} from "@angular/core";
import {UserService} from "../user/user.service";
import {EMPTY, mergeMap, of} from "rxjs";

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
