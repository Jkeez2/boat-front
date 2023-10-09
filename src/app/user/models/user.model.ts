import {Boat} from "../../boat/models/boat.model";

/**
 * Interface that represents a User.
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  boats: Boat[];
}

