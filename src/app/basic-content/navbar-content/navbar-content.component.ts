import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, Inject, OnInit} from '@angular/core';
import {Admin, AdminPas, AdminS, ForgetPassword} from '../../dto/Admin';
import {Router} from '@angular/router';
import {AdminServiceService} from '../../services/admin-service.service';
import {PlatformLocation} from '@angular/common';
import Swal from 'sweetalert2';
import {SystemServiceService} from '../../services/system-service.service';
import {Complain} from '../../dto/Complain';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.css']
})
export class NavbarContentComponent implements OnInit {

  username: String;
  email: String;
  password: String;
  displayStatus: String;
  oldusrName: String;
  id: 1;
  oldusr: string;
  complainsCount;
  complains: Complain[];

  // tslint:disable-next-line:max-line-length
  constructor(private complainService: SystemServiceService, @Inject(LOCAL_STORAGE) private localStorage: any, private router: Router, private adminservice: AdminServiceService, private location: PlatformLocation) {
    this.displayStatus = 'none';

  }

  ngOnInit() {
    this.refreshCount();
    this.getCountOfComplains();
  }

  public refreshCount() {
    this.complainService.currentIsCheckComplaint
      .subscribe((result) => {
        if (result) {
          this.getCountOfComplains();
          this.complainsCount = result;
        }
      }, (error1 => {

      }));
  }

  //====================================================================================================================

  //set number of complains
  getCountOfComplains() {
    this.complainService.getAllComplains()
      .subscribe((result) => {
          const values: Array<Complain> = result;
          const values1: Array<Complain> = [];
          for (var i = 0; i < values.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (values[i].status == 'false') {
              const lDate = new Date(values[i].comDate).toISOString().slice(0, 10);
              // tslint:disable-next-line:prefer-const
              var valObjct = new Complain(lDate, values[i].comTime, values[i].message, values[i].status, values[i].complainTypeID,
                values[i].id, values[i].complainOrderId);
              values1.push(valObjct);
            }
          }
          this.complains = values1;
          this.complainsCount = this.complains.length;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of checkPassword
  checkconfirm(passwrd, confrmpasswrd): boolean {
    if (passwrd == confrmpasswrd) {
      this.password = passwrd;
      return true;
    } else {
      const incs = document.getElementById('incorrectdiv') as HTMLElement;
      incs.style.display = 'block';
      const inc = document.getElementById('blank') as HTMLElement;
      inc.style.display = 'none';
      const incss = document.getElementById('userExist') as HTMLElement;
      incss.style.display = 'none';
      const incsss = document.getElementById('length') as HTMLElement;
      incsss.style.display = 'none';
      return false;
    }
  }

  //====================================================================================================================

  //function of logout
  logout() {

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
        this.localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/basic']);
      }
    });

  }

  //====================================================================================================================

  //function of add new admin
  register(usrName, mail, passwrd, confrmpasswrd) {
    if (usrName == '' || mail == '' || passwrd == '' || confrmpasswrd == '') {
      const inc = document.getElementById('blank') as HTMLElement;
      inc.style.display = 'block';
      const incs = document.getElementById('incorrectdiv') as HTMLElement;
      incs.style.display = 'none';
      const incss = document.getElementById('userExist') as HTMLElement;
      incss.style.display = 'none';
      const incsss = document.getElementById('length') as HTMLElement;
      incsss.style.display = 'none';
    } else {
      var first = new String(passwrd);
      var second = new String(confrmpasswrd);
      const length1 = first.length;
      const length2 = second.length;
      if (length1 === 8 && length2 === 8) {
        if (this.checkconfirm(passwrd, confrmpasswrd)) {
          var admin = new AdminS('', usrName, mail, false, passwrd);
          this.adminservice.addAdmin(admin)
            .subscribe((result: Admin) => {
                this.verifyUser(result.id);
                const inc = document.getElementById('userExist') as HTMLElement;
                inc.style.display = 'none';
              }, (error1 => {
                console.log(error1);
                const inc = document.getElementById('userExist') as HTMLElement;
                inc.style.display = 'block';
                const incs = document.getElementById('blank') as HTMLElement;
                incs.style.display = 'none';
                const incss = document.getElementById('incorrectdiv') as HTMLElement;
                incss.style.display = 'none';
                const incsss = document.getElementById('length') as HTMLElement;
                incsss.style.display = 'none';
              })
            );
        }
      } else {
        const inc = document.getElementById('blank') as HTMLElement;
        inc.style.display = 'none';
        const incs = document.getElementById('incorrectdiv') as HTMLElement;
        incs.style.display = 'none';
        const incss = document.getElementById('userExist') as HTMLElement;
        incss.style.display = 'none';
        const incsss = document.getElementById('length') as HTMLElement;
        incsss.style.display = 'block';
      }
    }

  }

  //====================================================================================================================

  //function of Reset Password
  editUser(oldPassword, newPassword, confirmPassword) {
    if (oldPassword == '' || newPassword == '' || confirmPassword == '') {
      const inc = document.getElementById('fields') as HTMLElement;
      inc.style.display = 'block';
      const incs = document.getElementById('IncorrectOldPassword') as HTMLElement;
      incs.style.display = 'none';
    } else {
      if (newPassword !== confirmPassword) {
        const inc = document.getElementById('IncorrectOldPassword') as HTMLElement;
        inc.style.display = 'block';
        const incs = document.getElementById('fields') as HTMLElement;
        incs.style.display = 'none';
      } else {
        var admin = new AdminPas(oldPassword, newPassword);
        this.adminservice.resetPassword(admin)
          .subscribe((result) => {
              Swal.fire(
                'Success',
                'Successfully password was changed !',
                'success'
              );
            }, (error1 => {
              Swal.fire('Current password is incorrect !');
            })
          );
      }
    }
  }

  //====================================================================================================================

  //function of verifyUser
  verifyUser(userId) {
    this.adminservice.verifyAdmin(userId)
      .subscribe((result) => {
          Swal.fire(
            'Success',
            'Verify link send !',
            'success'
          );
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of forget password
  forgetUser(email, newPassword) {
    if (email === '' || newPassword === '') {
      const inc = document.getElementById('field') as HTMLElement;
      inc.style.display = 'block';
    } else {
      // Call the service of forget password
      const obj = new ForgetPassword(email);
      this.adminservice.forgetPassword(obj)
        .subscribe((result) => {
            Swal.fire('check your email !');
          }, (error1 => {
            Swal.fire('email is not valid !');
          })
        );
    }
  }

}
