import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { CONTACTS } from './contacts.mockup';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[] = [];
  public isFiltered: boolean = false;

  ngOnInit(): void {
    this.contacts =
      JSON.parse(<string>localStorage.getItem('contacts')) || CONTACTS;
  }

  public filter(e: KeyboardEvent): void {
    const value = (e.target as HTMLInputElement).value.toLowerCase();

    if (value) {
      this.contacts = this.contacts.filter((c) =>
        c.name.toLowerCase().includes(value)
      );
      this.isFiltered = true;
    } else {
      this.contacts =
        JSON.parse(<string>localStorage.getItem('contacts')) || CONTACTS;
      this.isFiltered = false;
    }
  }

  public deleteContact(id: number) {
    this.contacts = this.contacts.filter((c, i) => i !== id);
    this.saveContacts();
  }

  public addContact(contact: Contact) {
    this.contacts.push(contact);
    this.saveContacts();
  }

  public getMyContacts(): void {
    this.contacts = CONTACTS;
    this.saveContacts();
  }
  public saveContacts(): void {
    const json = JSON.stringify(this.contacts);
    localStorage.setItem('contacts', json);
  }
}
