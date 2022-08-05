import {Component, OnInit} from '@angular/core';
import {Orders} from '../../../dto/Orders';
import {Router} from '@angular/router';
import {DashboardServiceService} from '../../../services/dashboard-service.service';
import {AdminServiceService} from '../../../services/admin-service.service';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {

  orderss: Orders[];

  constructor(private router: Router, private dashboardService: DashboardServiceService,
              private adminServices: AdminServiceService, location: PlatformLocation) {
  }

  ngOnInit() {
    this.getUnshippedOrder(); //get All unship orders
  }


  //function of get all unship orders
  getUnshippedOrder() {
    this.dashboardService.getUnshippedData()
      .subscribe((result) => {
          this.orderss = result;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

}
