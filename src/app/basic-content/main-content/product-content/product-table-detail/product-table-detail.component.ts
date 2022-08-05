import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../../../services/product-service.service';
import {Items} from '../../../../dto/Items';
import {News, News1} from '../../../../dto/News';
import {Observable} from 'rxjs';
import {ImageserviceService} from '../../../../services/imageservice.service';
import Swal from 'sweetalert2';
import {Customer} from '../../../../dto/Customer';
import {DashboardServiceService} from '../../../../services/dashboard-service.service';
import {Wishlist} from '../../../../dto/Wishlist';

@Component({
  selector: 'app-product-table-detail',
  templateUrl: './product-table-detail.component.html',
  styleUrls: ['./product-table-detail.component.css']
})
export class ProductTableDetailComponent implements OnInit {

  constructor(private dashboardservice: DashboardServiceService, private upldfile: ImageserviceService, private ProductService: ProductServiceService) {
  }

  items: Items[];
  tempitem: Items = null;
  newss: News[];
  iddata = 0;
  headerin: string;
  datein: string;
  timein: string;
  descriptionin: string;
  itemidd: number;
  itid: number;
  prctid: number;
  catgryid: number;
  itmnm: string;
  itmHits: number;
  brandinputs: string;
  qtyonhandinputs: number;
  priceinputs: number;
  temppriceinputs: number;
  imageinputs: string;
  highlightsinputs: string;
  colorinputs: string;
  rateinputs: number;
  discountinputs: number;
  tempdiscountinputs: number;
  specification: string;
  overview: string;
  selecttedfile: FileList;
  itemss: Observable<Items>;
  showSpinner = true;
  imgarray: Array<string> = [];
  emails = '';
  newimgary: Array<String> = [];
  ittm: Items;
  hdd: string;
  dtee: string;
  statusinputs: string;
  actionType: string;
  wishlistarray: Wishlist[];
  subcustomer: Customer[];

  // End ControlValueAccesor methods.

  model: any;

  public editorContent: string;
  public editorContentSpec: string;
  public editorContentHighLight: string;

  config: Object = {
    charCounterCount: false,
  };

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  };

  // Begin ControlValueAccesor methods.
  onChange = (_) => {
  }
  onTouched = () => {
  }

  // Form model content changed.
  writeValue(content: any): void {
    this.model = content;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.getAllNews(); //get all news detail
    this.getActive(); //get all active items
    this.getWishListData(); //getAllwishlistdata
  }

  //====================================================================================================================

  //function if get all wishlist data
  getWishListData() {
    this.ProductService.getWishlistData()
      .subscribe((result) => {
          this.wishlistarray = result;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //function of delete item
  makeAction(actionType, itdt) {
    if (actionType == 'Delete') {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == itdt) {
          this.items[i].status = 'inactive';
          this.ProductService.updateItemChanges(this.items[i])
            .subscribe((result) => {
                this.getActive();
              }, (error1 => {
                console.log(error1);
              })
            );
        }
      }
    } else if (actionType == 'Replace') {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == itdt) {
          this.items[i].status = 'active';
          this.ProductService.updateItemChanges(this.items[i])
            .subscribe((result) => {
                this.getInactive();
              }, (error1 => {
                console.log(error1);
              })
            );
        }
      }
    }
  }

  // ===================================================================================================================

  //function of get active data
  getActive() {
    this.ProductService.getProductData()
      .subscribe((result) => {
          const active: Array<Items> = result;
          const active1: Array<Items> = [];
          for (var i = 0; i < active.length; i++) {
            if (active[i].status == 'active') {
              var itemObj = new Items(active[i].name, active[i].brand, active[i].qtyOnHand, active[i].price,
                active[i].image, active[i].status, active[i].highlights, active[i].specification, active[i].overview,
                active[i].hits, active[i].color, active[i].rate,
                active[i].discount, active[i].productid, 0, active[i].id);
              active1.push(itemObj);
            }
          }
          this.items = active1;
          this.actionType = 'Delete';
          this.itemss = this.ProductService.getProductData();
          this.itemss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  //function of get inactive data
  getInactive() {
    this.ProductService.getProductData()
      .subscribe((result) => {
          const inactive: Array<Items> = result;
          const inactive1: Array<Items> = [];
          for (var i = 0; i < inactive.length; i++) {
            if (inactive[i].status == 'inactive') {
              var itemObj = new Items(inactive[i].name, inactive[i].brand, inactive[i].qtyOnHand, inactive[i].price,
                inactive[i].image, inactive[i].status, inactive[i].highlights, inactive[i].specification,
                inactive[i].overview, inactive[i].hits, inactive[i].color, inactive[i].rate,
                inactive[i].discount, inactive[i].productid, 0, inactive[i].id);
              inactive1.push(itemObj);
            }
          }
          this.items = inactive1;
          this.actionType = 'Replace';
          this.itemss = this.ProductService.getProductData();
          this.itemss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  //funtion of upload image
  upload() {
    const file = this.selecttedfile.item(0);
    const number = Math.round(Math.random() * 10000000000000000) + 1;
    this.upldfile.uploadfile(file, number + file.name);
    // this.newimgary.push(number + file.name);
    setTimeout(() => {
      this.newimgary.push(number + file.name);
    }, 3000);
  }

  //====================================================================================================================

  //funtion of call upload service
  getImage(event) {
    this.selecttedfile = event.target.files;
  }

  //====================================================================================================================

  // function of item search by item id
  itemIdSearch(iddata: number) {
    this.ProductService.itemIdSearch(iddata)
      .subscribe((result: Items) => {
          this.items = [new Items(result.name, result.brand, result.qtyOnHand, result.price, result.image,
            result.status, result.highlights, result.specification, result.overview, result.hits, result.color, result.rate,
            result.discount, result.productid, result.categoryId, result.id)];
        }, (error => {
          console.log(error);
        })
      );
  }

  // ===================================================================================================================

  //function of product search by product id
  productIdSearch(prId: number) {
    this.ProductService.getProductData()
      .subscribe((result) => {
          const prd: Array<Items> = [];
          const prdd: Array<Items> = result;
          for (var i = 0; prdd.length > i; i++) {
            if (prdd[i].productid == prId) {
              prd.push(prdd[i]);
            }
          }
          this.items = prd;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  // update item details function
  UpdateItemss(itm: Items) {
    this.ittm = itm;
    this.headerin = '';
    this.descriptionin = '';
    const dt = new Date().toISOString().slice(0, 10);
    const tm = new Date().toTimeString().split(' ')[0];
    this.datein = dt;
    this.timein = tm;
    this.getAllNews();

    this.tempitem = itm;
    this.itmnm = itm.name;
    this.itmHits = itm.hits;
    this.brandinputs = itm.brand;
    this.qtyonhandinputs = itm.qtyOnHand;
    this.priceinputs = itm.price;
    this.imageinputs = itm.image;
    this.statusinputs = itm.status;
    this.highlightsinputs = itm.highlights;
    this.specification = itm.specification;
    this.overview = itm.overview;
    this.colorinputs = itm.color;
    this.rateinputs = itm.rate;
    this.discountinputs = itm.discount;
    this.itid = itm.id;
    this.prctid = itm.productid;
    this.catgryid = itm.categoryId;

    this.tempitem = new Items(this.itmnm, this.brandinputs, this.qtyonhandinputs, this.priceinputs, this.imageinputs,
      this.statusinputs, this.highlightsinputs, this.specification, this.overview, this.itmHits, this.colorinputs,
      this.rateinputs, this.discountinputs, this.prctid, this.catgryid, this.itid);

    const dd1 = document.getElementById('disitem1') as HTMLElement;
    dd1.style.display = 'none';
    const dd2 = document.getElementById('disitem2') as HTMLElement;
    dd2.style.display = 'none';
    const dd3 = document.getElementById('disitem3') as HTMLElement;
    dd3.style.display = 'none';
  }

  // ===================================================================================================================

  // save item updates
  saveItemUpdate(brnd, qty, prc, clr, rte, dis, headr, datei, timei, desi, st) {
    this.emails = '';
    for (var i = 0; i < this.newimgary.length; i++) {
      this.emails += this.newimgary[i] + ',';
    }

    const updatenew = new News1(headr, datei, timei, desi, this.emails, 'none', this.itid);
    const updateitemarray = new Items(this.itmnm, brnd, qty, prc, this.emails, st, this.editorContentHighLight,
      this.editorContentSpec, this.editorContent, this.itmHits, clr, rte, dis, this.prctid,
      this.catgryid, this.itid);

    // function of update product
    this.ProductService.updateItemChanges(updateitemarray)
      .subscribe((result) => {
          Swal.fire(
            'Success',
            'Item Update Successful !',
            'success'
          );
        this.sendUpdateInEmail(this.itmnm, this.itid, prc, dis, updatenew);
          this.emails = '';
          this.headerin = '';
          this.descriptionin = '';
          this.getActive();
        }, (error1 => {
          console.log(error1);
        })
      );

    this.headerin = ' ';
    this.descriptionin = ' ';

  }

  // ===================================================================================================================

  //function of send update information via email
  sendUpdateInEmail(itmnam, itmid, prc, dis, newsobj) {
    if (this.temppriceinputs != prc && this.temppriceinputs != dis) {
      for (let i = 0; i < this.wishlistarray.length; i++) {
        if (this.wishlistarray[i].itemId = itmid) {
          this.dashboardservice.getCustomerDatabyID(this.wishlistarray[i].customerWishlistId)
            .subscribe((result: Customer) => {
                if (result.subscribe == true) {
                  this.dashboardservice.sendEmail({
                    to: result.email,
                    subject: 'creativered item update information',
                    message: '<p style="text-align: justify;"><img src="https://e-com-site.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="width: 175px;" class="fr-fic fr-dib"></p>\n' +
                      '\n' +
                      '<h4 style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: blue;"><strong>Dear ' + result.firstName + '</strong> <strong>,</strong></span></h4>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;">\n' +
                      '\t<br>\n' +
                      '</p>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;"><span style="font-size: 16px;">Price change into : ' + prc + ' and Discount change into : ' + dis + ' in your ' + itmnam + '</span></p>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;"><br></span></p>\n' +
                      '\n' +
                      '<p style="text-align: left; line-height: 1.15;"><span style="font-size: 11px;"><span style="font-family: Arial,Helvetica,sans-serif;">Sincerely,</span></span></p>\n' +
                      '\n' +
                      '<p style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">creativered.com</span></p>\n' +
                      '\n' +
                      '<p class="fr-text-bordered"><span style="font-size: 12px;"><strong>Copyright 2022 creativered. All Rights Reserved. Website Designed and Developed by G24</strong></span></p>\n'

                  }).subscribe((result2) => {
                      console.log('done');
                    }, (error => {
                      console.log(error);
                    })
                  );
                }
              }, (error1 => {
                console.log(error1);
              })
            );
        }
      }
      // function of save news
      newsobj.status = 'price';
      this.ProductService.saveNews(newsobj)
        .subscribe((result) => {
            this.getAllNews();
          }, (error1 => {
            console.log(error1);
          })
        );
    } else if (this.temppriceinputs != prc) {
      for (let i = 0; i < this.wishlistarray.length; i++) {
        if (this.wishlistarray[i].itemId = itmid) {
          this.dashboardservice.getCustomerDatabyID(this.wishlistarray[i].customerWishlistId)
            .subscribe((result: Customer) => {
                if (result.subscribe == true) {
                  this.dashboardservice.sendEmail({
                    to: result.email,
                    subject: 'creativered item update information',
                    message: '<p style="text-align: justify;"><img src="https://e-com-site.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="width: 175px;" class="fr-fic fr-dib"></p>\n' +
                      '\n' +
                      '<h4 style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: blue;"><strong>Dear ' + result.firstName + '</strong> <strong>,</strong></span></h4>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;">\n' +
                      '\t<br>\n' +
                      '</p>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;"><span style="font-size: 16px;">Price change into : ' + prc + ' in your ' + itmnam + '</span></p>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;"><br></span></p>\n' +
                      '\n' +
                      '<p style="text-align: left; line-height: 1.15;"><span style="font-size: 11px;"><span style="font-family: Arial,Helvetica,sans-serif;">Sincerely,</span></span></p>\n' +
                      '\n' +
                      '<p style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">creativered.com</span></p>\n' +
                      '\n' +
                      '<p class="fr-text-bordered"><span style="font-size: 12px;"><strong>Copyright 2022 creativered. All Rights Reserved. Website Designed and Developed by G24</strong></span></p>\n'
                  }).subscribe((result2) => {
                      console.log('done');
                    }, (error => {
                      console.log(error);
                    })
                  );
                }
              }, (error1 => {
                console.log(error1);
              })
            );
        }
      }
      newsobj.status = 'price';
      this.ProductService.saveNews(newsobj)
        .subscribe((result) => {
            this.getAllNews();
          }, (error1 => {
            console.log(error1);
          })
        );
    } else if (this.tempdiscountinputs != dis) {
      for (let i = 0; i < this.wishlistarray.length; i++) {
        if (this.wishlistarray[i].itemId = itmid) {
          this.dashboardservice.getCustomerDatabyID(this.wishlistarray[i].customerWishlistId)
            .subscribe((result: Customer) => {
                if (result.subscribe == true) {
                  this.dashboardservice.sendEmail({
                    to: result.email,
                    subject: 'creativered item update information',
                    message: '<p style="text-align: justify;"><img src="https://e-com-site.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="width: 175px;" class="fr-fic fr-dib"></p>\n' +
                      '\n' +
                      '<h4 style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: blue;"><strong>Dear ' + result.firstName + '</strong> <strong>,</strong></span></h4>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;">\n' +
                      '\t<br>\n' +
                      '</p>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;"><span style="font-size: 16px;">Discount change into : ' + dis + ' in your ' + itmnam + '</span></p>\n' +
                      '\n' +
                      '<p style="line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;"><br></span></p>\n' +
                      '\n' +
                      '<p style="text-align: left; line-height: 1.15;"><span style="font-size: 11px;"><span style="font-family: Arial,Helvetica,sans-serif;">Sincerely,</span></span></p>\n' +
                      '\n' +
                      '<p style="text-align: left; line-height: 1.15;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 11px;">creativered.com</span></p>\n' +
                      '\n' +
                      '<p class="fr-text-bordered"><span style="font-size: 12px;"><strong>Copyright 2022 creativered. All Rights Reserved. Website Designed and Developed by G24</strong></span></p>\n'
                  }).subscribe((result2) => {
                      console.log('done');
                    }, (error => {
                      console.log(error);
                    })
                  );
                }
              }, (error1 => {
                console.log(error1);
              })
            );
        }
      }
      newsobj.status = 'discount';
      this.ProductService.saveNews(newsobj)
        .subscribe((result) => {
            this.getAllNews();
          }, (error1 => {
            console.log(error1);
          })
        );
    } else {
      newsobj.status = 'none';
      this.ProductService.saveNews(newsobj)
        .subscribe((result) => {
            this.getAllNews();
          }, (error1 => {
            console.log(error1);
          })
        );
    }
  }

  // ===================================================================================================================

  // get all news
  getAllNews() {
    this.ProductService.getAllNews()
      .subscribe((result) => {
          this.newss = result;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  // enable item updates
  enbl(hd, dte) {
    this.hdd = hd;
    this.dtee = dte;
    if (dte == '' || hd == '') {
      Swal.fire(
        'Warning',
        'Please fill the blanks !',
        'warning'
      );

    } else {
      this.imageinputs = '';
      const dd1 = document.getElementById('disitem1') as HTMLElement;
      dd1.style.display = 'block';
      const dd2 = document.getElementById('disitem2') as HTMLElement;
      dd2.style.display = 'block';
      const dd3 = document.getElementById('disitem3') as HTMLElement;
      dd3.style.display = 'block';

      this.itmHits = this.tempitem.hits;
      this.itmnm = this.tempitem.name;
      this.brandinputs = this.tempitem.brand;
      this.qtyonhandinputs = this.tempitem.qtyOnHand;
      this.priceinputs = this.tempitem.price;
      this.temppriceinputs = this.tempitem.price;
      this.editorContentHighLight = this.tempitem.highlights;
      this.editorContentSpec = this.tempitem.specification;
      this.editorContent = this.tempitem.overview;
      this.overview = this.tempitem.overview;
      this.colorinputs = this.tempitem.color;
      this.newimgary = this.tempitem.image.split(',');
      const rimg = this.newimgary.pop();
      this.imageinputs = '';
      this.statusinputs = this.tempitem.status;
      this.rateinputs = this.tempitem.rate;
      this.discountinputs = this.tempitem.discount;
      this.tempdiscountinputs = this.tempitem.discount;
      this.itid = this.tempitem.id;
      this.prctid = this.tempitem.productid;
      this.catgryid = this.tempitem.categoryId;
    }
  }

  // ===================================================================================================================

  //function of delete image
  setImageName(nwim) {
    for (let i = 0; i < this.newimgary.length; i++) {
      if (this.newimgary[i] == nwim) {
        this.newimgary.splice(i, 1);
      }
    }
  }
}
