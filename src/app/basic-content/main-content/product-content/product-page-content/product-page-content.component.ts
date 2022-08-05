import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../../../services/product-service.service';
import {Items} from '../../../../dto/Items';

@Component({
  selector: 'app-product-page-content',
  templateUrl: './product-page-content.component.html',
  styleUrls: ['./product-page-content.component.css']
})
export class ProductPageContentComponent implements OnInit {

  itemid: number;
  itemnm: string;

  constructor(private productservice: ProductServiceService) {
  }

  ngOnInit() {
  }

  // item search by id
  searchbyId(id: number) {
    this.productservice.itemIdSearch(id)
      .subscribe((result: Items) => {
          this.itemnm = result.name;
        }, (error1 => {
          console.log(error1);
        })
      );
  }

}
