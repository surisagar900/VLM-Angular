export class UserData {
  constructor(
    public username: string,
    public role: string,
    private _token: string,
    private _ExpiryDate: Date
  ) {}

  get token() {
    if (!this._ExpiryDate || new Date() > this._ExpiryDate) {
      return null;
    }
    return this._token;
  }
}
