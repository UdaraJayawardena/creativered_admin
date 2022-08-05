export class Customer {
  firstName: string;
  lastName: string;
  subscribe: boolean;
  realm: string;
  username: string;
  email: string;
  emailVerified: boolean;
  id: number;

  constructor(firstName: string, lastName: string, subscribe: boolean, realm: string, username: string, email: string, emailVerified: boolean, id: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.subscribe = subscribe;
    this.realm = realm;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.id = id;
  }
}
