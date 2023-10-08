import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {User} from "./user.model";
import {UserLogin} from "./user-login.model";
import {Boat} from "../boat/boat.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getCurrentUser(userId: number): Observable<User> {
    const requestUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(requestUrl);
  }

  getBoats(userId: number): Observable<Boat[]> {
    const requestUrl = `${this.apiUrl}/${userId}/boats`;
    return this.http.get<Boat[]>(requestUrl);
  }

  getBoat(userId: number, boatId: number): Observable<Boat> {
    const requestUrl = `${this.apiUrl}/${userId}/boats/${boatId}`;
    return this.http.get<Boat>(requestUrl);
  }

  addBoat(userId: number, boat: Boat): Observable<Boat> {
    const requestUrl = `${this.apiUrl}/${userId}/boats`;
    return this.http.post<Boat>(requestUrl, boat);
  }

  updateBoat(userId: number, boatId: number, boat: Boat): Observable<Boat> {
    const requestUrl = `${this.apiUrl}/${userId}/boats/${boatId}`;
    return this.http.put<Boat>(requestUrl, boat);
  }

  deleteBoat(userId: number, boatId: number): Observable<Boat[]> {
    const requestUrl = `${this.apiUrl}/${userId}/boats/${boatId}`;
    return this.http.delete<Boat[]>(requestUrl);
  }
}
