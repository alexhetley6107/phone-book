import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  id: number | undefined;
  contact: Contact = { name: '', phone: '' };
  allContacts: Contact[] = [];

  isEditing: boolean = false;
  constructor(private route: ActivatedRoute) {}

  public editContactForm: FormGroup = new FormGroup({});

  @Output() public editCont = new EventEmitter<Contact>();

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.allContacts = JSON.parse(<string>localStorage.getItem('contacts'));
    this.contact = this.allContacts[<number>this.id];

    this.editContactForm = new FormGroup({
      name: new FormControl(this.contact.name, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      phone: new FormControl(this.contact.phone, {
        validators: [Validators.required],
      }),
      mail: new FormControl(this.contact.mail, {
        validators: [Validators.required, Validators.email],
      }),
      age: new FormControl(this.contact.age, {
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(200),
        ],
      }),
      company: new FormControl(this.contact.company, {
        validators: [Validators.required],
      }),
      city: new FormControl(this.contact.city, {
        validators: [Validators.required],
      }),
    });
  }

  changeInfo() {
    const name = this.editContactForm.value.name;
    const phone = this.editContactForm.value.phone;
    const mail = this.editContactForm.value.mail;
    const age = this.editContactForm.value.age;
    const company = this.editContactForm.value.company;
    const city = this.editContactForm.value.city;

    this.contact = {
      name,
      phone,
      mail,
      age,
      company,
      city,
    };
    this.allContacts[<number>this.id] = this.contact;

    const json = JSON.stringify(this.allContacts);
    localStorage.setItem('contacts', json);
    this.hideForm();
  }

  showForm() {
    this.isEditing = true;
  }
  hideForm() {
    this.isEditing = false;
  }
}
