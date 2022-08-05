import {Component, OnInit} from '@angular/core';
import {ReportsServiceService} from '../../../services/reports-service.service';
import {DashboardServiceService} from '../../../services/dashboard-service.service';
import {CustomerAccountsServiceService} from '../../../services/customer-accounts-service.service';
import {ProductServiceService} from '../../../services/product-service.service';
import {SystemServiceService} from '../../../services/system-service.service';
import {Items, ItemsReport} from '../../../dto/Items';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';

import {ShippingAddress} from '../../../dto/ShippingAddress';
// @ts-ignore
import * as continents from '../../../../../continent.json';
import {Orders} from '../../../dto/Orders';
import {OrderDetail} from '../../../dto/OrderDetail';
// const { google } = require('googleapis');
// const key = require('../../../../../authkey.json');
// const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
// const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes);
// const view_id = '194487183';

// process.env.GOOGLE_APPLICATION_CREDENTIALS = './auth.json'

@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.css']
})
export class ReportsContentComponent implements OnInit {

  public itemName;
  public itemBrand;
  public itemQtyOnHand;
  public itemPrice;
  public itemHighlights;
  public shippingcountries: Array<any> = [];
  public shipdata: Array<any> = [];
  public orderscount: Array<any> = [];
  public years: Array<string> = [];

  public shipping: number;
  public unshipping: number;
  public shippingPercentage;
  public unShippingPercentage;

  public selectedLabel;
  public ordersCount;
  public customersCount;
  public productsCount;
  public complainsCount;
  public itemLimitation = 10;
  public item: ItemsReport[];
  public orderData: Orders[];
  public curdate: string;
  public continetdatas: Array<any> = [];
  newcount1: number;
  newcount2: number;
  newcount3: number;
  newcount4: number;
  newcount5: number;
  newcount6: number;
  newcounttotal: number;
  showSpinner: boolean = true;
  public months: Array<string> = [];
  public yearWithMonth: Array<any> = [];
  public orderCount: Array<any> = [];
  public orderdetailsdata: {
    orderDetailID: number;
    itemID: number;
    qtyCount: number;
  };
  public itemQuantity: {
    itemID: number;
    itemQty: number;
  };
  public finalitemarray: Items[];
  public orderDatas: Array<number> = [];
  public dateStrings: Array<string> = [];
  title = 'app';
  public dataSource: Object;

  constructor(private reportService: ReportsServiceService, private ordersSerivice: DashboardServiceService,
              private customerService: CustomerAccountsServiceService, private productService: ProductServiceService,
              private complainService: SystemServiceService) {

  }

  ngOnInit() {
    this.getCountOfComplains();
    this.getCountOfCustomers();
    this.getCountOfItems();
    this.getCountOfOrders();
    this.getHitsItemsFromLimit(10);
    this.filterByYear(5);
    this.getCountrycount();
    this.getTopSellings('all', '', '');
    var datee = new Date().toISOString().slice(0, 10);
    this.curdate = datee;
    this.getReportData();
  }


  // ***********************************************************************************************************************


  // ********************************************************************************************************************
  //====================================================================================================================

  getTopSellings(typeval, startdateinput, enddateinput) {

    if (typeval == 'all') {

      let allorderdetailcount: Array<any> = [];
      let itemcount: Array<any> = [];
      let itemonly: Array<any> = [];
      this.reportService.getAllOrderDetails()
        .subscribe((result: Array<OrderDetail>) => {
            for (let i = 0; i < result.length; i++) {
              this.orderdetailsdata = {
                orderDetailID: result[i].id,
                itemID: result[i].itemid,
                qtyCount: result[i].qty
              };
              allorderdetailcount.push(this.orderdetailsdata);
              itemcount.push(result[i].itemid);
            }
            var arr = itemcount;
            var map = arr.reduce(function (prev, cur) {
              prev[cur] = (prev[cur] || 0) + 1;
              return prev;
            }, {});

            for (let u = 0; u < Object.keys(map).length; u++) {
              var key = Object.keys(map)[u];
              itemonly.push(key);
            }

            this.calculateitemQty(allorderdetailcount, itemonly);
          }, (error1 => {
            console.log(error1);
          })
        );

    } else if (typeval == 'lastWeek') {

      let neworderdetail: Array<OrderDetail> = [];
      let datee = new Date();
      let nowdate = datee.toISOString().slice(0, 10);
      let daterr = datee.setDate(datee.getDate() - 7);
      let dater = new Date(daterr);
      let finaldate = dater.toISOString().slice(0, 10);

      this.reportService.searchDatabyDate(finaldate, nowdate)
        .subscribe((result: Array<Orders>) => {
          this.reportService.getAllOrderDetails()
            .subscribe((result1: Array<OrderDetail>) => {
              for (let u = 0; u < result.length; u++) {
                for (let i = 0; i < result1.length; i++) {
                  if (result[u].id == result1[i].orderid) {
                    neworderdetail.push(result1[i]);
                  }
                }
              }
              this.itemsellingCount(neworderdetail);
            }, (error1 => {
              console.log(error1);
            }));
        });


    } else if (typeval == 'lastMonth') {

      let neworderdetail: Array<OrderDetail> = [];
      let datee = new Date();
      let nowdate = datee.toISOString().slice(0, 10);
      let daterr = datee.setMonth(datee.getMonth() - 1);
      let dater = new Date(daterr);
      let finaldate = dater.toISOString().slice(0, 10);

      this.reportService.searchDatabyDate(finaldate, nowdate)
        .subscribe((result: Array<Orders>) => {
          this.reportService.getAllOrderDetails()
            .subscribe((result1: Array<OrderDetail>) => {
              for (let u = 0; u < result.length; u++) {
                for (let i = 0; i < result1.length; i++) {
                  if (result[u].id == result1[i].orderid) {
                    neworderdetail.push(result1[i]);
                  }
                }
              }
              this.itemsellingCount(neworderdetail);
            }, (error1 => {
              console.log(error1);
            }));
        });

    } else if (typeval == 'lastYear') {

      let neworderdetail: Array<OrderDetail> = [];
      let datee = new Date();
      let nowdate = datee.toISOString().slice(0, 10);
      let daterr = datee.setMonth(datee.getMonth() - 12);
      let dater = new Date(daterr);
      let finaldate = dater.toISOString().slice(0, 10);

      this.reportService.searchDatabyDate(finaldate, nowdate)
        .subscribe((result: Array<Orders>) => {
          this.reportService.getAllOrderDetails()
            .subscribe((result1: Array<OrderDetail>) => {
              for (let u = 0; u < result.length; u++) {
                for (let i = 0; i < result1.length; i++) {
                  if (result[u].id == result1[i].orderid) {
                    neworderdetail.push(result1[i]);
                  }
                }
              }
              this.itemsellingCount(neworderdetail);
            }, (error1 => {
              console.log(error1);
            }));
        });
    } else if (typeval == 'daterange') {

      let neworderdetail: Array<OrderDetail> = [];
      this.reportService.searchDatabyDate(startdateinput, enddateinput)
        .subscribe((result: Array<Orders>) => {
          this.reportService.getAllOrderDetails()
            .subscribe((result1: Array<OrderDetail>) => {
              for (let u = 0; u < result.length; u++) {
                for (let i = 0; i < result1.length; i++) {
                  if (result[u].id == result1[i].orderid) {
                    neworderdetail.push(result1[i]);
                  }
                }
              }
              this.itemsellingCount(neworderdetail);
            }, (error1 => {
              console.log(error1);
            }));
        });

    }
  }

  getReportData() {
    this.reportService.getReportDataa({
      'reportRequests':
        [
          {
            'viewId': '194283595',
            'dateRanges': [{'startDate': '2019-05-01', 'endDate': '2015-05-03'}],
            'metrics': [{'expression': 'ga:users'}]
          }
        ]
    }).subscribe((result) => {
      alert(result);
    }, (error1 => {
      console.log(error1);
    }));
  }


  itemsellingCount(orderdetailarray) {
    let allorderdetailcount: Array<any> = [];
    let itemcount: Array<any> = [];
    let itemonly: Array<any> = [];
    for (let i = 0; i < orderdetailarray.length; i++) {
      this.orderdetailsdata = {
        orderDetailID: orderdetailarray[i].orderid,
        itemID: orderdetailarray[i].itemid,
        qtyCount: orderdetailarray[i].qty
      };
      allorderdetailcount.push(this.orderdetailsdata);
      itemcount.push(orderdetailarray[i].itemid);
    }
    var arr = itemcount;
    var map = arr.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    for (let u = 0; u < Object.keys(map).length; u++) {
      var key = Object.keys(map)[u];
      itemonly.push(key);
    }

    this.calculateitemQty(allorderdetailcount, itemonly);

  }

  calculateitemQty(allordercount, itemids) {
    let finalitemCount: Array<any> = [];
    for (let i = 0; i < itemids.length; i++) {
      let qtycount = 0;
      for (let u = 0; u < allordercount.length; u++) {
        if (itemids[i] == allordercount[u].itemID) {
          qtycount += allordercount[u].qtyCount;
        }
      }
      this.itemQuantity = {
        itemID: itemids[i],
        itemQty: qtycount
      };
      finalitemCount.push(this.itemQuantity);
    }
    this.setFinalTableResult(finalitemCount);
  }

  setFinalTableResult(finalval) {
    this.finalitemarray = [];
    for (let t = 0; t < finalval.length; t++) {
      this.reportService.getItembyID(finalval[t].itemID)
        .subscribe((result: Items) => {
            let fullprice = finalval[t].itemQty * result.price;
            let itemobj = new Items(result.name, result.brand, finalval[t].itemQty, fullprice, '', '',
              '', '', '', 0, '', 0, 0, 0, 0,
              result.id);
            this.finalitemarray.push(itemobj);
          }, (error1 => {
            console.log(error1);
          })
        );
    }
  }

  setContinentData() {
    this.dataSource = {
      'chart': {
        'caption': '',
        'subcaption': '',
        'numbersuffix': '%',
        'includevalueinlabels': '1',
        'labelsepchar': ': ',
        'entityFillHoverColor': '#ffcbd4',
        'theme': 'fusion'
      },
      // Aesthetics; ranges synced with the slider
      'colorrange': {
        'minvalue': '0',
        'code': '#ffd3b3',
        'gradient': '1',
        'color': [{
          'minvalue': '10',
          'maxvalue': '20',
          'color': '#ff9290'
        }, {
          'minvalue': '20',
          'maxvalue': '30',
          'color': '#fb7f6c'
        }, {
          'minvalue': '30',
          'maxvalue': '40',
          'color': '#d64c45'
        }, {
          'minvalue': '30',
          'maxvalue': '40',
          'color': '#ff6953'
        }, {
          'minvalue': '40',
          'maxvalue': '50',
          'color': '#fd3f2e'
        }, {
          'minvalue': '50',
          'maxvalue': '60',
          'color': '#941d1b'
        }, {
          'minvalue': '60',
          'maxvalue': '70',
          'color': '#711615'
        }, {
          'minvalue': '70',
          'maxvalue': '80',
          'color': '#660d04'
        }, {
          'minvalue': '90',
          'maxvalue': '100',
          'color': '#470113'
        }]
      },
      'data': [{
        'id': 'NA',
        'value': (this.newcount1 / this.newcounttotal) * 100,
        'showLabel': '1'
      }, {
        'id': 'SA',
        'value': (this.newcount2 / this.newcounttotal) * 100,
        'showLabel': '1'
      }, {
        'id': 'AS',
        'value': (this.newcount3 / this.newcounttotal) * 100,
        'showLabel': '1'
      }, {
        'id': 'EU',
        'value': (this.newcount4 / this.newcounttotal) * 100,
        'showLabel': '1'
      }, {
        'id': 'AF',
        'value': (this.newcount5 / this.newcounttotal) * 100,
        'showLabel': '1'
      }, {
        'id': 'AU',
        'value': (this.newcount6 / this.newcounttotal) * 100,
        'showLabel': '1'
      }]
    };
  }

  //====================================================================================================================

  //function of count of continent
  public calculateCountries() {
    this.newcount1 = 0;
    this.newcount2 = 0;
    this.newcount3 = 0;
    this.newcount4 = 0;
    this.newcount5 = 0;
    this.newcount6 = 0;
    this.newcounttotal = 0;
    let na = continents.NA;
    let sa = continents.SA;
    let as = continents.AS;
    let eu = continents.EU;
    let af = continents.AF;
    let au = continents.AU;

    let newna: Array<any> = na.split(',');
    let newsa: Array<any> = sa.split(',');
    let newas: Array<any> = as.split(',');
    let neweu: Array<any> = eu.split(',');
    let newaf: Array<any> = af.split(',');
    let newau: Array<any> = au.split(',');
    this.continetdatas = [newna, newsa, newas, neweu, newaf, newau];

    for (let i = 0; i < this.continetdatas.length; i++) {
      for (let u = 0; u < this.continetdatas[i].length; u++) {
        for (let r = 0; r < this.shippingcountries.length; r++) {
          if (this.continetdatas[i][u] == this.shippingcountries[r]) {
            let countrycnt = this.orderscount[r];
            switch (i) {
              case 0 :
                this.newcount1 += countrycnt;
                break;

              case 1 :
                this.newcount2 += countrycnt;
                break;

              case 2 :
                this.newcount3 += countrycnt;
                break;

              case 3 :
                this.newcount4 += countrycnt;
                break;

              case 4 :
                this.newcount5 += countrycnt;
                break;

              case 5 :
                this.newcount6 += countrycnt;
                break;
            }
          }
        }
      }
    }
    this.newcounttotal = this.newcount1 + this.newcount2 + this.newcount3 + this.newcount4 + this.newcount5 + this.newcount6;
    this.setContinentData();
  }

  //====================================================================================================================

  //function of get count of countries
  public getCountrycount() {
    this.getAllOrders();
    this.reportService.getCountryCount()
      .subscribe((result: Array<ShippingAddress>) => {
          for (let i = 0; i < result.length; i++) {
            for (let u = 0; u < this.orderData.length; u++) {
              if (result[i].id == this.orderData[u].shippingid) {
                this.shipdata.push(result[i].country);
              }
            }
          }
          var arr = this.shipdata;
          var map = arr.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
          }, {});

          for (let u = 0; u < Object.keys(map).length; u++) {
            var key = Object.keys(map)[u];
            var mapElement = Object.values(map)[u];
            this.shippingcountries.push(key);
            this.orderscount.push(mapElement);
          }
          this.barChartLabels2 = this.shippingcountries;
          this.barChartData2[0].data = this.orderscount;
          this.calculateCountries();
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  getAllOrders() {
    this.reportService.getAllOrders()
      .subscribe((result: Array<Orders>) => {
          this.orderData = result;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of search data by date
  searchbyDate(startdateinput, enddateinput) {
    this.shippingcountries = [];
    this.orderscount = [];
    this.shipdata = [];
    this.reportService.searchDatabyDate(startdateinput, enddateinput)
      .subscribe((result: Array<Orders>) => {
          this.reportService.getCountryCount()
            .subscribe((result1: Array<ShippingAddress>) => {
                for (let i = 0; i < result.length; i++) {
                  for (let u = 0; u < result1.length; u++) {
                    if (result[i].shippingid == result1[u].id) {
                      this.shipdata.push(result1[u].country);
                    }
                  }
                }
                var arr = this.shipdata;
                var map = arr.reduce(function (prev, cur) {
                  prev[cur] = (prev[cur] || 0) + 1;
                  return prev;
                }, {});

                for (let u = 0; u < Object.keys(map).length; u++) {
                  var key = Object.keys(map)[u];
                  var mapElement = Object.values(map)[u];
                  this.shippingcountries.push(key);
                  this.orderscount.push(mapElement);
                }

                this.barChartLabels2 = this.shippingcountries;
                this.barChartData2[0].data = this.orderscount;
                this.calculateCountries();
              }, (error1 => {
                console.log(error1);
              })
            );
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        barPercentage: 0.1,
        ticks: {
          mirror: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          mirror: false
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels2: string[] = [''];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#D60D39',
      borderColor: '#D60D39',
      pointBackgroundColor: '#D60D39',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#D60D39'
    }];

  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Orders'}
  ];

  public barChartData2: ChartDataSets[] = [
    {data: [], label: 'Orders'}
  ];

  //====================================================================================================================

  filterByYear(value) {
    if (value == 0) {
      this.selectedLabel = 'from launch';
    } else {
      this.selectedLabel = 'Past ' + value + ' years';
    }

    this.months = [];
    this.barChartLabels = [];
    this.yearWithMonth = [];
    this.barChartData[0].data = [];
    this.orderCount = [];

    var fro = new Date();
    var t = new Date();

    if (value == 5) {
      fro.setFullYear(fro.getFullYear() - value);
      var from = fro.toISOString().slice(0, 10);
      var to = t.toISOString().slice(0, 10);

      this.ordersSerivice.getOrdersByDateRanges(from, to)
        .subscribe((result: Orders[]) => {
            for (var i = 0; i < result.length; i++) {
              this.months.push(new Date(result[i].orderDate).toISOString().slice(0, 4));
            }
            var arr = this.months;
            var map = arr.reduce(function (prev, cur) {
              prev[cur] = (prev[cur] || 0) + 1;
              return prev;
            }, {});

            for (let u = 0; u < Object.keys(map).length; u++) {
              var key = Object.keys(map)[u];
              var mapElement = Object.values(map)[u];
              this.yearWithMonth.push(key);
              this.orderCount.push(mapElement);
            }

            this.barChartLabels = this.yearWithMonth;
            this.barChartData[0].data = this.orderCount;

          }, (error1 => {
            console.log(error1);
          })
        );
    } else if (value == 2) {
      fro.setFullYear(fro.getFullYear() - value);
      var from = fro.toISOString().slice(0, 10);
      var to = t.toISOString().slice(0, 10);

      this.ordersSerivice.getOrdersByDateRanges(from, to)
        .subscribe((result: Orders[]) => {
            for (var i = 0; i < result.length; i++) {
              this.months.push(new Date(result[i].orderDate).toISOString().slice(0, 4));
            }
            var arr = this.months;
            var map = arr.reduce(function (prev, cur) {
              prev[cur] = (prev[cur] || 0) + 1;
              return prev;
            }, {});

            for (let u = 0; u < Object.keys(map).length; u++) {
              var key = Object.keys(map)[u];
              var mapElement = Object.values(map)[u];
              this.yearWithMonth.push(key);
              this.orderCount.push(mapElement);
            }

            this.barChartLabels = this.yearWithMonth;
            this.barChartData[0].data = this.orderCount;

          }, (error1 => {
            console.log(error1);
          })
        );
    } else if (value == 0) {
      var from = '2019-04-19';
      var to = t.toISOString().slice(0, 10);

      this.ordersSerivice.getOrdersByDateRanges(from, to)
        .subscribe((result: Orders[]) => {
            for (var i = 0; i < result.length; i++) {
              this.months.push(new Date(result[i].orderDate).toISOString().slice(0, 4));
            }
            var arr = this.months;
            var map = arr.reduce(function (prev, cur) {
              prev[cur] = (prev[cur] || 0) + 1;
              return prev;
            }, {});

            for (let u = 0; u < Object.keys(map).length; u++) {
              var key = Object.keys(map)[u];
              var mapElement = Object.values(map)[u];
              this.yearWithMonth.push(key);
              this.orderCount.push(mapElement);
            }

            this.barChartLabels = this.yearWithMonth;
            this.barChartData[0].data = this.orderCount;

          }, (error1 => {
            console.log(error1);
          })
        );
    }
  }

  //====================================================================================================================

  filterByMonth(value) {
    this.selectedLabel = 'Past ' + value + ' months';
    this.months = [];
    this.barChartLabels = [];
    this.yearWithMonth = [];
    this.barChartData[0].data = [];
    this.orderCount = [];

    var fro = new Date();
    fro.setMonth(fro.getMonth() - value);

    var from = fro.toISOString().slice(0, 10);
    var to = new Date().toISOString().slice(0, 10);

    this.ordersSerivice.getOrdersByDateRanges(from, to)
      .subscribe((result: Orders[]) => {
          for (var i = 0; i < result.length; i++) {
            this.months.push(new Date(result[i].orderDate).toISOString().slice(0, 7));
          }
          var arr = this.months;
          var map = arr.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
          }, {});

          for (let u = 0; u < Object.keys(map).length; u++) {
            var key = Object.keys(map)[u];
            var mapElement = Object.values(map)[u];
            this.yearWithMonth.push(key);
            this.orderCount.push(mapElement);
          }

          this.barChartLabels = this.yearWithMonth;
          this.barChartData[0].data = this.orderCount;

        }, (error1 => {
          console.log(error1);
        })
      );

  }

  //====================================================================================================================

  filterByQuater(value) {
    localStorage.removeItem('labels');

    this.orderDatas = [];
    this.dateStrings = [];
    this.months = [];
    this.barChartLabels = [];
    this.yearWithMonth = [];
    this.barChartData[0].data = [];
    this.orderCount = [];

    let one;
    let two;
    let three;
    let four;
    let five;
    let six;
    let seven;
    let eight;
    let nine;
    let ten;
    let eleven;
    let twelve;

    var fromDate;
    var toDate;
    var fromDate2;
    var toDate2;
    var fromDate3;
    var toDate3;
    var fromDate4;
    var toDate4;

    var fromDate5;
    var toDate5;
    var fromDate6;
    var toDate6;
    var fromDate7;
    var toDate7;
    var fromDate8;
    var toDate8;

    var fromDate9;
    var toDate9;
    var fromDate10;
    var toDate10;
    var fromDate11;
    var toDate11;
    var fromDate12;
    var toDate12;

    var to = new Date();
    var today = new Date().toISOString().slice(0, 10);

    if (to.getMonth() + 1 == 1 || to.getMonth() + 1 == 2 || to.getMonth() + 1 == 3) {
      one = 'Q1';
    } else if (to.getMonth() + 1 == 4 || to.getMonth() + 1 == 5 || to.getMonth() + 1 == 6) {
      one = 'Q2';
    } else if (to.getMonth() + 1 == 7 || to.getMonth() + 1 == 8 || to.getMonth() + 1 == 9) {
      one = 'Q3';
    } else if (to.getMonth() + 1 == 10 || to.getMonth() + 1 == 11 || to.getMonth() + 1 == 12) {
      one = 'Q4';
    }

    // Selected the 4 value
    if (value == 4) {
      this.selectedLabel = 'Past 4 quaters';

      if (one == 'Q1') {
        fromDate = to.getFullYear() + '-' + '01-01';
        toDate = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q4';
        fromDate2 = to.getFullYear() + '-' + '10-01';
        toDate2 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q3';
        fromDate3 = to.getFullYear() + '-' + '07-01';
        toDate3 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q2';
        fromDate4 = to.getFullYear() + '-' + '04-01';
        toDate4 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

      } else if (one == 'Q2') {
        fromDate = to.getFullYear() + '-' + '04-01';
        toDate = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q1';
        fromDate2 = to.getFullYear() + '-' + '01-01';
        toDate2 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q4';
        fromDate3 = to.getFullYear() + '-' + '10-01';
        toDate3 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q3';
        fromDate4 = to.getFullYear() + '-' + '07-01';
        toDate4 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

      } else if (one == 'Q3') {
        fromDate = to.getFullYear() + '-' + '07-01';
        toDate = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q2';
        fromDate2 = to.getFullYear() + '-' + '04-01';
        toDate2 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q1';
        fromDate3 = to.getFullYear() + '-' + '01-01';
        toDate3 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q4';
        fromDate4 = to.getFullYear() + '-' + '10-01';
        toDate4 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);
      } else if (one == 'Q4') {
        fromDate = to.getFullYear() + '-' + '10-01';
        toDate = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q3';
        fromDate2 = to.getFullYear() + '-' + '07-01';
        toDate2 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q2';
        fromDate3 = to.getFullYear() + '-' + '04-01';
        toDate3 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q1';
        fromDate4 = to.getFullYear() + '-' + '01-01';
        toDate4 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);
      }

      this.dateStrings.push(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4);
      this.getOne(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
        , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
        , fromDate11, toDate11, fromDate12, toDate12);


      // Selected the 8 value
    } else if (value == 8) {
      this.selectedLabel = 'Past 8 quaters';

      if (one == 'Q1') {
        fromDate = to.getFullYear() + '-' + '01-01';
        toDate = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q4';
        fromDate2 = to.getFullYear() + '-' + '10-01';
        toDate2 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q3';
        fromDate3 = to.getFullYear() + '-' + '07-01';
        toDate3 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q2';
        fromDate4 = to.getFullYear() + '-' + '04-01';
        toDate4 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q1';
        fromDate5 = to.getFullYear() + '-' + '01-01';
        toDate5 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q4';
        fromDate6 = to.getFullYear() + '-' + '10-01';
        toDate6 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q3';
        fromDate7 = to.getFullYear() + '-' + '07-01';
        toDate7 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q2';
        fromDate8 = to.getFullYear() + '-' + '04-01';
        toDate8 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);

      } else if (one == 'Q2') {
        fromDate = to.getFullYear() + '-' + '04-01';
        toDate = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q1';
        fromDate2 = to.getFullYear() + '-' + '01-01';
        toDate2 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q4';
        fromDate3 = to.getFullYear() + '-' + '10-01';
        toDate3 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q3';
        fromDate4 = to.getFullYear() + '-' + '07-01';
        toDate4 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q2';
        fromDate5 = to.getFullYear() + '-' + '04-01';
        toDate5 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q1';
        fromDate6 = to.getFullYear() + '-' + '01-01';
        toDate6 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q4';
        fromDate7 = to.getFullYear() + '-' + '10-01';
        toDate7 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q3';
        fromDate8 = to.getFullYear() + '-' + '07-01';
        toDate8 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);
      } else if (one == 'Q3') {
        fromDate = to.getFullYear() + '-' + '07-01';
        toDate = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q2';
        fromDate2 = to.getFullYear() + '-' + '04-01';
        toDate2 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q1';
        fromDate3 = to.getFullYear() + '-' + '01-01';
        toDate3 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q4';
        fromDate4 = to.getFullYear() + '-' + '10-01';
        toDate4 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q3';
        fromDate5 = to.getFullYear() + '-' + '07-01';
        toDate5 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q2';
        fromDate6 = to.getFullYear() + '-' + '04-01';
        toDate6 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q1';
        fromDate7 = to.getFullYear() + '-' + '01-01';
        toDate7 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q4';
        fromDate8 = to.getFullYear() + '-' + '10-01';
        toDate8 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);
      } else if (one == 'Q4') {
        fromDate = to.getFullYear() + '-' + '10-01';
        toDate = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q3';
        fromDate2 = to.getFullYear() + '-' + '07-01';
        toDate2 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q2';
        fromDate3 = to.getFullYear() + '-' + '04-01';
        toDate3 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q1';
        fromDate4 = to.getFullYear() + '-' + '01-01';
        toDate4 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q4';
        fromDate5 = to.getFullYear() + '-' + '10-01';
        toDate5 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q3';
        fromDate6 = to.getFullYear() + '-' + '07-01';
        toDate6 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q2';
        fromDate7 = to.getFullYear() + '-' + '04-01';
        toDate7 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q1';
        fromDate8 = to.getFullYear() + '-' + '01-01';
        toDate8 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);
      }

      this.dateStrings.push(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
        , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8);
      this.getOne(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
        , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
        , fromDate11, toDate11, fromDate12, toDate12);
    }



    // selected the 12 value
    else if (value == 12) {
      this.selectedLabel = 'Past 12 quaters';

      if (one == 'Q1') {
        fromDate = to.getFullYear() + '-' + '01-01';
        toDate = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q4';
        fromDate2 = to.getFullYear() + '-' + '10-01';
        toDate2 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q3';
        fromDate3 = to.getFullYear() + '-' + '07-01';
        toDate3 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q2';
        fromDate4 = to.getFullYear() + '-' + '04-01';
        toDate4 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q1';
        fromDate5 = to.getFullYear() + '-' + '01-01';
        toDate5 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q4';
        fromDate6 = to.getFullYear() + '-' + '10-01';
        toDate6 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q3';
        fromDate7 = to.getFullYear() + '-' + '07-01';
        toDate7 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q2';
        fromDate8 = to.getFullYear() + '-' + '04-01';
        toDate8 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);

        to.setMonth(to.getMonth() - 3);

        nine = 'Q1';
        fromDate9 = to.getFullYear() + '-' + '01-01';
        toDate9 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + nine);

        to.setMonth(to.getMonth() - 3);

        ten = 'Q4';
        fromDate10 = to.getFullYear() + '-' + '10-01';
        toDate10 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + ten);

        to.setMonth(to.getMonth() - 3);

        eleven = 'Q3';
        fromDate11 = to.getFullYear() + '-' + '07-01';
        toDate11 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eleven);

        to.setMonth(to.getMonth() - 3);

        twelve = 'Q2';
        fromDate12 = to.getFullYear() + '-' + '04-01';
        toDate12 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + twelve);

      } else if (one == 'Q2') {
        fromDate = to.getFullYear() + '-' + '04-01';
        toDate = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q1';
        fromDate2 = to.getFullYear() + '-' + '01-01';
        toDate2 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q4';
        fromDate3 = to.getFullYear() + '-' + '10-01';
        toDate3 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q3';
        fromDate4 = to.getFullYear() + '-' + '07-01';
        toDate4 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q2';
        fromDate5 = to.getFullYear() + '-' + '04-01';
        toDate5 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q1';
        fromDate6 = to.getFullYear() + '-' + '01-01';
        toDate6 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q4';
        fromDate7 = to.getFullYear() + '-' + '10-01';
        toDate7 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q3';
        fromDate8 = to.getFullYear() + '-' + '07-01';
        toDate8 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);

        to.setMonth(to.getMonth() - 3);

        nine = 'Q2';
        fromDate9 = to.getFullYear() + '-' + '04-01';
        toDate9 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + nine);

        to.setMonth(to.getMonth() - 3);

        ten = 'Q1';
        fromDate10 = to.getFullYear() + '-' + '01-01';
        toDate10 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + ten);

        to.setMonth(to.getMonth() - 3);

        eleven = 'Q4';
        fromDate11 = to.getFullYear() + '-' + '10-01';
        toDate11 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eleven);

        to.setMonth(to.getMonth() - 3);

        twelve = 'Q3';
        fromDate12 = to.getFullYear() + '-' + '07-01';
        toDate12 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + twelve);
      } else if (one == 'Q3') {
        fromDate = to.getFullYear() + '-' + '07-01';
        toDate = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q2';
        fromDate2 = to.getFullYear() + '-' + '04-01';
        toDate2 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q1';
        fromDate3 = to.getFullYear() + '-' + '01-01';
        toDate3 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q4';
        fromDate4 = to.getFullYear() + '-' + '10-01';
        toDate4 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q3';
        fromDate5 = to.getFullYear() + '-' + '07-01';
        toDate5 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q2';
        fromDate6 = to.getFullYear() + '-' + '04-01';
        toDate6 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q1';
        fromDate7 = to.getFullYear() + '-' + '01-01';
        toDate7 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q4';
        fromDate8 = to.getFullYear() + '-' + '10-01';
        toDate8 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);

        to.setMonth(to.getMonth() - 3);

        nine = 'Q3';
        fromDate9 = to.getFullYear() + '-' + '07-01';
        toDate9 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + nine);

        to.setMonth(to.getMonth() - 3);

        ten = 'Q2';
        fromDate10 = to.getFullYear() + '-' + '04-01';
        toDate10 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + ten);

        to.setMonth(to.getMonth() - 3);

        eleven = 'Q1';
        fromDate11 = to.getFullYear() + '-' + '01-01';
        toDate11 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eleven);

        to.setMonth(to.getMonth() - 3);

        twelve = 'Q4';
        fromDate12 = to.getFullYear() + '-' + '10-01';
        toDate12 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + twelve);
      } else if (one == 'Q4') {
        fromDate = to.getFullYear() + '-' + '10-01';
        toDate = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', to.getFullYear() + '-' + one);

        to.setMonth(to.getMonth() - 3);

        two = 'Q3';
        fromDate2 = to.getFullYear() + '-' + '07-01';
        toDate2 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + two);

        to.setMonth(to.getMonth() - 3);

        three = 'Q2';
        fromDate3 = to.getFullYear() + '-' + '04-01';
        toDate3 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + three);

        to.setMonth(to.getMonth() - 3);

        four = 'Q1';
        fromDate4 = to.getFullYear() + '-' + '01-01';
        toDate4 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + four);

        to.setMonth(to.getMonth() - 3);

        five = 'Q4';
        fromDate5 = to.getFullYear() + '-' + '10-01';
        toDate5 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + five);

        to.setMonth(to.getMonth() - 3);

        six = 'Q3';
        fromDate6 = to.getFullYear() + '-' + '07-01';
        toDate6 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + six);

        to.setMonth(to.getMonth() - 3);

        seven = 'Q2';
        fromDate7 = to.getFullYear() + '-' + '04-01';
        toDate7 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + seven);

        to.setMonth(to.getMonth() - 3);

        eight = 'Q1';
        fromDate8 = to.getFullYear() + '-' + '01-01';
        toDate8 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eight);

        to.setMonth(to.getMonth() - 3);

        nine = 'Q4';
        fromDate9 = to.getFullYear() + '-' + '10-01';
        toDate9 = to.getFullYear() + '-' + '12-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + nine);

        to.setMonth(to.getMonth() - 3);

        ten = 'Q3';
        fromDate10 = to.getFullYear() + '-' + '07-01';
        toDate10 = to.getFullYear() + '-' + '09-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + ten);

        to.setMonth(to.getMonth() - 3);

        eleven = 'Q2';
        fromDate11 = to.getFullYear() + '-' + '04-01';
        toDate11 = to.getFullYear() + '-' + '06-30';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + eleven);

        to.setMonth(to.getMonth() - 3);

        twelve = 'Q1';
        fromDate12 = to.getFullYear() + '-' + '01-01';
        toDate12 = to.getFullYear() + '-' + '03-31';

        localStorage.setItem('labels', localStorage.getItem('labels') + '+' + to.getFullYear() + '-' + twelve);
      }

      this.dateStrings.push(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
        , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8);
      this.getOne(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
        , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
        , fromDate11, toDate11, fromDate12, toDate12);
    }

  }

  check() {
    let lbl = localStorage.getItem('labels');
    let lblArray = lbl.split('+');
    this.barChartLabels = lblArray;
    this.barChartData[0].data = this.orderDatas;
  }

  //====================================================================================================================

  getHitsItemsFromLimit(value) {
    this.itemLimitation = value;
    this.productService.getItemsByHitsOrder(value)
      .subscribe((result: ItemsReport[]) => {
          this.item = result;
          this.showSpinner = false;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  //set number of orders
  getCountOfOrders() {
    this.ordersSerivice.getCountOfOrders()
      .subscribe((result) => {
          this.ordersCount = result.count;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  //set number of customer
  getCountOfCustomers() {
    this.customerService.getCountOfCustomers()
      .subscribe((result) => {
          this.customersCount = result.count;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  //set number of item
  getCountOfItems() {
    this.productService.getCountOfItems()
      .subscribe((result) => {
          this.productsCount = result.count;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  //set number of complains
  getCountOfComplains() {
    this.complainService.getCountOfComplains()
      .subscribe((result) => {
          this.complainsCount = result.count;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  private getOne(fromDate, toDate, fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
    , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
    , fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate, toDate)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getTwo(fromDate2, toDate2, fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
            , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
            , fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getTwo(fromDate2, toDate2, fromDat3, toDate3, fromDate4, toDate4, fromDate5, toDate5
    , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
    , fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate2, toDate2)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getThree(fromDat3, toDate3, fromDate4, toDate4, fromDate5, toDate5
            , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
            , fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getThree(fromDate3, toDate3, fromDate4, toDate4, fromDate5, toDate5
    , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
    , fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate3, toDate3)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getFour(fromDate4, toDate4, fromDate5, toDate5
            , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
            , fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getFour(fromDate4: any, toDate4: any, fromDate5, toDate5
    , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
    , fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate4, toDate4)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          if (fromDate5 != '') {
            this.getFive(fromDate5, toDate5
              , fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10, toDate10
              , fromDate11, toDate11, fromDate12, toDate12);
          } else {
            this.check();
          }
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getFive(fromDate5, toDate5, fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10,
                  toDate10, fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate5, toDate5)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getSix(fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10,
            toDate10, fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getSix(fromDate6, toDate6, fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10,
                 toDate10, fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate6, toDate6)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getSeven(fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10,
            toDate10, fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getSeven(fromDate7, toDate7, fromDate8, toDate8, fromDate9, toDate9, fromDate10,
                   toDate10, fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate7, toDate7)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getEight(fromDate8, toDate8, fromDate9, toDate9, fromDate10,
            toDate10, fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getEight(fromDate8, toDate8, fromDate9, toDate9, fromDate10,
                   toDate10, fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate8, toDate8)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          if (fromDate9 != '') {
            this.getNine(fromDate9, toDate9, fromDate10,
              toDate10, fromDate11, toDate11, fromDate12, toDate12);
          } else {
            this.check();
          }
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getNine(fromDate9, toDate9, fromDate10,
                  toDate10, fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate9, toDate9)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getTen(fromDate10,
            toDate10, fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getTen(fromDate10,
                 toDate10, fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate10, toDate10)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getEleven(fromDate11, toDate11, fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getEleven(fromDate11, toDate11, fromDate12, toDate12) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate11, toDate11)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.getTwelve(fromDate12, toDate12);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  private getTwelve(fromDate12: any, toDate12: any) {
    this.ordersSerivice.getOrdersByDateRanges(fromDate12, toDate12)
      .subscribe((result: Orders[]) => {
          this.orderDatas.push(result.length);
          this.check();
        }, (error1 => {
          console.log(error1);
        })
      );
  }

}

