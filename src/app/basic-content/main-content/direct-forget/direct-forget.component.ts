import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-direct-forget',
  templateUrl: './direct-forget.component.html',
  styleUrls: ['./direct-forget.component.css']
})
export class DirectForgetComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.openModal.nativeElement.click();
  }

  resetPassword(password, confirmPassword) {

  }

}
