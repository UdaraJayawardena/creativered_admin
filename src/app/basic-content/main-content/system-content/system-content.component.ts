import {Component, OnInit} from '@angular/core';
import {Complain} from '../../../dto/Complain';
import {SystemServiceService} from '../../../services/system-service.service';
import {ComplainType} from '../../../dto/ComplainType';
import {RefundRequest} from '../../../dto/RefundRequest';
import {Observable} from 'rxjs';
import {Feedback} from '../../../dto/Feedback';
import {Customer} from '../../../dto/Customer';
import {DashboardServiceService} from '../../../services/dashboard-service.service';
import Swal from 'sweetalert2';
import {Orders} from '../../../dto/Orders';
import {AdminS} from '../../../dto/Admin';
import {ComplainRply} from '../../../dto/ComplainRply';

@Component({
  selector: 'app-system-content',
  templateUrl: './system-content.component.html',
  styleUrls: ['./system-content.component.css']
})
export class SystemContentComponent implements OnInit {


  constructor(private dashboardservice: DashboardServiceService, private systemServiceService: SystemServiceService) {
  }

  // End ControlValueAccesor methods.

  modelSpecs: any;

  public editorContent: string;
  public editorContentcustomer: string;


  public optionsSpecs: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  };

  complains: Complain[];
  refRequests: RefundRequest[];
  feedbacks: Feedback[];

  complainss: Observable<Complain>;
  buttonType: string;
  showSpinner = true;
  public selectedvalue: string;
  public complainid: number;
  public tempcomplain: Complain[];
  public temporder: Orders[];
  public headname: string;
  public emaildata: string;
  public emailbody = 'enter email content here... !';
  public tempemailbody: string;

  // Begin ControlValueAccesor methods.
  onChanges = (_) => {
  }
  onToucheds = () => {
  }

  // Form modelSpecs content changed.
  writeValues(content: any): void {
    this.modelSpecs = content;
  }

  registerOnChanges(fn: (_: any) => void): void {
    this.onChanges = fn;
  }

  registerOnToucheds(fn: () => void): void {
    this.onToucheds = fn;
  }

  ngOnInit() {
    this.getUnseen(); //get all complain data
    this.getAllRefundRequests(); //get all refund requests
    this.getAllFeedbacks();
    this.editorContent = '<p style="text-align: justify;"><img src="https://creative-red.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="width: 175px;" class="fr-fic fr-dib"></p>\n' +
      '\n' +
      '<h4 style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: blue;"><strong>Dear Sir / Madam</strong> <strong>,</strong></span></h4>\n' +
      '\n' +
      '<p style="line-height: 1.15;">\n' +
      '\t<br>\n' +
      '</p>\n' +
      '\n' +
      '<p style="line-height: 1.15;"><span style="font-size: 16px;">enter email content here... !</span></p>\n' +
      '\n' +
      '<p style="line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;"><br></span></p>\n' +
      '\n' +
      '<p style="text-align: left; line-height: 1.15;"><span style="font-size: 11px;"><span style="font-family: Arial,Helvetica,sans-serif;">Sincerely,</span></span></p>\n' +
      '\n' +
      '<p style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">creativered.com</span></p>\n' +
      '\n' +
      '<p class="fr-text-bordered"><span style="font-size: 12px;"><strong>Copyright 2019 creativered. All Rights Reserved. Website Designed and Developed by G24</strong></span></p>\n';

  }

  //====================================================================================================================

  //function of send all email
  sendmail() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t send this email !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I`m sure !'
    }).then((result) => {
      if (result.value) {

        this.systemServiceService.getSubscribeCus()
          .subscribe((result: Array<Customer>) => {
              for (let i = 0; i < result.length; i++) {
                if (result[i].subscribe == true) {
                  this.dashboardservice.sendEmail({
                    to: result[i].email,
                    subject: 'creativered upcomming news',
                    message: this.editorContent
                  }).subscribe((result2) => {
                      console.log('done');
                    }, (error => {
                      console.log(error);
                    })
                  );
                }
              }
              Swal.fire(
                'Success',
                'Email sent successfully ...!',
                'success'
              );
            }, (error1 => {
              console.log(error1);
            })
          );

      }
    });
  }

  //====================================================================================================================

  //function of get all compalin data
  getUnseen() {
    this.buttonType = 'Done';
    this.systemServiceService.getAllComplains()
      .subscribe((result) => {
          const values: Array<Complain> = result;
          const values1: Array<Complain> = [];
          for (var i = 0; i < values.length; i++) {
            if (values[i].status == 'false') {
              const lDate = new Date(values[i].comDate).toISOString().slice(0, 10);
              var valObjct = new Complain(lDate, values[i].comTime, values[i].message, values[i].status, values[i].complainTypeID,
                values[i].id, values[i].complainOrderId);
              values1.push(valObjct);
            }
          }
          this.complains = values1;
          this.systemServiceService.changeIsCheckComplaint(this.complains.length);
          this.complainss = this.systemServiceService.getAllComplains();
          this.complainss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of change status of complain detail
  getSeen() {
    this.buttonType = 'Complete';
    this.systemServiceService.getAllComplains()
      .subscribe((result) => {
          const values: Array<Complain> = result;
          const values1: Array<Complain> = [];
          for (var i = 0; i < values.length; i++) {
            if (values[i].status == 'true') {
              const lDate = new Date(values[i].comDate).toISOString().slice(0, 10);
              var valObjct = new Complain(lDate, values[i].comTime, values[i].message, values[i].status, values[i].complainTypeID,
                values[i].id, values[i].complainOrderId);
              values1.push(valObjct);
            }
          }
          this.complains = values1;
          this.complainss = this.systemServiceService.getAllComplains();
          this.complainss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of get all refund details
  getAllRefundRequests() {
    this.systemServiceService.getAllRefundRquests()
      .subscribe((result) => {
          this.refRequests = result;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of get all feedback details
  getAllFeedbacks() {
    this.systemServiceService.getAllFeedBacks()
      .subscribe((result) => {
          this.feedbacks = result;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of get complain data when clicking all problem button
  getSelectedValue(value) {
    if (value == 'All Problems') {
      this.getUnseen();
    } else {
      this.systemServiceService.getComplainType()
        .subscribe((result) => {
          const rr: Array<ComplainType> = result;
          for (var i = 0; i < rr.length; i++) {
            if (value == rr[i].complainType) {
              this.setTheTable(rr[i].id);
            }
          }
        }, (error1 => {
          console.log(error1);
        }));
    }
  }

  //====================================================================================================================

  //function of search complain by id
  setTheTable(id) {
    this.systemServiceService.getAllComplains()
      .subscribe((result) => {
          const com: Array<Complain> = result;
          const coms: Array<Complain> = [];
          for (var i = 0; i < com.length; i++) {
            if (com[i].complainTypeID == id && com[i].status == 'false') {
              coms.push(com[i]);
            }
          }
          this.complains = coms;
          this.complainss = this.systemServiceService.getAllComplains();
          this.complainss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of delete complains by id
  deleteSeenMessages(selectedVal, value) {
    this.selectedvalue = selectedVal;
    this.complainid = value;

    this.systemServiceService.getAllComplains()
      .subscribe((result10: Array<Complain>) => {
          for (let i = 0; i < result10.length; i++) {
            if (result10[i].id == this.complainid) {
              this.systemServiceService.getOrdersbyId(result10[i].complainOrderId)
                .subscribe((result11: Orders) => {
                  this.systemServiceService.getCustomerDatabyId(result11.customerOrderId)
                    .subscribe((result12: Customer) => {
                      this.headname = result12.firstName;
                      this.emaildata = result12.email;

                      this.editorContentcustomer = '<p style="text-align: justify;"><img src="https://creative-red.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="width: 175px;" class="fr-fic fr-dib"></p>\n' +
                        '\n' +
                        '<h4 style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: blue;"><strong>Dear ' + this.headname + '</strong> <strong>,</strong></span></h4>\n' +
                        '\n' +
                        '<p style="line-height: 1.15;">\n' +
                        '\t<br>\n' +
                        '</p>\n' +
                        '\n' +
                        '<p style="line-height: 1.15;"><span id="spann" style="font-size: 16px;">' + this.emailbody + '</span></p>\n' +
                        '\n' +
                        '<p style="line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;"><br></span></p>\n' +
                        '\n' +
                        '<p style="text-align: left; line-height: 1.15;"><span style="font-size: 11px;"><span style="font-family: Arial,Helvetica,sans-serif;">Sincerely,</span></span></p>\n' +
                        '\n' +
                        '<p style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">creativered.com</span></p>\n' +
                        '\n' +
                        '<p class="fr-text-bordered"><span style="font-size: 12px;"><strong>Copyright 2019 creativered. All Rights Reserved. Website Designed and Developed by VulG24canD</strong></span></p>\n';

                    });
                });
            }
          }

        }, (error1 => {
          console.log(error1);
        })
      );

  }

  //====================================================================================================================

  //function of send email for customer
  sendmailforCustomer() {
    const emaildt = document.getElementById('spann').innerText;
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

        if (this.buttonType == 'Done') {
          for (var i = 0; i < this.complains.length; i++) {
            if (this.complains[i].id == this.complainid) {
              this.complains[i].status = 'true';
              this.systemServiceService.updateComplain(this.complains[i])
                .subscribe((result) => {
                    this.getUnseen();
                    this.dashboardservice.sendEmail({
                      to: this.emaildata,
                      subject: 'regarding your complain',
                      message: this.editorContentcustomer
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
                    const eml = localStorage.getItem('email');
                    const dte = new Date().toISOString().slice(0, 10);
                    const tme = new Date();
                    const tmme = tme.getHours() + ':' + tme.getMinutes() + ':' + tme.getSeconds();
                    this.systemServiceService.getUserData()
                      .subscribe((result: Array<AdminS>) => {
                        for (let i = 0; i < result.length; i++) {
                          if (result[i].email == eml) {
                            const comrplyu = new ComplainRply(dte + '', tmme + '', emaildt, this.complainid, result[i].id);
                            this.systemServiceService.saveComplainRply(comrplyu)
                              .subscribe((result3) => {
                                  console.log('done');
                                }, (error1 => {
                                  console.error(error1);
                                })
                              );
                          }
                        }
                      });

                  }, (error1 => {
                    console.log(error1);
                  })
                );
            }
          }
        } else if (this.buttonType == 'Complete') {
          Swal.fire(
            'Success',
            'Already done action ...!',
            'success'
          );
        }

      }
    });
  }
}
