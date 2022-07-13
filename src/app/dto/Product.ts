export class Product {
  productType: string;
  specList: string;
  categoryid: number;
  id: number;

  constructor(productType: string)
  constructor(productType: string, specList: string, categoryid: number)
  constructor(productType: string, specList: string, categoryid: number, id: number)

  constructor(productType?: string, specList?: string, categoryid?: number, id?: number) {
    this.productType = productType;
    this.specList = specList;
    this.categoryid = categoryid;
    this.id = id;
  }
}
