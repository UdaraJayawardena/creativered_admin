export class Wishlist {
  itemId: string;
  id: number;
  customerWishlistId: number;

  constructor(itemId: string, id: number, customerWishlistId: number) {
    this.itemId = itemId;
    this.id = id;
    this.customerWishlistId = customerWishlistId;
  }
}
