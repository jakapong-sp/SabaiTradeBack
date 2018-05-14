export class User {
    email: string;
    username: string;
    password: string;
    status: number;

    constructor() {
      this.username = '';
      this.password = '';
      this.status = 0;
    }
  }
