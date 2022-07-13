export class Admin {
  realm: string;
  username: string;
  email: string;
  emailVerified: boolean;
  id: number;
  password: string;
  userId: number;

  constructor(realm: string, username: string, email: string, emailVerified: boolean, id: number, password: string)
  constructor(realm?: string, username?: string, email?: string, emailVerified?: boolean, id?: number, password?: string, userId?: number) {
    this.realm = realm;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.id = id;
    this.password = password;
    this.userId = userId;
  }
}

export class Admin1 {
  email: string;
  password: string;
  username: String;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class AdminPas {
  oldPassword: string;
  newPassword: string;

  constructor(oldPassword: string, newPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

export class AdminS {
  realm: string;
  username: string;
  email: string;
  emailVerified: boolean;
  id: number;
  password: string;

  constructor(realm: string, username: string, email: string, emailVerified: boolean, id: number)
  constructor(realm: string, username: string, email: string, emailVerified: boolean, id: number, password: string)
  constructor(realm?: string, username?: string, email?: string, emailVerified?: boolean, id?: number, password?: string) {
    this.realm = realm;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.id = id;
    this.password = password;
  }

}

export class ForgetPassword {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
