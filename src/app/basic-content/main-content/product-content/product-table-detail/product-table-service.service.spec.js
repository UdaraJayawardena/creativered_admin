"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var product_table_service_service_1 = require("./product-table-service.service");
describe('ProductTableServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(product_table_service_service_1.ProductTableServiceService);
    expect(service).toBeTruthy();
  });
});
