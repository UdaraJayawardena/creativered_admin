export class User {
  realm: string;
  username: string;
  email: string;
  emailVerified: boolean;
  id: number;

  constructor(realm: string, username: string, email: string, emailVerified: boolean, id: number) {
    this.realm = realm;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.id = id;
  }
}
