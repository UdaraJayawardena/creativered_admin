"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var product_page_service_service_1 = require("./product-page-service.service");
describe('ProductPageServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(product_page_service_service_1.ProductPageServiceService);
    expect(service).toBeTruthy();
  });
});
