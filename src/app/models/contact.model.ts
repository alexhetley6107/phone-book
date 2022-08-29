// import { nanoid } from 'nanoid';

export class Contact {
  constructor(
    public name: string,
    public phone: string,
    // public id?: string,
    public mail?: string,
    public age?: number,
    public company?: string,
    public city?: string
  ) {
    // this.id = nanoid(10);
    this.mail = 'work@mail.com';
    this.age = 25;
    this.company = 'goverment';
    this.city = 'London';
  }
}
