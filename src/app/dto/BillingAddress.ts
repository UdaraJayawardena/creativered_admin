export class BillingAddress {
  firstName: string;
  lastName: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  country: string;
  postalCode: string;
  id: number;
  customerBillingId: string;

  constructor(firstName: string, lastName: string, addressOne: string, addressTwo: string, city: string, country: string, postalCode: string, id: number, customerBillingId: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addressOne = addressOne;
    this.addressTwo = addressTwo;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.id = id;
    this.customerBillingId = customerBillingId;
  }
}
