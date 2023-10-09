/**
 * Class used to represents the user's credentials when he logs in
 */
export class UserLogin {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

}

