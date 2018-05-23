export class Usuario {
  constructor(
    public email: string,
    public name: string,
    public password: string,
    public _id?: string,
  ) {}
}
