import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Admin, Admin1} from '../dto/Admin';
import {AdminServiceService} from '../services/admin-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private router: Router, private adminServices: AdminServiceService) {
  }

  ngOnInit() {
    if (JSON.parse(this.localStorage.getItem('loggedIn'))) {
      this.router.navigate(['/basic']);
    }
  }

  login(email, passwordValue) {
    if (email == '' || passwordValue == '') {
      let inc = document.getElementById('fill') as HTMLElement;
      inc.style.display = 'block';
      let incs = document.getElementById('wrong') as HTMLElement;
      incs.style.display = 'none';
    } else {
      let inc = document.getElementById('fill') as HTMLElement;
      inc.style.display = 'none';
      let incs = document.getElementById('wrong') as HTMLElement;
      incs.style.display = 'none';
      let user = new Admin1(email, passwordValue);
      this.localStorage.setItem('email', email);
      this.localStorage.setItem('password', passwordValue);
      this.adminServices.adminLogin(user)
        .subscribe((result: Admin) => {
            var userIds = result.userId;
            this.localStorage.setItem('token', result.id.toString());
            this.verifiedTheEmail(userIds);
          }, (error1 => {
              let inc = document.getElementById('wrong') as HTMLElement;
              inc.style.display = 'block';
              let incs = document.getElementById('fill') as HTMLElement;
              incs.style.display = 'none';
            }
          )
        );
    }
  }

  verifiedTheEmail(userId) {
    this.adminServices.verifiedTheEmail(userId)
      .subscribe((result: Admin) => {
          if (result.emailVerified) {
            this.adminServices.setLoggedIn();
            this.router.navigate(['/basic']);
          } else {
            let incss = document.getElementById('verify') as HTMLElement;
            incss.style.display = 'block';
            let inc = document.getElementById('wrong') as HTMLElement;
            inc.style.display = 'none';
            let incs = document.getElementById('fill') as HTMLElement;
            incs.style.display = 'none';
          }
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  requestFocusToPassword(userName) {
    if (userName == '') {
      let incss = document.getElementById('verify') as HTMLElement;
      incss.style.display = 'none';
      let inc = document.getElementById('wrong') as HTMLElement;
      inc.style.display = 'none';
      let incs = document.getElementById('fill') as HTMLElement;
      incs.style.display = 'block';
    } else {
      let incss = document.getElementById('verify') as HTMLElement;
      incss.style.display = 'none';
      let inc = document.getElementById('wrong') as HTMLElement;
      inc.style.display = 'none';
      let incs = document.getElementById('fill') as HTMLElement;
      incs.style.display = 'none';
      let password = document.getElementById('pswdtxt') as HTMLElement;
      password.focus();
    }
  }

  requestFocusToBasic() {
    let btn = document.getElementById('btn1') as HTMLElement;
    btn.click();
  }

}
