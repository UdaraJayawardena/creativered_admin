export class ShippingAddress {
  firstName: string;
  lastName: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  country: string;
  postalCode: number;
  id: number;
  customerShippingId: number;

  constructor(firstName: string, lastName: string, addressOne: string, addressTwo: string, city: string, country: string, postalCode: number, id: number, customerShippingId: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addressOne = addressOne;
    this.addressTwo = addressTwo;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.id = id;
    this.customerShippingId = customerShippingId;
  }
}

