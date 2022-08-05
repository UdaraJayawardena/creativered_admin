export class Items {
  name: string;
  brand: string;
  qtyOnHand: number;
  price: number;
  image: string;
  status: string;
  highlights: string;
  specification: string;
  overview: string;
  hits: number;
  color: string;
  rate: number;
  discount: number;
  productid: number;
  categoryId: number;
  id: number;

  constructor()
  constructor(name: string, brand: string, qtyOnHand: number, price: number, image: string, status: string,
              highlights: string, specification: string, overview: string, hits: number, color: string, rate: number,
              discount: number, productid: number, categoryId: number)
  constructor(name: string, brand: string, qtyOnHand: number, price: number, image: string, status: string,
              highlights: string, specification: string, overview: string, hits: number, color: string, rate: number,
              discount: number, productid: number, categoryId: number, id: number)
  constructor(name?: string, brand?: string, qtyOnHand?: number, price?: number, image?: string, status?: string,
              highlights?: string, specification?: string, overview?: string, hits?: number, color?: string, rate?: number,
              discount?: number, productid?: number, categoryId?: number, id?: number) {
    this.name = name;
    this.brand = brand;
    this.qtyOnHand = qtyOnHand;
    this.price = price;
    this.image = image;
    this.status = status;
    this.highlights = highlights;
    this.specification = specification;
    this.overview = overview;
    this.hits = hits;
    this.color = color;
    this.rate = rate;
    this.discount = discount;
    this.productid = productid;
    this.categoryId = categoryId;
    this.id = id;
  }
}

export class ItemsReport {
  name: string;
  brand: string;
  qtyOnHand: number;
  price: number;
  image: string;
  status: string;
  highlights: string;
  specification: string;
  overview: string;
  hits: number;
  color: string;
  rate: number;
  discount: number;
  productid: number;

  constructor(name: string, brand: string, qtyOnHand: number, price: number, image: string, status: string,
              highlights: string, specification: string, overview: string, hits: number, color: string, rate: number,
              discount: number, productid: number) {
    this.name = name;
    this.brand = brand;
    this.qtyOnHand = qtyOnHand;
    this.price = price;
    this.image = image;
    this.status = status;
    this.highlights = highlights;
    this.specification = specification;
    this.overview = overview;
    this.hits = hits;
    this.color = color;
    this.rate = rate;
    this.discount = discount;
    this.productid = productid;
  }
}

