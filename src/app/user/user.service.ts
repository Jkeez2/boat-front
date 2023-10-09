import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./models/user.model";
import {Boat} from "../boat/models/boat.model";

/**
 * Service for user's CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  /**
   * Fetch a user with given ID
   * @param userId
   */
  getCurrentUser(userId: number): Observable<User> {
    const requestUrl = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(requestUrl);
  }

  /**
   * Get all user's boats
   * @param userId
   */
  getBoats(userId: number): Observable<Boat[]> {
    const requestUrl = `${this.apiUrl}/${userId}/boats`;
    return this.http.get<Boat[]>(requestUrl);
  }

  /**
   * Requests a specific boat for a given user
   * @param userId
   * @param boatId
   */
  getBoat(userId: number, boatId: number): Observable<Boat> {
    const requestUrl = `${this.apiUrl}/${userId}/boats/${boatId}`;
    return this.http.get<Boat>(requestUrl);
  }

  /**
   * Add a boat to a user
   * @param userId
   * @param boat
   */
  addBoat(userId: number, boat: Boat): Observable<Boat> {
    const requestUrl = `${this.apiUrl}/${userId}/boats`;
    return this.http.post<Boat>(requestUrl, boat);
  }

  /**
   * Update user's boat with new data
   * @param userId
   * @param boatId
   * @param boat new data
   */
  updateBoat(userId: number, boatId: number, boat: Boat): Observable<Boat> {
    const requestUrl = `${this.apiUrl}/${userId}/boats/${boatId}`;
    return this.http.put<Boat>(requestUrl, boat);
  }

  /**
   * Delete a user's boat
   * @param userId
   * @param boatId
   */
  deleteBoat(userId: number, boatId: number): Observable<Boat[]> {
    const requestUrl = `${this.apiUrl}/${userId}/boats/${boatId}`;
    return this.http.delete<Boat[]>(requestUrl);
  }
}
