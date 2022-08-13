import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AddproductServiceService} from '../../../../services/addproduct-service.service';
import {Categories} from '../../../../dto/Categories';
import {Product} from '../../../../dto/Product';
import {Validation} from '../../../../validation';
import {Observable} from 'rxjs';
import {ImageserviceService} from '../../../../services/imageservice.service';
import {Items, ItemsReport} from '../../../../dto/Items';
import Swal from 'sweetalert2';
// @ts-ignore
import * as spect from '../spect.json';
import {ProductServiceService} from '../../../../services/product-service.service';
import {RentalItem} from '../../../../dto/RentalItem';
import {Gallery} from '../../../../dto/Gallery';
import {forEach} from '@angular/router/src/utils/collection';
import {truncate} from 'fs';

@Component({
  selector: 'app-addproduct-tabpanel-content',
  templateUrl: './addproduct-tabpanel-content.component.html',
  styleUrls: ['./addproduct-tabpanel-content.component.css']
})
export class AddproductTabpanelContentComponent implements OnInit {

  //first text editor
  // Begin ControlValueAccesor methods.
  onChange = (_) => {
  };
  onTouched = () => {
  };

  // Form model content changed.
  // writeValue(content: any): void {
  //   this.model = content;
  // }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // End ControlValueAccesor methods.

  config: Object = {
    charCounterCount: false,
  };

  //====================================================================================================================

  //second text editor
  // Begin ControlValueAccesor methods.
  onChanges = (_) => {
  };
  onToucheds = () => {
  }

  // Form modelSpecs content changed.
  // writeValues(content: any): void {
  //   this.modelSpecs = content;
  // }

  registerOnChanges(fn: (_: any) => void): void {
    this.onChanges = fn;
  }

  registerOnToucheds(fn: () => void): void {
    this.onToucheds = fn;
  }

  // End ControlValueAccesor methods.

  // modelSpecs: any;

  public editorContentforSpecs: string;
  public highlightModel: string;
  public overViewModel: string;

  public optionsSpecs: Object = {
    placeholderText: 'Add Content Here!',
    charCounterCount: false
  };

  //====================================================================================================================

  //attributes
  category: Categories[];
  product: Product[];
  items: Items[];
  categorys: Observable<Categories>;
  products: Observable<Product>;
  itemss: Observable<Items>;
  imgarray: Array<string> = [];
  galleryarray: Array<string> = [];
  maingalleryarray: Gallery[];
  rentalimgarray: Array<string> = [];
  emails: string = '';
  showSpinner: boolean = true;
  imgevalue: string = '';
  selecttedfile: FileList;
  validatee = new Validation();
  mainspect: Array<any> = [];
  imcount: string = '';
  mainspeclist: Array<any> = [];
  selectedProId: number;
  rentalimg: string;

  product_name: string = "";
  item_product: string = "";
  item_category: string = "";
  item_name: string = "";
  item_brand:string = "";
  item_qty: string = "";
  item_price: string = "";
  item_rate: string = "";
  item_discount: string = "";
  item_highlights: string = "";
  item_spects: string = "";
  item_overview: string = "";
  category_name: string = "";


  @ViewChild('productnameinput') productElement: ElementRef;
  @ViewChild('itemprtype') item_productElement: ElementRef;
  @ViewChild('itemcattype') item_categoryElement: ElementRef;
  @ViewChild('itemnameinput') item_nameElement: ElementRef;
  @ViewChild('itembrandinput') item_brandElement: ElementRef;
  @ViewChild('itemqtyinput') item_qtyElement: ElementRef;
  @ViewChild('itempriceinput') item_priceElement: ElementRef;
  @ViewChild('itemrateinput') item_rateElement: ElementRef;
  @ViewChild('itemdisinput') item_discountElement: ElementRef;
  @ViewChild('highlights') item_highlightsElement: ElementRef;
  @ViewChild('itemspects') item_spectsElement: ElementRef;
  @ViewChild('itmoverview') item_overviewElement: ElementRef;
  @ViewChild('catnameinput') category_nameElement: ElementRef;


  constructor(private upldfile: ImageserviceService, private addproductservice: AddproductServiceService,
              private productservice: ProductServiceService) {
  }

  ngOnInit() {
    this.getAddCategoryData(); //get all category data
    this.getProductData(); //get all product data
    this.getAllItems(); //get all item data
    this.madeCheckbox(); //set all check box
    // this.getALlGalleryData(); //get all gallery data
  }

  //---------------------------------saving validations
  savingValidation(product, category) {
    var check = true;
    var msg1 = '';
    var msg2 = '';
    var msg3 = '';
    if (product == "") {
      console.log(product);
      check = false;
      msg1 = 'Add Product !';
    }
    if (category == "") {
      console.log(category);
      check = false;
      msg2 = ' Add Category !';
    }
    if (this.mainspeclist.length == 0) {
      console.log(this.mainspeclist.length);
      check = false;
      msg3 = ' Add Specification !';
    }
    if (!check) {
    Swal.fire(msg1 + '\n' + msg2 + '\n' + msg3);
    }
    return check;
  }

  savingItemValidation(itemprtype,itemcattype,itemnameinput, itembrandinput, itemqtyinput, itempriceinput,
                       imcount,highlightModel,overViewModel) {
    var check = true;
    var msg1 = '';
    var msg2 = '';
    var msg3 = '';
    var msg4 = '';
    var msg5 = '';
    var msg6 = '';
    var msg7 = '';
    var msg8 = '';
    var msg9 = '';
    if (itemprtype == "") {
      check = false;
      msg1 = 'Add Product!';
    }
    if (itemcattype == "") {
      check = false;
      msg2 = ' Add Category!';
    }
    if (itemnameinput == "") {
      check = false;
      msg3 = ' Add Item Name!';
    }
    if (itembrandinput == "") {
      check = false;
      msg4 = ' Add Brand!';
    }
    if (itemqtyinput == "") {
      check = false;
      msg5 = ' Add Qty!';
    }
    if (itempriceinput == "") {
      check = false;
      msg6 = ' Add Price!';
    }
    if (imcount == "") {
      check = false;
      msg7 = ' Add Colour!';
    }
    if (highlightModel == undefined) {
      check = false;
      msg8 = ' Add Highlight!';
    }
    if (overViewModel == undefined) {
      check = false;
      msg9 = ' Add Over View!';
    }
    if (!check) {
      Swal.fire(msg1 + msg2 + msg3 + msg4 + msg5 + msg6 + msg7 + msg8 + msg9);
    }
    return check;
  }

  //----------------------------------------clear function
  clear() {
    this.productElement.nativeElement.value = "";
  }

  clearItem() {
    this.item_productElement.nativeElement.value = "";
    this.item_categoryElement.nativeElement.value = "";
    this.item_nameElement.nativeElement.value = "";
    this.item_brandElement.nativeElement.value = "";
    this.item_qtyElement.nativeElement.value = "";
    this.item_priceElement.nativeElement.value = "";
    this.item_rateElement.nativeElement.value = "";
    this.item_discountElement.nativeElement.value = "";
    this.item_highlightsElement.nativeElement.value = "";
    this.item_spectsElement.nativeElement.value = "";
    this.item_overviewElement.nativeElement.value = "";
    this.imcount = "";
  }

  clearCategory() {
    this.category_nameElement.nativeElement.value = "";
  }


  //---------------------------funtion of gell all gallery data
  getALlGalleryData() {
    this.productservice.getGalleryData()
      .subscribe((result: Array<Gallery>) => {
          this.galleryarray = [];
          this.maingalleryarray = result;
          for (let i = 0; i < result.length; i++) {
            this.galleryarray.push(result[i].url);
          }
        }, (error1 => {
          console.log(error1);
          Swal.fire(
            'Error',
            error1.error.error.message + '',
            'error'
          );
        })
      );
  }

  //========================================================================================================================================

  //function of delete image
  deleteImage(imgdata) {
    for (let i = 0; i < this.maingalleryarray.length; i++) {
      if (this.maingalleryarray[i].url == imgdata) {
        this.addproductservice.deleteGalleryImage(this.maingalleryarray[i].id)
          .subscribe((result) => {
            Swal.fire(
              'Success',
              'Your image removed from the Gallery!',
              'success'
            );
            this.getALlGalleryData();
          }, (error1 => {
            console.log(error1);
            Swal.fire(
              'Error',
              error1.error.error.message + '',
              'error'
            );
          }));
      }
    }

  }

  //========================================================================================================================================

  //function of get specification list
  getSpecDetail(prid) {
    this.selectedProId = Number(prid);
    this.productservice.getProductIdData(prid)
      .subscribe((result: Product) => {
          // let fspec = result.specList.split('$');
          let result2 = result.specList.slice(0, result.specList.length - 1);
          let result1 = '$' + result2;
          let sspec = result1.replace(/[$]/g, '<br><br><b>(Main Title):- </b>');
          let lspec = sspec.replace(/,/g, '<br>');
          this.setToTextEditer(lspec);
        }, (error1 => {
          console.log(error1);
        })
      );
  }

  //====================================================================================================================

  //functions of set textediter data

  setToTextEditer(val) {
    this.editorContentforSpecs = val;
  }

  getHighlightDetail(highlight) {
    let lspec = highlight.replace(/,/g, '<br>');
    this.setToHighlightsEditer(lspec);
  }
  setToHighlightsEditer(val) {
    this.highlightModel = val;
  }

  getOverViewDetail(over_view) {
    let ospec = over_view.replace(/,/g, '<br>');
    this.setToOverViewEditer(ospec);
  }
  setToOverViewEditer(val) {
    this.overViewModel = val;
  }

  //====================================================================================================================

  //function of set specification
  madeCheckbox() {
    this.mainspect = ['imaging', 'focus', 'viewfinder', 'exposure_control', 'flash', 'av_recording', 'performances',
      'power', 'physical', 'packaging_info'];
  }


  //====================================================================================================================

  //function of get color codes
  getCheckBoxValue(checkval: any, lbval) {
    if (this.mainspeclist.length == 0) {
      console.log("mainspeclist.length ==0");
      this.mainspeclist.push(lbval);
      console.log(this.mainspeclist);
    } else {
      console.log("mainspeclist.length > 0");
      if (checkval.currentTarget.checked == true) {
        let count = 0;
        for (let i = 0; i < this.mainspeclist.length; i++) {
          if (this.mainspeclist[i] == lbval) {
            count++;
          }
        }
        if (count == 0) {
          this.mainspeclist.push(lbval);
        }
        console.log(this.mainspeclist);
      } else {
        for (let i = 0; i < this.mainspeclist.length; i++) {
          if (this.mainspeclist[i] == lbval) {
            this.mainspeclist.splice(i, 1);
          }
        }
        console.log(this.mainspeclist);
      }
    }
  }

  //====================================================================================================================

  //function of get color codes
  addcolor(itemcolorinput) {
    this.imcount += itemcolorinput + ',';
    Swal.fire('Added color');
  }

  //====================================================================================================================

  //funtion of upload image
  upload() {
    const file = this.selecttedfile.item(0);
    let number = Math.round(Math.random() * 10000000000000000) + 1;
    this.upldfile.uploadfile(file, number + file.name);
    this.imgarray.push(number + file.name);
  }

  // ====================================================================================================================

  //function of upload rental item image
  uploadRental() {
    const file = this.selecttedfile.item(0);
    let number = Math.round(Math.random() * 10000000000000000) + 1;
    this.upldfile.uploadfile(file, number + file.name);
    this.rentalimgarray.push(number + file.name);
  }

  //====================================================================================================================

  //function of add image to gallery
  uploadImagetoGallery() {
    const file = this.selecttedfile.item(0);
    let number = Math.round(Math.random() * 10000000000000000) + 1;
    this.upldfile.uploadfile(file, number + file.name);
    this.addproductservice.addtoGallery(new Gallery(number + file.name))
      .subscribe((result) => {
        Swal.fire(
          'Success',
          'Successfully Added image to Gallery!',
          'success'
        );
        setTimeout(() => {
          this.getALlGalleryData();
        }, 2000);

        // this.galleryarray.push(number + file.name);
      }, (error1 => {
        console.log(error1);
        Swal.fire(
          'Error',
          error1.error.error.message + '',
          'error'
        );
      }));
  }

  //====================================================================================================================

  //funtion of call upload service
  getImage(event) {
    this.selecttedfile = event.target.files;
  }

  //====================================================================================================================

  //function of get all item data
  getAllItems() {
    this.addproductservice.getAllItemData()
      .subscribe((result) => {
          this.items = result;
          this.itemss = this.addproductservice.getAllItemData();
          this.itemss.subscribe(() => this.showSpinner = false);
        }, (error1 => {
        Swal.fire(
          'Error',
          error1.error.error.message + '',
          'error'
        );
        })
      );
  }

  //====================================================================================================================

  // function of get all category data
  getAddCategoryData() {
    this.addproductservice.getAddCategoryData()
      .subscribe((result) => {
          this.category = result;
          this.categorys = this.addproductservice.getAddCategoryData();
          this.categorys.subscribe(() => this.showSpinner = false);
        }, (error1 => {
          console.log(error1);
        Swal.fire(
          'Error',
          error1.error.error.message + '',
          'error'
        );
        })
      );
  }

  // ===================================================================================================================

  // function of get all product data
  getProductData() {
    this.addproductservice.getProductData()
      .subscribe((result) => {
          this.product = result;
          this.products = this.addproductservice.getProductData();
          this.products.subscribe(() => this.showSpinner = false);
        }, (error1 => {
        Swal.fire(
          'Error',
          error1.error.error.message + '',
          'error'
        );
        })
      );
  }

  // ===================================================================================================================

  // save category
  saveCategory(catname: string) {
    console.log('catname');
    console.log(catname);
    if (catname == "") {
      Swal.fire('Add Category !');
    } else {
      let namee = this.validatee.validCategory(catname);
      let catgry = new Categories(namee);
      this.addproductservice.saveCategory(catgry)
        .subscribe((result) => {
            Swal.fire(
              'Success',
              'Category Added Successfully!',
              'success'
            );
            this.getAddCategoryData();
            this.clearCategory();
          }, (error1 => {
            Swal.fire(
              'Error',
              error1.error.error.message + '',
              'error'
            );
          })
        );
    }
  }

  //===================================================================================================================

  //save rental product
  saveRentalProduct(rentalproductnameinput, rentalcattypeselect) {
    let catid = 0;
    for (let i = 0; i < this.rentalimgarray.length; i++) {
      this.rentalimg = this.rentalimgarray[i] + ',';
    }

    this.addproductservice.getAddCategoryData()
      .subscribe((result) => {
          let catarray: Array<Categories> = result;
          for (var i = 0; i < catarray.length; i++) {
            if (catarray[i].category == rentalcattypeselect) {
              catid = catarray[i].id;
            }
          }
          let rentalobj = new RentalItem(this.rentalimg, rentalproductnameinput, catid);
          this.addproductservice.saveRentalProduct(rentalobj)
            .subscribe((result) => {
                Swal.fire(
                  'Success',
                  'RentalItem Added Successfully !',
                  'success'
                );
              }, (error1 => {
                Swal.fire(
                  'Error',
                  error1.error.error.message + '',
                  'error'
                );
              })
            );


        }, (error1 => {
          console.log(error1);
        })
      );
  }

  // ===================================================================================================================

  // check item detail and save
  saveItem(itemnameinput, itembrandinput, itemqtyinput, itempriceinput,
           itemrateinput, itemdisinput, itemprtype, itemcattype) {
    if (this.savingItemValidation(itemnameinput, itembrandinput, itemqtyinput, itempriceinput,
      itemprtype, itemcattype,this.imcount,this.highlightModel,this.overViewModel)) {
      for (var i = 0; i < this.imgarray.length; i++) {
        this.emails += this.imgarray[i] + ',';
      }

      let catid: number;
      let prid: number;
      let itname = this.validatee.validItems(itemnameinput);
      let itmbrnd = this.validatee.validItems(itembrandinput);

      this.addproductservice.getAddCategoryData()
        .subscribe((result) => {
            let catarray: Array<Categories> = result;
            for (var i = 0; i < catarray.length; i++) {
              if (catarray[i].category == itemcattype) {
                catid = catarray[i].id;
              }
            }

            // get product id relevent the product type
            this.addproductservice.getProductData()
              .subscribe((result) => {
                  let prarray: Array<Product> = result;
                  for (var i = 0; i < prarray.length; i++) {
                    if (prarray[i].productType == itemprtype) {
                      prid = prarray[i].id;
                    }
                  }
                  let itmbj = new ItemsReport(itname, itmbrnd, itemqtyinput, itempriceinput, this.emails,
                    'active', this.highlightModel, this.editorContentforSpecs, this.overViewModel, 0, this.imcount,
                    itemrateinput, itemdisinput, this.selectedProId);
                  // console.log('itmobj');
                  // console.log(itmbj);
                  // function of item save
                  this.addproductservice.saveItemDetail(itmbj)
                    .subscribe((result) => {
                        this.emails = '';
                        this.imgarray = [];
                        this.imcount = '';
                        Swal.fire(
                          'Success',
                          'Item Added Successful !',
                          'success'
                        );
                      this.clearItem();
                      }, (error1 => {
                        console.log(error1);
                        Swal.fire(
                          'Error',
                          error1.error.error.message + '',
                          'error'
                        );
                        console.log();
                      })
                    );
                }, (error1 => {
                  console.log(error1);
                })
              );

          }, (error1 => {
            console.log(error1);
          })
        );
    }
  }

  // ===================================================================================================================

  // check product detail
  saveProduct(prname, cattype) {
    if (this.savingValidation(prname, cattype)) {
      let catid = 0;
      let pname = this.validatee.validProduct(prname);
      Swal.fire({
        title: 'Are you sure?',
        text: 'did you fill correct specifications??',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I`m sure !'
      }).then((result) => {
        let slist = this.setSpecificationList();
        this.addproductservice.getAddCategoryData()
          .subscribe((result) => {
              let catarray: Array<Categories> = result;
              for (var i = 0; i < catarray.length; i++) {
                if (catarray[i].category == cattype) {
                  catid = catarray[i].id;
                }
              }
              let probj = new Product(pname, slist, catid);

              // function of save product
              this.addproductservice.saveProductDetail(probj)
                .subscribe((result) => {
                    this.mainspeclist = [];
                    Swal.fire(
                      'Success',
                      'Product Added Successful !',
                      'success'
                    );
                    this.getProductData();
                    this.clear();
                  }, (error1 => {
                    console.log(error1);
                  })
                );

            }, (error1 => {
              console.log(error1);
            })
          );
      });
    }
  }



  //====================================================================================================================

  //function of set speclist
  setSpecificationList(): any {
    let strlist = '';
    for (let u = 0; u < this.mainspeclist.length; u++) {
      console.log(this.mainspeclist[u]);
      switch (this.mainspeclist[u]) {
        case 'imaging' :
          strlist += spect.imaging + '$';
          break;
        case 'focus' :
          strlist += spect.focus + '$';
          break;
        case 'viewfinder' :
          strlist += spect.viewfinder + '$';
          break;
        case 'exposure_control' :
          strlist += spect.exposure_control + '$';
          break;
        case 'flash' :
          strlist += spect.flash + '$';
          break;
        case 'av_recording' :
          strlist += spect.av_recording + '$';
          break;
        case 'performances' :
          strlist += spect.performances + '$';
          break;
        case 'power' :
          strlist += spect.power + '$';
          break;
        case 'physical' :
          strlist += spect.physical + '$';
          break;
        case 'packaging_info' :
          strlist += spect.packaging_info + '$';
          break;
      }
    }
    // console.log('strlist comes');
    // console.log(strlist);
    return strlist;
  }
}
