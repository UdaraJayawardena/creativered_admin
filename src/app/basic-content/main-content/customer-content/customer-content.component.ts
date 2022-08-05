import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomerAccountsServiceService} from '../../../services/customer-accounts-service.service';
import {Customer} from '../../../dto/Customer';
import {Orders} from '../../../dto/Orders';
import {Observable} from 'rxjs';
import {ShippingAddress} from '../../../dto/ShippingAddress';

@Component({
  selector: 'app-customer-content',
  templateUrl: './customer-content.component.html',
  styleUrls: ['./customer-content.component.css']
})
export class CustomerContentComponent implements OnInit {

  customer: Customer[];
  orders: Orders[];
  shipping: ShippingAddress[];

  public id;
  public email;
  public firstName;
  public lastName;
  public contact;
  public status;
  public password;

  customerss: Observable<Customer>;
  orderss: Observable<Orders>;

  showSpinner: boolean = true;

  constructor(private router: Router, private customerService: CustomerAccountsServiceService) {
  }

  ngOnInit() {
    this.getAllCustomers('all'); //get all customer data
  }

  //function of search customer by id
  onKeydown(event, searchValue) {
    if (event.key == 'Enter') {
      for (let i = 0; i < this.customer.length; i++) {
        if (searchValue === this.customer[i].email) {
          this.customerService.searchCustomerByEmail(this.customer[i].id)
            .subscribe((result: Customer) => {

                this.id = result.id;
                this.firstName = result.firstName;
                this.lastName = result.lastName;
                this.contact = result.username;
                this.status = result.email;
                this.password = result.emailVerified;
                this.getAllOrders(this.customer[i].id);

              }, (error1 => {
                console.log(error1);
              })
            );
        }
      }
    }
  }

  //====================================================================================================================

  //function of get all customer
  getAllCustomers(value) {
    this.customerService.getCustomerDetails()
      .subscribe((result) => {
          if (value == 'all') {
            this.customer = result;
            this.customerss = this.customerService.getCustomerDetails();
            this.customerss.subscribe(() => this.showSpinner = false);
          } else {
            let cus: Array<Customer> = [];
            let cuss: Array<Customer> = result;
            for (var i = 0; i < cuss.length; i++) {
              if (cuss[i].emailVerified + '' == value) {
                cus.push(cuss[i]);
              }
            }
            this.customer = cus;
            this.customerss = this.customerService.getCustomerDetails();
            this.customerss.subscribe(() => this.showSpinner = false);
          }
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of get all ordera by customer id
  getAllOrders(value) {
    this.customerService.getAllOrders()
      .subscribe((result) => {

          let or: Array<Orders> = [];
          let orr: Array<Orders> = result;
          for (var i = 0; i < orr.length; i++) {
            if (orr[i].customerOrderId == value) {
              or.push(orr[i]);
            }
          }
          this.orders = or;
          this.orderss = this.customerService.getAllOrders();
          this.orderss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of saerch customer
  onSelect(selectedItem: Customer) {

    this.customerService.searchCustomerByEmail(selectedItem.id)
      .subscribe((result: Customer) => {

          this.id = result.id;
          this.firstName = result.firstName;
          this.lastName = result.lastName;
          this.contact = result.username;
          this.status = result.email;
          this.password = result.emailVerified;

          this.getAllOrders(selectedItem.id);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of show shipping data
  showShipping(cus: Customer) {
    this.customerService.getAllShippingData()
      .subscribe((result) => {
          let shipArray: Array<ShippingAddress> = [];
          this.shipping = result;
          for (var i = 0; i < this.shipping.length; i++) {
            if (this.shipping[i].customerShippingId == cus.id) {
              shipArray.push(this.shipping[i]);
            }
          }
          this.shipping = shipArray;
        }, (error1 => {

        })
      );
  }
}
