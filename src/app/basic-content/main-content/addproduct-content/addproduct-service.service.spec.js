"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var addproduct_service_service_1 = require("./addproduct-service.service");
describe('AddproductServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(addproduct_service_service_1.AddproductServiceService);
    expect(service).toBeTruthy();
  });
});
