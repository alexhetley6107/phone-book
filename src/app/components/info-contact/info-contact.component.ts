import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-info-contact',
  templateUrl: './info-contact.component.html',
  styleUrls: ['./info-contact.component.scss'],
})
export class InfoContactComponent implements OnInit {
  @Input() contact: Contact = {
    name: '',
    phone: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
