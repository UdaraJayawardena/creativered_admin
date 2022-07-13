export class RentalItem {
  url: string;
  itemName: string;
  category_ID: number;

  constructor(url: string, itemName: string, category_ID: number) {
    this.url = url;
    this.itemName = itemName;
    this.category_ID = category_ID;
  }
}
