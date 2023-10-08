import {Boat} from "../boat/boat.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  boats: Boat[];
}

