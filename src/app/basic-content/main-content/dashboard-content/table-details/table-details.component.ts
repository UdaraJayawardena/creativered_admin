import {Component, OnInit} from '@angular/core';
import {Orders} from '../../../../dto/Orders';
import {Router} from '@angular/router';
import {DashboardServiceService} from '../../../../services/dashboard-service.service';
import {OrderDetail} from '../../../../dto/OrderDetail';
import {ShippingAddress} from '../../../../dto/ShippingAddress';
import {BillingAddress} from '../../../../dto/BillingAddress';
import {Observable} from 'rxjs';
import {Customer} from '../../../../dto/Customer';
import Swal from 'sweetalert2';
import {DatepickerOptions} from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})

export class TableDetailsComponent implements OnInit {

  orderss: Orders[];
  orderdetails: OrderDetail[];
  shippingdetails: ShippingAddress[];
  billingdetails: BillingAddress[];
  billdata: number;
  shipdata: number;
  torderidinput: number;
  tbillingidinput: number;
  tshippingidinput: number;
  torderdateinput: string;
  tordertimeinput: string;
  tstatusinput: string;
  rdeliveryaddressinput: string;
  rpaymentmethodinput: string;
  rpaymentidinput: string;
  rcustomeremailinput: string;
  trackinginput: string = '';

  public orders: Observable<Orders>;

  showSpinner: boolean = true;

  constructor(private router: Router, private dashboardService: DashboardServiceService) {
  }

  ngOnInit() {
    this.getUnshipped(); //get all unship data
  }

  from;
  to;

  calculateFromDate() {
    if (this.from == undefined || this.to == undefined) {
      Swal.fire('Select dates !');
    } else {
      // from date
      const fromYear = this.from.year;
      let fromMonth = this.from.month;
      let fromDay = this.from.day;

      const fromM = Number(fromMonth);
      const fromD = Number(fromDay);

      if (fromM < 10) {
        fromMonth = '0' + fromMonth;
      }
      if (fromD < 10) {
        fromDay = '0' + fromDay;
      }
      const fDate = fromYear + '-' + fromMonth + '-' + fromDay;
      // end of from date

      // to date
      const toYear = this.to.year;
      let toMonth = this.to.month;
      let toDay = this.to.day;

      const toM = Number(toMonth);
      const toD = Number(toDay);

      if (toM < 10) {
        toMonth = '0' + toMonth;
      }

      if (toD < 10) {
        toDay = '0' + toDay;
      }
      const tDate = toYear + '-' + toMonth + '-' + toDay;
      // end of to day

      this.dashboardService.getOrdersByDateRanges(fDate, tDate)
        .subscribe((result: Orders[]) => {
            let all: Array<Orders> = [];

            for (var i = 0; i < result.length; i++) {
              if (result[i].status == 'not shipped') {
                var ldate = new Date(result[i].orderDate).toLocaleDateString();
                var orobj = new Orders(ldate, result[i].orderTime, result[i].status,
                  result[i].paymentMethod, result[i].paymentId, result[i].trackingId, result[i].id, result[i].customerOrderId,
                  result[i].billingid, result[i].shippingid, 'Ship');
                all.push(orobj);
              }
              if (result[i].status == 'shipped') {
                var ldates = new Date(result[i].orderDate).toLocaleDateString();
                var orobjs = new Orders(ldates, result[i].orderTime, result[i].status,
                  result[i].paymentMethod, result[i].paymentId, result[i].trackingId, result[i].id, result[i].customerOrderId,
                  result[i].billingid, result[i].shippingid, 'Completed');
                all.push(orobjs);
              }
            }
            this.orderss = all;
          }, (error1 => {
            console.log(error1);
          })
        );
    }
  }

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };

  // function of unship data
  getUnshipped() {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          let unship: Array<Orders> = result;
          let unship1: Array<Orders> = [];
          for (var i = 0; i < unship.length; i++) {
            if (unship[i].status == 'not shipped') {
              var ldate = new Date(unship[i].orderDate).toLocaleDateString();
              var orobj = new Orders(ldate, unship[i].orderTime, unship[i].status,
                unship[i].paymentMethod, unship[i].paymentId, unship[i].trackingId, unship[i].id, unship[i].customerOrderId,
                unship[i].billingid, unship[i].shippingid, 'Ship');
              unship1.push(orobj);
            }
          }
          this.orderss = unship1;
          this.orders = this.dashboardService.getUnshippedData();
          this.orders.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of ship data
  getShip() {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          let ship: Array<Orders> = result;
          let ship1: Array<Orders> = [];
          for (var i = 0; i < ship.length; i++) {
            if (ship[i].status == 'shipped') {
              var ldate = new Date(ship[i].orderDate).toLocaleDateString();
              var orobj = new Orders(ldate, ship[i].orderTime, ship[i].status,
                ship[i].paymentMethod, ship[i].paymentId, ship[i].trackingId, ship[i].id, ship[i].customerOrderId,
                ship[i].billingid, ship[i].shippingid, 'Completed');
              ship1.push(orobj);
            }
          }
          this.orderss = ship1;
          this.orders = this.dashboardService.getUnshippedData();
          this.orders.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  // search by order id
  getOrderFilterOrderID(filterdata) {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          let filteraray: Array<Orders> = [];
          let filteraray1: Array<Orders> = result;
          for (var i = 0; i < filteraray1.length; i++) {
            if (filteraray1[i].id == filterdata) {
              filteraray.push(filteraray1[i]);
              if (filteraray1[i].status == 'not shipped') {
                filteraray1[i].actions = 'Ship';
              } else if (filteraray1[i].status == 'shipped') {
                filteraray1[i].actions = 'Completed';
              }
            }
          }
          this.orderss = filteraray;
          this.orders = this.dashboardService.getUnshippedData();
          this.orders.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  // search by customer mail
  getOrderFilterCusmail(filterdata) {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          let filteraray: Array<Orders> = [];
          let filteraray1: Array<Orders> = result;
          for (var i = 0; i < filteraray1.length; i++) {
            if (filteraray1[i].customerOrderId == filterdata) {
              filteraray.push(filteraray1[i]);
              if (filteraray1[i].status == 'not shipped') {
                filteraray1[i].actions = 'Ship';
              } else if (filteraray1[i].status == 'shipped') {
                filteraray1[i].actions = 'Completed';
              }
            }
          }
          this.orderss = filteraray;
          this.orders = this.dashboardService.getUnshippedData();
          this.orders.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  // search by billing id
  getOrderFilterbil(filterdata) {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          let filteraray: Array<Orders> = [];
          let filteraray1: Array<Orders> = result;
          for (var i = 0; i < filteraray1.length; i++) {
            if (filteraray1[i].billingid == filterdata) {
              filteraray.push(filteraray1[i]);
              if (filteraray1[i].status == 'not shipped') {
                filteraray1[i].actions = 'Ship';
              } else if (filteraray1[i].status == 'shipped') {
                filteraray1[i].actions = 'Completed';
              }
            }
          }
          this.orderss = filteraray;
          this.orders = this.dashboardService.getUnshippedData();
          this.orders.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  // search by shipped id
  getOrderFiltership(filterdata) {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          let filteraray: Array<Orders> = [];
          let filteraray1: Array<Orders> = result;
          for (var i = 0; i < filteraray1.length; i++) {
            if (filteraray1[i].shippingid == filterdata) {
              filteraray.push(filteraray1[i]);
              if (filteraray1[i].status == 'not shipped') {
                filteraray1[i].actions = 'Ship';
              } else if (filteraray1[i].status == 'shipped') {
                filteraray1[i].actions = 'Completed';
              }
            }
          }
          this.orderss = filteraray;
          this.orders = this.dashboardService.getUnshippedData();
          this.orders.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of ship data by button click
  changeShip(validea: Orders) {
    if (validea.status == 'not shipped') {
      this.dashboardService.getIdDetail(validea.id)
        .subscribe((result: Orders) => {
            var ldate = new Date(result.orderDate).toLocaleDateString();
            var orderob1 = new Orders(ldate, result.orderTime, 'shipped',
              result.paymentMethod, result.paymentId, result.trackingId, result.id, result.customerOrderId,
              result.billingid, result.shippingid);
            this.updateStatus(orderob1);
          }, (error1 => {
            console.log(error1);
          })
        );
    } else if (validea.status == 'shipped') {
      Swal.fire(
        'Warning',
        'This Order already shipped !',
        'warning'
      );
    }
  }

  //====================================================================================================================

  //update status when clicking on action button
  updateStatus(orderobj) {
    this.dashboardService.updateIdDetail(orderobj)
      .subscribe((result) => {
          this.getUnshipped();
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //get order detail from relevent order id
  showDetail(ordr: Orders) {
    this.billdata = ordr.billingid;
    this.shipdata = ordr.shippingid;

    this.dashboardService.getOrderDetail()
      .subscribe((result) => {
          let orderdet1: Array<OrderDetail> = [];
          let orderdet2: Array<OrderDetail> = result;

          for (var i = 0; i < orderdet2.length; i++) {
            if (orderdet2[i].orderid == ordr.id) {
              orderdet1.push(orderdet2[i]);
            }
          }
          this.orderdetails = orderdet1;
        }, (error1 => {
          console.log(error1);
        })
      );

    this.dashboardService.getBillingDetailsbyID(ordr.billingid)
      .subscribe((result: BillingAddress) => {

          this.billingdetails = [new BillingAddress(result.firstName, result.lastName, result.addressOne,
            result.addressTwo, result.city, result.country, result.postalCode, result.id, result.customerBillingId)];

        }, (error1 => {
          console.log(error1);
        })
      );

    this.dashboardService.getShippingDetailsbyID(ordr.shippingid)
      .subscribe((result: ShippingAddress) => {

          this.shippingdetails = [new ShippingAddress(result.firstName, result.lastName, result.addressOne,
            result.addressTwo, result.city, result.country, result.postalCode, result.id, result.customerShippingId)];

        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //set order detail to shipping area
  shipModal(ordr: Orders) {
    console.log(ordr);
    console.log(ordr);
    let odr = ordr;

    this.dashboardService.getCusdata()
      .subscribe((result) => {
          let cusem: string;
          let cus2: Array<Customer> = result;
          for (var i = 0; i < cus2.length; i++) {
            if (cus2[i].id == odr.customerOrderId) {
              cusem = cus2[i].email;
            }
          }
          this.rcustomeremailinput = cusem;
          console.log(this.rcustomeremailinput);
        }, (error1 => {
          console.log(error1);
        })
      );

    if (odr.status == 'not shipped') {

      this.torderidinput = odr.id;
      this.tbillingidinput = odr.billingid;
      this.tshippingidinput = odr.shippingid;
      this.torderdateinput = odr.orderDate;
      this.tordertimeinput = odr.orderTime;
      this.tstatusinput = odr.status;
      this.rdeliveryaddressinput = odr.trackingId;
      this.rpaymentmethodinput = odr.paymentMethod;
      this.rpaymentidinput = odr.paymentId;

      let trck = document.getElementById('divtrack') as HTMLElement;
      trck.style.display = 'block';
      let sbtn = document.getElementById('shipbtn') as HTMLElement;
      sbtn.style.display = 'block';
      let ubtn = document.getElementById('unbtn') as HTMLElement;
      ubtn.style.display = 'none';
      let dtrck = document.getElementById('trackdiv') as HTMLElement;
      dtrck.style.display = 'none';


    } else if (odr.status == 'shipped') {

      this.torderidinput = odr.id;
      this.tbillingidinput = odr.billingid;
      this.tshippingidinput = odr.shippingid;
      this.torderdateinput = odr.orderDate;
      this.tordertimeinput = odr.orderTime;
      this.tstatusinput = odr.status;
      this.rdeliveryaddressinput = odr.trackingId;
      this.rpaymentmethodinput = odr.paymentMethod;
      this.rpaymentidinput = odr.paymentId;

      let trck = document.getElementById('divtrack') as HTMLElement;
      trck.style.display = 'none';
      let sbtn = document.getElementById('shipbtn') as HTMLElement;
      sbtn.style.display = 'none';
      let ubtn = document.getElementById('unbtn') as HTMLElement;
      ubtn.style.display = 'block';
      let dtrck = document.getElementById('trackdiv') as HTMLElement;
      dtrck.style.display = 'block';
    }
  }

  //====================================================================================================================

  //ship order to unship
  unshipdata(torderidvalue) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I`m sure !'
    }).then((result) => {
      if (result.value) {
        this.dashboardService.getUnshippedData()
          .subscribe((result) => {
              let newor: Orders;
              let orderdt: Array<Orders> = result;
              for (var i = 0; i < orderdt.length; i++) {
                if (orderdt[i].id == torderidvalue) {
                  var ldate = new Date(orderdt[i].orderDate).toISOString().slice(0, 10);
                  newor = new Orders(ldate, orderdt[i].orderTime, 'not shipped', orderdt[i].paymentMethod
                    , orderdt[i].paymentId, '', orderdt[i].id, orderdt[i].customerOrderId, orderdt[i].billingid
                    , orderdt[i].shippingid);
                }
              }
              this.dashboardService.updateIdDetail(newor)
                .subscribe((result) => {
                    Swal.fire('Unship your ' + torderidvalue + ' Order successfully');
                    this.tstatusinput = 'not shipped';
                    this.rdeliveryaddressinput = '';
                    this.getShip();
                  }, (error1 => {
                    console.log(error1);
                  })
                );
            }, (error1 => {
              console.log(error1);
            })
          );
      }
    });
  }

  // ===================================================================================================================

  //function of send tracking id and confirm the ship
  shipDone(torderidvalue, trackid, cusval) {
    if (trackid == '') {

      Swal.fire(
        'Warning',
        'please fill the blanks !',
        'warning'
      );

    } else {

      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I`m sure !'
      }).then((result) => {
        if (result.value) {
          this.dashboardService.getUnshippedData()
            .subscribe((result) => {
                let newor: Orders;
                let orderdt: Array<Orders> = result;
                for (var i = 0; i < orderdt.length; i++) {
                  if (orderdt[i].id == torderidvalue) {
                    var ldate = new Date(orderdt[i].orderDate).toISOString().slice(0, 10);
                    newor = new Orders(ldate, orderdt[i].orderTime, 'shipped', orderdt[i].paymentMethod
                      , orderdt[i].paymentId, trackid, orderdt[i].id, orderdt[i].customerOrderId, orderdt[i].billingid
                      , orderdt[i].shippingid);
                  }
                }
                this.dashboardService.updateIdDetail(newor)
                  .subscribe((result) => {
                      Swal.fire(
                        'Success',
                        'ship ' + torderidvalue + ' Order successfully',
                        'success'
                      );
                      this.tstatusinput = 'shipped';
                      this.getUnshipped();
                    }, (error1 => {
                      console.log(error1);
                    })
                  );
                this.dashboardService.sendEmail({
                  to: cusval,
                  subject: 'Regarding your DHL Tracking ID (creativered official site)',
                  message: '<p style="text-align: justify;"><img src="https://creative-red.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="width: 175px;" class="fr-fic fr-dib"></p>\n' +
                    '\n' +
                    '<h4 style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: blue;"><strong>Dear Sir / Madam</strong> <strong>,</strong></span></h4>\n' +
                    '\n' +
                    '<p style="line-height: 1.15;">\n' +
                    '\t<br>\n' +
                    '</p>\n' +
                    '\n' +
                    '<p style="line-height: 1.15;"><span style="font-size: 16px;"><b>' + trackid + '</b> this is your DHL order tracking id</span></p>\n' +
                    '\n' +
                    '<p style="line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;"><br></span></p>\n' +
                    '\n' +
                    '<p style="text-align: left; line-height: 1.15;"><span style="font-size: 11px;"><span style="font-family: Arial,Helvetica,sans-serif;">Sincerely,</span></span></p>\n' +
                    '\n' +
                    '<p style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">creativered.com</span></p>\n' +
                    '\n' +
                    '<p class="fr-text-bordered"><span style="font-size: 12px;"><strong>Copyright 2019 creativered. All Rights Reserved. Website Designed and Developed by VulcanD</strong></span></p>\n'

                }).subscribe((result2) => {
                    Swal.fire(
                      'Success',
                      'Email sent successfully ...!',
                      'success'
                    );
                  }, (error => {
                    console.log(error);
                  })
                );
              }, (error1 => {
                console.log(error1);
              })
            );
        }
      });
    }

  }

}
