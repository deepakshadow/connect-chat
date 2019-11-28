export class User {
  constructor(
    public email: string,
    public password: string,
    public mobileNumber?: string,
    public firstName?: string,
    public lastName?: string,
    public apiKey?: string
  ) {}
}
