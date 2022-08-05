"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var testing_1 = require("@angular/core/testing");
var navbar_content_service_service_1 = require("./navbar-content-service.service");
describe('NavbarContentServiceService', function () {
  beforeEach(function () {
    return testing_1.TestBed.configureTestingModule({});
  });
  it('should be created', function () {
    var service = testing_1.TestBed.get(navbar_content_service_service_1.NavbarContentServiceService);
    expect(service).toBeTruthy();
  });
});
