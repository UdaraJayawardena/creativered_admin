export class Validation {
  constructor() {
  }

  // check category name
  validCategory(catName: string) {
    return catName[0].toUpperCase() + catName.slice(1);
  }

  //====================================================================================================================

  // check product name
  validProduct(prName: string) {
    return prName[0].toUpperCase() + prName.slice(1);
  }

  //====================================================================================================================

  // check item data
  validItems(itData: string) {
    return itData[0].toUpperCase() + itData.slice(1);
  }
}
