"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var product_service_service_1 = require("./product-service.service");
describe('ProductServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(product_service_service_1.ProductServiceService);
    expect(service).toBeTruthy();
  });
});
