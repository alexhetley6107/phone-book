import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss'],
})
export class AddContactFormComponent implements OnInit {
  public isShowForm: boolean = false;
  public addContactForm: FormGroup = new FormGroup({});

  @Output() public addCont = new EventEmitter<Contact>();

  // constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.addContactForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  showForm(): void {
    this.isShowForm = true;
  }
  hideForm(): void {
    this.isShowForm = false;
  }

  onSubmit(): void {
    const name = this.addContactForm.value.name;
    const phone = this.addContactForm.value.phone;

    const contact = new Contact(name, phone);

    this.addCont.emit(contact);

    this.addContactForm.reset();
    this.hideForm();
  }
}
